//HTML.
const displayInput = document.querySelector('.display-screen')
const allNum = document.querySelectorAll('.num');
const allOperators = document.querySelectorAll('.op');

//Op object.
const operation = {
    firstDisplayVal: 0,
    operatorVar: '',
    secondDisplayVal: 0
}

//Button functions.
function numButton() {
    displayInput.value += this.innerText;
    operation.firstDisplayVal = parseInt(displayInput.value);
}

function operationButtons() {
    operation.operatorVar = this.innerText;
    console.log(operation.operatorVar)
}


//Number button event listener loop.
for (let i = 0; i <= 9; i++) {
   allNum[i].addEventListener('click', numButton);
}

//Operator button event listener loop.
for (let i = 0; i <= 3; i++) {
    allOperators[i].addEventListener('click', operationButtons);
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
    //let operatorVar = prompt ('Choose an operator');
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