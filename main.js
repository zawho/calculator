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
document.addEventListener('keydown', getNumKey);
document.addEventListener('keydown', getOpKey);
document.addEventListener('keydown', getDecimalKey);

//Operation object.
const operation = {
    userNumA: '',
    operatorVar: '',
    userNumB: '',
    answerVar: ''
}

//Keyboard functions.
function getNumKey(e) {
    if (e.key >= '0' && e.key <= '9') {
        numVar = e.key;
        displayNum();
        numVar = '';
    }
}

function getDecimalKey(e) {
    if (e.key === '.') {
        decimalVar = e.key;
        displayFraction();
    }
}

function getOpKey(e) {
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '*' || e.key === '/') {
        opVar = e.key;
        getOperator();
        opVar = '';
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
    console.log(operation);
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
    console.log(operation);
}

function getOperator() {
    if (opVar === '') {
        opVar = this.innerText;
    }
    if (operation.userNumA === '') {
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
    opVar = '';
    console.log(operation);
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
    console.log(operation);
}

function clearAll() {
    operation.userNumA = '';
    operation.operatorVar = '';
    operation.userNumB = '';
    operation.answerVar = '';
    displayInput.value = '';
    console.log(operation);
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
        operation.answerVar = decimalForm.format(operation.answerVar);
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
        displayInput.value = 'Whoa careful now!';
    }
    console.log(operation);
    console.log(`${operation.userNumA} ${operation.operatorVar} ${operation.userNumB} = ${operation.answerVar}`)
}