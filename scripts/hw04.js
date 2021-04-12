
// 1.	Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

function numberToDigits(number) {

    const HUNDREDS = 100;
    const TENS = 10;

    let obj = {
        hundreds: 0,
        tens: 0,
        units: 0
    }

    if (number < 0 || number > 999 || Number.isInteger(number) !== true) {
        console.log("Error: should be a number between 0 and 999.");

    } else if (number > 0 && number < 9) {
        obj.units = number;

    } else if (number > 9 && number < 99) {
        obj.tens = Math.floor(number / TENS);
        obj.units = number % TENS;

    } else {
        obj.hundreds = Math.floor(number / HUNDREDS);
        obj.tens = Math.floor(number % HUNDREDS / TENS);
        obj.units = number % HUNDREDS % TENS;
    }

    return obj;
}

console.log(numberToDigits(564))

// 2. Для игры, реализованной на уроке, добавить возможность вывода хода номер n (номер задается пользователем)

const config = {
    rowsCount: 10,
    colsCount: 10,
};

// добавил счетчик, обновление значения происходит в функции getDirection() в случае успешного хода
const player = {
    x: 0,
    y: 0,
    counterMoves: 0,
    move(nextPoint) {
        this.x = nextPoint.x;
        this.y = nextPoint.y;
    },
};

let renderer = {
    // Сюда запишем все что надо отобразить.
    map: "",

    /**
     * Отображает игру в консоли.
     */
    render() {
        // Цикл перебирает все строки, которые надо отобразить.
        for (let row = 0; row < config.rowsCount; row++) {
            // В каждой строке отображаем для каждой колонки (x - клетка, o - игрок).
            for (let col = 0; col < config.colsCount; col++) {
                // Проверяем, если на данной позиции должен быть и игрок, отображаем игрока, если нет - клетку.
                if (player.y === row && player.x === col) {
                    this.map += 'o ';
                } else {
                    this.map += 'x ';
                }
            }
            // После того как отобразили всю строку делаем переход на следующую строку.
            this.map += '\n';
        }

        // Выводим все что надо отобразить в игре.
        console.log(this.map);
        console.log("Moves made: " + player.counterMoves + ".")
    },

    clear() {
        // Чистим консоль.
        console.clear();
        // Чистим карту.
        this.map = "";
    }
};

let mover = {
    /**
     * Получает и отдает направление от пользователя.
     * @returns {int} Возвращаем направление, введенное пользователем.
     */
    getDirection() {
        // Доступные значения ввода.
        const availableDirections = ['w', 'a', 's', 'd'];

        while (true) {
            // Получаем от пользователя направление.
            let direction = prompt('Введите букву (w, a, s или d), куда вы хотите переместиться, "Отмена" для выхода.');
            if (!direction) {
                return null;
            }

            if (!availableDirections.includes(direction)) {
                alert('Для перемещения необходимо ввести одну из букв w, a, s или d.');
                continue;
            }

            // Если пользователь ввел корректное значение - отдаем его + обновляем количество ходов
            player.counterMoves += 1;
            return direction;
        }
    },

    /**
     * Отдает следующую точку в которой будет находиться пользователь после движения.
     * @param {int} direction Направление движения игрока.
     * @returns {{x: int, y: int}} Следующая позиция игрока.
     */
    getNextPosition(direction) {
        // Следующая точка игрока, в самом начале в точке будут текущие координаты игрока.
        const nextPosition = {
            x: player.x,
            y: player.y,
        };
        // Определяем направление и обновляем местоположение игрока в зависимости от направления.
        switch (direction) {
            case 's':
                nextPosition.y++;
                break;
            case 'a':
                nextPosition.x--;
                break;
            case 'd':
                nextPosition.x++;
                break;
            case 'w':
                nextPosition.y--;
                break;
        }

        return nextPosition;
    },
};

let game = {
    /**
     * Запускает игру.
     */
    run() {
        // Бесконечный цикл
        while (true) {
            // Получаем направление от игрока.
            const direction = mover.getDirection();

            // Если игрок сказал что хочет выйти, то игра заканчивается.
            if (direction === null) {
                console.log("Игра окончена.");
                return;
            }
            // Получаем следующую точку пользователя в зависимости от направления.
            const nextPoint = mover.getNextPosition(direction);

            renderer.clear();
            player.move(nextPoint);
            renderer.render();

        }
    },

    // Этот метод выполняется при открытии страницы.
    init() {
        console.log("Ваше положение на поле в виде о.");
        // Отображаем нашу игру.
        renderer.render();
        console.log("Чтобы начать игру наберите game.run() и нажмите Enter.");
    }
};

game.init();

// 3. *На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»

let validAnswers = ["1", "2", "3", "4"];
let isGameOver = false;
let player = {
    score: 0,
    init() {
        console.log("Добро пожаловать на 'Кто хочет стать миллионером?'\nЧтобы начать игру наберите play() и нажмите Enter.");
    }
}

let questionnaire = [
    {
        question: "Какой писатель написал 'Горе от ума'?",
        "1": "Грибоедов",
        "2": "Пушкин",
        "3": "Лермонтов",
        "4": "Достоевский",
        answer: "1",
        score: 100,
    },
    {
        question: "В каком году в РФ появилась игровая приставка Dendy(NES)?",
        "1": 1990,
        "2": 1991,
        "3": 1992,
        "4": 1993,
        answer: "3",
        score: 1000,
    },
    {
        question: "Кто придумал JavaScript?",
        "1": "Кевин Систер",
        "2": "Брендан Эйх",
        "3": "Павел Дуров",
        "4": "Сергей Брин",
        answer: "2",
        score: 10000,
    },
];

function checkUserAnswer(userAnswer, nextQuestion) {
    if (userAnswer === nextQuestion.answer) {
        console.log(`Верно! Вы заработали ${nextQuestion.score} очков.`);
        player.score += nextQuestion.score;
    } else {
        console.log(`Неверно! Правильный ответ: ${nextQuestion[nextQuestion.answer]}.`);
    }
}

function nextRandQuestion() {
    let randIndex = Math.floor(Math.random() * questionnaire.length);
    nextQuestion = questionnaire[randIndex]
    questionnaire.splice(randIndex, 1);
    console.log(nextQuestion.question);
    console.log(`1: ${nextQuestion[1]}. 2: ${nextQuestion[2]}. 3: ${nextQuestion[3]}. 4: ${nextQuestion[3]}`);
    return nextQuestion;
}

function getUserAnswer() {
    let userAnswer = "";
    while (!validAnswers.includes(userAnswer)) {
        userAnswer = prompt("Ответ?");
    }
    return userAnswer;
}

function checkAvailableQuestions() {
    exit = prompt("Нахмите 'q' для выхода или любую клавишу, чтобы продолжить.");
    console.clear()
    if (exit === 'q') {
        console.log(`Выход из игры.\nВы заработали ${player.score} очков.`)
        return true;
    } else if (questionnaire.length > 0) {
        return false;
    } else {
        console.log(`Вопросы закончились! Конец игры. \nВы заработали ${player.score} очков.`)
        return true
    }

}

//основной модуль игры с 3 функциями: генерация нового вопроса из массива, проверка ответа, проверка количества оставшихся вопросов. Для запуска игры в консоли набрать play()
function play() {

    console.clear()

    while (isGameOver !== true) {
        nextQuestion = nextRandQuestion();
        checkUserAnswer(getUserAnswer(), nextQuestion);
        isGameOver = checkAvailableQuestions();
    }

    return;
}

player.init()