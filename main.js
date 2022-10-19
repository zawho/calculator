//HTML.
const displayInput = document.querySelector('.display-screen');
const allNum = document.querySelectorAll('.num');
const allOperators = document.querySelectorAll('.op');
const eqButton = document.querySelector('.equals');

//Op object.
const operation = {
    userNumA: '',
    operatorVar: '',
    userNumB: '',
    answerVar: ''
}

//Button functions.
function numButton() {
    if (operation.operatorVar === '') {
        operation.userNumA += this.innerText;
        displayInput.value = operation.userNumA;
    } else {
        operation.userNumB += this.innerText;
        displayInput.value = operation.userNumB;
    }
    console.log(operation);
}

function operationButtons() {
    operation.operatorVar = this.innerText;
    console.log(operation);
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
    if (operation.operatorVar === '+') {
        operation.answerVar = add(operation.userNumA, operation.userNumB);
    } else if (operation.operatorVar === '-') {
        operation.answerVar = subtract(operation.userNumA, operation.userNumB);
    } else if (operation.operatorVar === 'x') {
        operation.answerVar = multiply(operation.userNumA, operation.userNumB);
    } else if (operation.operatorVar === '/') {
        operation.answerVar = divide(operation.userNumA, operation.userNumB);
    }
    displayInput.value = operation.answerVar;
    console.log(`${operation.userNumA} ${operation.operatorVar} ${operation.userNumB} = ${operation.answerVar}`)
}

eqButton.addEventListener('click', operate);