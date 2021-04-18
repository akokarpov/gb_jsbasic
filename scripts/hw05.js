// Урок 5. Введение в DOM
// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// 2. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п., причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.
// 3. *Заменить буквы, обозначающие фигуры, картинками.

function renderChessboard(n = 9) {

    const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const PIECES = [
        [1, 1, "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"],
        [2, 1, "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"],
        [3, 1, "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"],
        [4, 1, "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"],
        [5, 1, "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"],
        [6, 1, "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"],
        [7, 1, "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"],
        [8, 1, "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"],
        [1, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [2, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [3, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [4, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [5, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [6, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [7, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [8, 2, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"],
        [1, 8, "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"],
        [2, 8, "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"],
        [3, 8, "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"],
        [4, 8, "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg"],
        [5, 8, "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"],
        [6, 8, "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"],
        [7, 8, "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"],
        [8, 8, "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"],
        [1, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [2, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [3, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [4, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [5, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [6, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [7, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
        [8, 7, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"],
    ];

    for (let row = 0; row < n; row++) {

        let column = document.createElement("div");

        for (let col = 0; col < n; col++) {

            let border = true;
            let box = document.createElement("div");
            let color = (row + col) % 2 === 0 ? "white" : "black";

            if (row === 0 || col === 0) {
                color = "white";
                border = false;
            }

            if (row === 0 && col > 0 && col <= NUMBERS.length) {
                box.innerText = NUMBERS[8 - col]
                border = false;
            }

            if (row > 0 && col === 0 && row <= LETTERS.length) {
                box.innerText = LETTERS[row - 1];
                border = false;
            }

            if (border === false) {
                box.classList.add("no__border");
            }

            const piece = PIECES.find(function (piece) {
                return piece[0] === row && piece[1] === col;
            });
            if (piece) {
                box.style.backgroundImage = `url(${piece[2]})`;
            }

            // for (k = 0; k < PIECES.length; k++) {
            //     if (PIECES[k][0] === row && PIECES[k][1] === col) {
            //         box.style.backgroundImage = `url(${PIECES[k][2]})`;
            //     }
            // }

            box.classList.add("transparent__box", `${color}__box`);

            column.append(box);
        }
        chessBoard.append(column);
    }
}

renderChessboard();