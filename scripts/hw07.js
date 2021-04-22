const GAME_STATUS_STARTED = 'started';
const GAME_STATUS_PAUSED = 'paused';
const GAME_STATUS_STOPPED = 'stopped';

const SNAKE_DIRECTION_UP = 'up';
const SNAKE_DIRECTION_DOWN = 'down';
const SNAKE_DIRECTION_LEFT = 'left';
const SNAKE_DIRECTION_RIGHT = 'right';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const config = {
    size: 20
}

const game = {
    status: null,
    score: 0,
    start() {
        switch (game.status) {
            case null:
                // первое нажатие кнопки старт
                game.setGameStatus(GAME_STATUS_STARTED);
                board.render();
                snake.render();
                food.render();
                game.move();
                break;
            default:
                // перезагружаем страницу при повторном нажатии кнопки старт
                location.reload();
        }
    },

    pause() {
        // toggle-кнопка для отжатия паузы
        switch (game.status) {
            case GAME_STATUS_STARTED:
                game.setGameStatus(GAME_STATUS_PAUSED);
                break;
            case GAME_STATUS_PAUSED:
                game.setGameStatus(GAME_STATUS_STARTED);
                game.move()
                break;
        }
    },

    stop() {
        game.setGameStatus(GAME_STATUS_STOPPED);
    },

    move() {
        snake.setDirection(snake.direction);

        // setTimeout с рекурсивным вызовом позволяет в отличие от setInterval динамически менять скорость змейки
        let moveTimer = setTimeout(function go() {

            const nextPosition = snake.getNextPosition();
            const foundFood = food.foundPosition(nextPosition);

            // остановка таймера при нажатии кнопок пауза и стоп
            if (game.status === GAME_STATUS_STOPPED || game.status === GAME_STATUS_PAUSED) {
                clearTimeout(moveTimer);
                return;
            }

            // проверка столкновения с хвостом
            if (snake.tailCheck(nextPosition)) {
                clearTimeout(moveTimer);
                game.stop();
                return;
            }

            // проверка пересечения с едой, добавление очка. увеличение скорости змейки
            if (foundFood !== -1) {
                game.score += 1;
                snake.speed *= 0.9;
                snake.setPosition(nextPosition, false);
                food.removeItem(foundFood);
                food.generateItem();
                food.render();
            } else {
                snake.setPosition(nextPosition);
            }
            snake.render();

            // вывод значения очков
            const scoreNum = document.getElementById("score-value");
            scoreNum.innerText = game.score;

            // рекурсивный вызов setTimeout
            moveTimer = setTimeout(go, snake.speed);
        }, snake.speed);
    },

    setGameStatus(status) {
        const element = document.getElementById('game');
        element.classList.remove(GAME_STATUS_STARTED, GAME_STATUS_PAUSED, GAME_STATUS_STOPPED);
        element.classList.add(status);
        this.status = status;
    }
};

const board = {

    /**
     * Функция ищет HTML элемент поля на странице.
     *
     * @returns {HTMLElement} Возвращает HTML элемент.
     */
    getElement() {
        return document.getElementById('board');
    },

    /**
     * Функция отрисовывает поле с клетками для игры.
     */
    render() {
        const board = this.getElement();

        /* рисуем на странице 20*20 клеток */
        for (let i = 0; i < config.size ** 2; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            /* высчитываем и записываем в data атрибуты
             * координаты от верхней и левой границы */
            cell.dataset.top = Math.trunc(i / config.size);
            cell.dataset.left = i % config.size;

            board.appendChild(cell);
        }
    }
};

const cells = {

    /**
     * Функция ищет HTML элементы клеток на странице.
     *
     * @returns { HTMLCollectionOf.<Element>} Возвращает набор HTML элементов.
     */
    getElements() {
        return document.getElementsByClassName('cell');
    },

    /**
     * Функция задает класс для клетки по заданным координатам.
     *
     * @param coordinates {Array.<{top: number, left: number}>} Массив координат клеток для изменения.
     * @param className {string} Название класса.
     */
    renderItems(coordinates, className) {
        const cells = this.getElements();

        /* для всех клеток на странице удаляем переданный класс */
        for (let cell of cells) {
            cell.classList.remove(className);
        }

        /* для заданных координат ищем клетку и добавляем класс */
        for (let coordinate of coordinates) {
            const cell = document.querySelector(`.cell[data-top="${coordinate.top}"][data-left="${coordinate.left}"]`);
            cell.classList.add(className);
        }
    }
};

const snake = {
    // скорость используется в таймере движения
    speed: 200,
    // метод проверяет столкновение головы или новой еды с хвостом
    tailCheck(nextPosition) {
        for (let part of snake.parts) {
            if (part.left === nextPosition.left && part.top === nextPosition.top) {
                return true;
            }
        }
    },

    direction: SNAKE_DIRECTION_RIGHT,

    // Голова змейки в начале массива
    parts: [
        { top: 0, left: 2 },
        { top: 0, left: 1 },
        { top: 0, left: 0 },
    ],

    setDirection(event) {

        let direction;

        switch (event.keyCode) {
            case KEY_UP:
                direction = SNAKE_DIRECTION_UP;
                break;
            case KEY_DOWN:
                direction = SNAKE_DIRECTION_DOWN;
                break;
            case KEY_LEFT:
                direction = SNAKE_DIRECTION_LEFT;
                break;
            case KEY_RIGHT:
                direction = SNAKE_DIRECTION_RIGHT;
                break;
            default:
                return;
        }

        if (snake.direction === SNAKE_DIRECTION_UP && direction === SNAKE_DIRECTION_DOWN
            || snake.direction === SNAKE_DIRECTION_DOWN && direction === SNAKE_DIRECTION_UP
            || snake.direction === SNAKE_DIRECTION_LEFT && direction === SNAKE_DIRECTION_RIGHT
            || snake.direction === SNAKE_DIRECTION_RIGHT && direction === SNAKE_DIRECTION_LEFT) {
            return;
        }

        snake.direction = direction;
    },

    getNextPosition() {

        const position = { ...this.parts[0] };

        switch (this.direction) {
            case SNAKE_DIRECTION_UP:
                position.top -= 1;
                break;
            case SNAKE_DIRECTION_DOWN:
                position.top += 1;
                break;
            case SNAKE_DIRECTION_LEFT:
                position.left -= 1;
                break;
            case SNAKE_DIRECTION_RIGHT:
                position.left += 1;
                break;
        }

        /* если змейка выходит за верхний или нижний край поля,
         * то изменяем координаты на противоположную сторону,
         * чтобы змейка выходя за границы возвращалась обратно на поле */
        if (position.top === -1) {
            position.top = config.size - 1;
        } else if (position.top > config.size - 1) {
            position.top = 0;
        }

        /* если змейка выходит за левый или правый край поля,
         * то изменяем координаты на противоположную сторону,
         * чтобы змейка выходя за границы возвращалась обратно на поле */
        if (position.left === -1) {
            position.left = config.size - 1;
        } else if (position.left > config.size - 1) {
            position.left = 0;
        }

        return position;
    },

    /**
     * Функция устанавливает позицию для змейки.
     *
     * @param position {{top: number, left: number}} Координаты новой позиции.
     * @param shift Флаг, указывающий, нужно ли отрезать хвост для змейки.
     */
    setPosition(position, shift = true) {
        /* проверяем флаг, указывающий, нужно ли отрезать хвост для змейки,
         * если флаг положительный, то отрезаем хвост змейки (первый элемент в массиве),
         * чтобы длина змейки не изменилась,
         * если флаг будет отрицательным, то при установки позиции, мы не отрезаем хвост,
         * а значит увеличиваем змейку на одну клетку, это будет означать, что она съела еду */

        // Метод shift() заменили на pop()
        if (shift) {
            this.parts.pop();
        }

        // Метод push() заменили на unshift()
        this.parts.unshift(position);
    },

    render() {
        cells.renderItems(this.parts, 'snake');
    }
};

const food = {

    items: [
        { top: 5, left: 5 }
    ],

    /**
     * Функция выполняет поиск переданных координат змейки в массиве с едой.
     *
     * @param snakePosition {{top: number, left: number}} Позиция головы змейки.
     *
     * @returns {number} Возвращает индекс найденного совпадения из массива с едой,
     * если ничего не найдено, то -1.
     */
    foundPosition(snakePosition) {
        const comparerFunction = function (item) {
            return item.top === snakePosition.top && item.left === snakePosition.left;
        };

        /* здесь происходит вызов функции comparerFunction для каждого элемента в массиве,
         * если функция вернет true, то для этого элемента будет возвращен его индекс,
         * если функция ни разу не вернет true, то результатом будет -1 */
        return this.items.findIndex(comparerFunction);
    },

    /**
     * Функция удаляет один элемент по индексу из массива с едой.
     *
     * @param foundPosition Индекс найденного элемента.
     */
    removeItem(foundPosition) {
        this.items.splice(foundPosition, 1);
    },

    /**
     * Функция генерирует объект с координатами новой еды.
     */
    generateItem() {

        const newItem = {
            top: getRandomNumber(0, config.size - 1),
            left: getRandomNumber(0, config.size - 1)
        };

        //  рекурсивный вызов получения координат новой еды, если позиция еды генерируется на змейке
        if (snake.tailCheck(newItem)) {
            this.generateItem();
        } else {
            this.items.push(newItem);
        }
    },

    render() {
        cells.renderItems(this.items, 'food');
    }
};

function init() {

    /* получаем кнопки */
    const startButton = document.getElementById('button-start');
    const pauseButton = document.getElementById('button-pause');
    const stopButton = document.getElementById('button-stop');

    /* добавляем обработчики клика на кнопки */
    startButton.addEventListener('click', game.start);
    pauseButton.addEventListener('click', game.pause);
    stopButton.addEventListener('click', game.stop);

    /* добавляем обработчик при нажатии на любую кнопку на клавиатуре,
     * далее в методе мы будем проверять нужную нам клавишу */
    window.addEventListener('keydown', snake.setDirection);
}

/**
 * Функция, генерирующая случайные числа.
 *
 * @param min {number} Нижняя граница генерируемого числа.
 * @param max {number} Верхняя граница генерируемого числа.
 *
 * @returns {number} Возвращает случайное число.
 */
function getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

window.addEventListener('load', init);
