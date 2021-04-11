
// 1.	С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

let n = 0;
while (n < 101) {
    console.log(n);
    n += 1;
}

// 2.	С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. 
// 3.	Товары в корзине хранятся в массиве. Задачи:
// a.	Организовать такой массив для хранения товаров в корзине;
// b.	Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

function countBasketPrice(arr) {
    
    let total_price = 0;

    for (let item in arr) {
        let item_price = arr[item];
        total_price += item_price;
    }

    return total_price;
}

let basket = {
    "laptop": 100000,
    "book": 3000,
    "bicycle": 40000,
}

console.log(countBasketPrice(arr = basket));

// 4.	* Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
// for(...){// здесь пусто}
//  

for(let i = 0; i < 10; console.log(i++)){}

// 5.	 * Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
// x
// xx
// xxx
// xxxx
// xxxxx

let line = "x";
for (i = 0; i < 20; i += 1) {
    console.log(line);
    line += "x";
}
