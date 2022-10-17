//Global variables.
let displayVal;

//HTML.
const displayInput = document.querySelector('.display-screen')
const allNum = document.querySelectorAll('.num');


//Button function.
function displayButton() {
        displayInput.value += this.innerText;
        displayVal = displayInput.value;
}

//Number button event listener loop.
for (let i = 0; i <= 9; i++) {
   allNum[i].addEventListener('click', displayButton);
}

//Arithmetic functions.
function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

//Take user inputs and apply the arithmetic functions.
function operate() {
    let userNumA = prompt('Choose a number');
    let userNumB = prompt('Choose another number');
    let operatorVar = prompt ('Choose an operator');
    let answerVar;
    let calcString = `${userNumA} ${operatorVar} ${userNumB}`;
    if (operatorVar === '+') {
        answerVar = add(userNumA, userNumB);
    } else if (operatorVar === '-') {
        answerVar = subtract(userNumA, userNumB);
    } else if (operatorVar === '*') {
        answerVar = multiply(userNumA, userNumB);
    } else if (operatorVar === '/') {
        answerVar = divide(userNumA, userNumB);
    }
    console.log(`${calcString} = ${answerVar}`);
}

//operate();