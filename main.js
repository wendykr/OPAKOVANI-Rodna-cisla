/* Cvičení: Hodnoty, proměnné, podmínky, funkce */

// 1. Rodná čísla

// const vstup = prompt('Zadej rodné číslo');

// if (vstup.length === 10) {
//     console.log(`Zadané rodné číslo "${vstup}" má správně deset znaků.`);
//     if (Number.isInteger(Number(vstup))) {
//         console.log('Rodné číslo je celé číslo');
//         if (Number(vstup) % 11 === 0) {
//             console.log('Rodné číslo je dělitelné číslem 11');
//         } else {
//             console.log('Rodné číslo není dělitelné 11');
//         }
//         console.log('Zadané rodné číslo je platné');
//     } else {
//         console.log('Obsahuje nepovolené znaky');
//     }
// } else {
//     console.log(`Uživatel zadal rodné číslo "${vstup}" neplatné délky, tj. ${vstup.length}`);
// }

// 2. Platnost jako funkce

// const rodnaCislaKOtestovani = [
//   '123',
//   'nepovím',
//   '7060201236',
//   '123456789123456789',
//   '9062185440',
//   '123č56q8y7',
// ];

const checkBirthID = (item) => {

    if (item.length !== 10) {
        return `Invalid Item`;
    }

    if (!Number.isInteger(Number(item))) {
        return `notANumber`;
    }

    if (Number(item) % 11 !== 0) {
        return `failedChecksum`;
    }

    return `ok`;
}

//console.log(checkBirthID('7060201236'));
//rodnaCislaKOtestovani.forEach(checkBirthID);


/* Cvičení: Pole, cykly, objekty */

// 1. Kontrola cifer

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const isDigit = (letter) => {

    if (letter.length === 1) {

        if (digits.includes(letter)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// console.log(isDigit('ab')) // false
// console.log(isDigit('4')) // true
// console.log(isDigit('Z')) // false
// console.log(isDigit('1')) // true
// console.log(isDigit('18')) // false

// console.log(Array.from('rodnaCislaKOtestovani'));

// const logInvalidCharacters = (string) => {

//     Array.from(string).forEach((oneNumber) => {
//         if(!isDigit(oneNumber)) {
//             console.log(oneNumber);
//         }
//     })

// }

// logInvalidCharacters('123č56q8y7');
// logInvalidCharacters('9062185440');


/* 2. Detailní kontrola cifer */

const validateCharacters = (text) => {

    let result = [];

    Array.from(text).forEach((oneNumber) => {
        const obj = {char: oneNumber, digit: isDigit(oneNumber)}
        result.push(obj);
    })
    return result;
}

// console.log(validateCharacters('123č56q8y7'));
// console.log(validateCharacters('462748/312'));


/* Cvičení: DOM a události */

// 1. Vstup pomocí formuláře

const formularElm = document.querySelector('#formular');
const cisloElm = document.querySelector('#cislo');
const messageElm = document.querySelector('#message');
const stringElm = document.querySelector('#string');

const process = (event) => {
    event.preventDefault();
    console.log('click');
    console.log('Cislo.value: ' + cislo.value);
    console.log(stringElm);

    if (cislo.value === '') {
        if (event.target!==cislo&event.target!==formular) {
            cisloElm.style = "outline: 0";
         } else if (event.target==cislo&&event.target!==formular) {
            cisloElm.style = "outline: 2px solid #000";
         } else {
            cisloElm.style = "outline: 2px solid #CC0000";
         };
        messageElm.style.color = 'gray';
        messageElm.innerHTML = `⚠ Vyplňte toto pole`;
        cisloElm.focus();
    } else {
        if(checkBirthID(cislo.value) === 'ok') {
            messageElm.style.color = 'green';
            messageElm.innerHTML = `✔ V pořádku`;
            cisloElm.style = "outline: 0";
        } else {
            messageElm.style.color = 'red';
            messageElm.innerHTML = `❌ V rodném čísle jsou chyby`;
            cisloElm.style = "outline: 2px solid #000";
        }


/* Cvičení: innerHTML */
        let vstup = validateCharacters(cislo.value);
        // console.log(vstup.length);

        stringElm.innerHTML = ``;

// 1. Cifry jako HTML elementy

        vstup.forEach((letter, index) => {
            console.log(letter);
            console.log(index);

            if (isDigit(letter.char) === true && vstup.length === 10) {
                stringElm.innerHTML += `<span class="letter akcept">${letter.char}</span>`;
            } else {
                stringElm.innerHTML += `<span class="letter error">${letter.char}</span>`;
            }
        })

        if (checkBirthID(cislo.value) === 'ok') {
            cislo.value = '';
        } else {
            cislo.value = cislo.value; 
        }
    }
}

formularElm.addEventListener('submit', process);
