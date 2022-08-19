const read = require('readline-sync');

console.log(startGame());

function startGame() {
    let steps = 5;
    let userNumber = null;
    const digit = createNumberOfDigit();
    const number = createNumber(digit);
    sayNumberOfDigit(digit);

    while (true) {
        const tmp = read.question('Введите число \n');
        if (tmp.length === digit && +tmp !== NaN) {
            userNumber = tmp;
            if (steps === 0) {
                return `Вы проиграли, загаданное число было ${number}`
            }
            if (userNumber === number) {
                return 'Вы победили !!!'
            } else {
                checkNumber(userNumber, number);
            }
            steps--;
        }
    }
}

function createNumber(j) {
    let number = '';
    for (let i = 0; i < j; i++) {
        let newDigit = String(Math.floor(Math.random() * 10));
        if (number.includes(newDigit)) {
            i--;
            continue;
        }
        if (newDigit === '0' && number.length === 0) {
            i--
        } else {
            number += newDigit;
        }

    }
    return number;
}

function createNumberOfDigit() {
    return Math.floor(Math.random() * 4 + 3);
}

function sayNumberOfDigit(numberOfDigit) {
    console.log(`Загадано число состоящее из ${numberOfDigit} цифр.`)
}

function checkNumber(userNumber, number) {
    let numbers1 = [];
    let numbers2 = [];

    for (i in userNumber) {
        if (number.includes(userNumber[i])) {
            if (userNumber[i] === number[i]) {
                numbers2.push(userNumber[i]);
            } else {
                numbers1.push(userNumber[i]);
            }
        }
    }

    console.log(`Совпавших цифр не на своих местах - ${numbers1.length} (${numbers1.map((item) => item)}), цифр на своих местах - ${numbers2.length} (${numbers2.map((item) => item)})`)
}