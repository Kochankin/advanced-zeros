module.exports = function getZerosCount(number, base) { 
    var dividers = getDividersWithPowers(base);
    var minArray = [];
    for (var divider in dividers) {
        if (dividers.hasOwnProperty(divider)) {
            minArray.push(
                maxPowerInFactorial(divider, dividers[divider], number)
            );
        }
    }
    return Math.min.apply(null, minArray); // возвращаем меньшую из степеней
}

var getDividersWithPowers = function(base) {
    var result = new Object(); //создаем объект-хранилище для простых чисел и их степеней 
    for (var i = 2; i <= base; i++) { // идем циклом начиная с 2 до введенного основания  
        while (base % i === 0) { // если делится без остатка - добавляем в объект
            addDividerPower(result, i);
            base /= i; //делим основание каждую итерацию, пока не получим 0
        }
        if (base === 1) {
            break;
        }
    }
    return result; // возвращаем объект с записями о простом множителе (св-во) и его степени (значение)
}

var addDividerPower = function(result, divider) {
    if (result[divider]) { // если уже делили на это число, то увеличиваем степень на 1
        result[divider]++;
    } else {
        result[divider] = 1; // если нет, добавляем это свойство со стартовым значением 1
    }
}

var maxPowerInFactorial = function(divider, power, n) { // считаем максим.степень числа divider, в которую нужно возвести, чтобы делить на него число n
    var k = 0, powerOfDivider = 1; // k - искомая степень
    while (true) {
        powerOfDivider *= divider; // начиная с 1 увеличиваем степень
        var addend = Math.floor(n / powerOfDivider); // сколько целых раз число n делится на делитель 
        if (addend === 0) { // когда 
            return Math.floor(k / power); // делим на степень, в которую изначально возведен простой множитель
        }
        k += addend;
    }
} 
