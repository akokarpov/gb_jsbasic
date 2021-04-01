// 1. Почему код дает именно такие результаты?
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
d = b++; alert(d);           // 1
c = (2 + ++a); alert(c);      // 5
d = (2 + b++); alert(d);      // 4
alert(a);                    // 3
alert(b);                    // 3
// Инкремент ++ ПЕРЕД переменной возвращает значение после +1, инкремент ПОСЛЕ переменной возвращает значение до +1

// 2.	Чему будет равен x? 
var a = 2;
var x = 1 + (a *= 2);
// x будет равен 5. *= умножает число на само себя, операция так же стоит в скобках, поэтому приоритет выше

// 3.Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
// если a и b положительные, вывести их разность;
// если а и b отрицательные, вывести их произведение;
// если а и b разных знаков, вывести их сумму;
// Ноль можно считать положительным числом.

var a = "test"
var b = -3
var result = null
if (a >= 0 && b >= 0) {
    result = a - b;
} else if (a < 0 && b < 0) {
    result = a * b;
} else if (a >= 0 && b < 0 || a < 0 && b >= 0) {
    result = a + b;
} else {
    result = "Ошибка. Некорректный ввод."
}
alert(result)

// 4.	Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

var a = 1
switch (a) {
    case 1:
        alert("1")
        break;
    case 2:
        alert("2")
        break;
    case 3:
        alert("3")
        break;
}

// 5.	Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

function sum(n1, n2) {
    return n1 + n2;
}

function sub(n1, n2) {
    return n1 - n2;
}

function mul(n1, n2) {
    return n1 * n2;
}

function div(n1, n2) {
    return n1 / n2;
}

sum(3, 2)
sub(3, 2)
mul(3, 2)
div(3, 2)

// 6.	Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).

function calc(arg1, arg2, operation) {
    // 'sum' to sum, 'sub' to substract, 'mul' to multiply, 'div' to divide
    switch (operation) {
        case "sum":
            return sum(arg1, arg2)
        case "sub":
            return sub(arg1, arg2)
        case "mul":
            return mul(arg1, arg2)
        case "div":
            return div(arg1, arg2)
    }
}

alert(calc(2, 5, "mul")) // 10

// 7.	* Сравнить null и 0. Объяснить результат.
if (null == 0) {
    alert("True");
} else {
    alert("False");
}
// Значения null and undefined равны == друг другу, но не равны каким-либо другим значениям https://javascript.info/comparison#:~:text=Comparisons%20convert%20null%20to%20a,null%20%3D%3D%200%20is%20false

// 8.	* С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.

function power1(val, pow) {
    if (pow == 0)
        return 1;
    else
        return val * power(val, pow - 1);
}

alert(power1(2, 3))

// ИЛИ проще

function power2(val, pow) {
    return val ** pow
}

alert(power2(2, 3))