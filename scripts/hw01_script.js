// 1.	Задать температуру в градусах по Цельсию. Вывести в alert соответствующую температуру в градусах по Фаренгейту. Подсказка: расчет идет по формуле Tf = (9 / 5) * Tc + 32, где Tf — температура по Фаренгейту, Tc — по Цельсию.

var userTempType = prompt("Цельсий в Фаренгейт - нажмите 'c'.\nФаренгейт в Цельсий - нажмите 'f': ")
var userDegrees = parseInt(prompt("Введите количество градусов: "))
if (isNaN(userDegrees)) {
    alert('Ошибка! Попробуйте ввести число.');
} else if (userTempType == "f") {
    var Tc = (userDegrees - 32) * 5 / 9;
    alert(Tc.toFixed(2));
} else if (userTempType == "c") {
    var Tf = (9 / 5) * userDegrees + 32;
    alert(Tf.toFixed(2));
} else {
    alert("Некорректный ввод типа градусов. Попробуйте еще раз!");
}

// 2.	Объявить две переменные: admin и name. Записать в name строку "Василий"; Скопировать значение из name в admin. Вывести admin (должно вывестись «Василий»).

var name = "Василий"
var admin = name
alert(admin)

    // 3.	* Чему будет равно JS-выражение 1000 + "108"?
    //Ответ: строке "1000108"

    // 4.	* Самостоятельно разобраться с атрибутами тега script (async и defer).
    // Хороший разбор: https://www.w3schools.com/tags/att_script_async.asp#:~:text=The%20async%20attribute%20is%20a,the%20src%20attribute%20is%20present). async выполняет код до загрузки всей страницы, defer только после загрузки. Если ничего не указано, то код выполняется немедленно.