let numVar = '';
let opVar = '';
let decimalVar = '.';

const displayInput = document.querySelector('.display-screen');
const allNum = document.querySelectorAll('.num');
const decimalButton = document.querySelector('.decimal')
const allOperators = document.querySelectorAll('.op');
const eqButton = document.querySelector('.equals');
const backspaceButton = document.querySelector('.backspace');
const clearButton = document.querySelector('.clear');

for (let i = 0; i <= 9; i++) {
    allNum[i].addEventListener('click', displayNum);
 }
 
for (let i = 0; i <= 3; i++) {
     allOperators[i].addEventListener('click', getOperator);
 }

decimalButton.addEventListener('click', displayFraction);
eqButton.addEventListener('click', operate);
backspaceButton.addEventListener('click', deleteDisplay);
clearButton.addEventListener('click', clearAll);
document.addEventListener('keydown', getKeys);

//Operation object.
const operation = {
    userNumA: '',
    operatorVar: '',
    userNumB: '',
    answerVar: ''
}

//Keyboard function.
function getKeys(e) {
    if (e.key >= '0' && e.key <= '9') {
        numVar = e.key;
        displayNum();
        numVar = '';
    } else if (e.key === '.') {
        decimalVar = e.key;
        displayFraction();
    } else if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '*' || e.key === '/') {
        opVar = e.key;
        getOperator();
        opVar = '';
    } else if (e.key === '=') {
        operate();
    } else if (e.key === 'Backspace'){
        deleteDisplay();
    } else if (e.key === 'c') {
        clearAll();
    }
}

//Button functions.
function displayNum() {
    if (numVar === '') {
        numVar = this.innerText;
    }
    if (operation.operatorVar === '' || (!(operation.operatorVar === '') && operation.userNumA === '')) {
        operation.userNumA += numVar;
        displayInput.value = operation.userNumA;
        operation. operatorVar = '';
        operation.userNumB = '';
        numVar = '';
    } else if (!(operation.answerVar === '')) {
        operation.answerVar += numVar;
        displayInput.value = operation.answerVar;
        operation.userNumB = '';
        numVar = '';
    } else if (!(operation.userNumA === '')) {
        operation.userNumB += numVar;
        displayInput.value = operation.userNumB;
        numVar = '';
    }
}

function displayFraction() {
    if (operation.operatorVar === '' && !(displayInput.value.includes('.'))) {
        operation.userNumA += decimalVar;
        displayInput.value = operation.userNumA;
    } else if (!(operation.operatorVar === '') && displayInput.value.includes('.') && operation.userNumB === '' && operation.answerVar === '') {
        operation.userNumB += decimalVar;
        displayInput.value = operation.userNumB;
    } else if (!(operation.operatorVar === '') && !(displayInput.value.includes('.')) && operation.answerVar === '') {
        operation.userNumB += decimalVar;
        displayInput.value = operation.userNumB;
    } else if (!(operation.answerVar === '') && !(displayInput.value.includes('.'))) {
        operation.answerVar += decimalVar;
        displayInput.value = operation.answerVar;
    }
}

function getOperator() {
    if (opVar === '') {
        opVar = this.innerText;
    }
    if (operation.userNumA === '' && operation.answerVar === '') {
        operation.operatorVar = '';
    } else if (!(operation.userNumA === '') && !(operation.operatorVar === '') && !(operation.userNumB === '')) {
        operate();
        operation.operatorVar = opVar;
    } else {
        operation.operatorVar = opVar;
    }
    if (!(operation.answerVar === '')) {
        operation.userNumA = operation.answerVar;
        operation.userNumB = '';
        operation.answerVar = '';
    }
    if (operation.operatorVar === '') {
        displayInput.value += operation.operatorVar;
    } else {
        displayInput.value = operation.userNumA;
        displayInput.value += operation.operatorVar;
    }
    opVar = '';
}

function deleteDisplay() {
    if (operation.operatorVar === '') {
        operation.userNumA = operation.userNumA.toString().slice(0, displayInput.value.length - 1);
        displayInput.value = operation.userNumA;
        operation.operatorVar = '';
    } else if (!(operation.answerVar === '')) {
        operation.answerVar = operation.answerVar.toString().slice(0, displayInput.value.length - 1);
        displayInput.value = operation.answerVar;
        operation.userNumA = '';
    } else if (!(operation.userNumB === '') && !(operation.userNumA === '')) {
        operation.userNumB = operation.userNumB.toString().slice(0, displayInput.value.length - 1);
        displayInput.value = operation.userNumB;
    }
}

function clearAll() {
    operation.userNumA = '';
    operation.operatorVar = '';
    operation.userNumB = '';
    operation.answerVar = '';
    displayInput.value = '';
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
    } else if (operation.operatorVar === 'x' || operation.operatorVar === '*') {
        operation.answerVar = multiply(operation.userNumA, operation.userNumB);
    } else if (operation.operatorVar === '/') {
        operation.answerVar = divide(operation.userNumA, operation.userNumB);
    }
    if (operation.answerVar % 1 != 0) {
        const decimalForm = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 8,
        })
        operation.answerVar = decimalForm.format(operation.answerVar).replaceAll(',', '');
        displayInput.value = operation.answerVar;
    } else {
        displayInput.value = operation.answerVar;
    }
    if (operation.userNumB === '') {
        operation.answerVar = '';
        displayInput.value = operation.userNumA;
    }
    if (operation.operatorVar === '/' && operation.userNumB === '0') {
        clearAll();
        displayInput.value = 'oh no!';
    }
}