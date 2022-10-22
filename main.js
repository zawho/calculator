//HTML.
const displayInput = document.querySelector('.display-screen');
const allNum = document.querySelectorAll('.num');
const decimalButton = document.querySelector('.decimal')
const allOperators = document.querySelectorAll('.op');
const eqButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

//Operation object.
const operation = {
    userNumA: '',
    operatorVar: '',
    userNumB: '',
    answerVar: ''
}

//Button functions.
function displayNum() {
    if (operation.operatorVar === '') {
        operation.userNumA += this.innerText;
        displayInput.value = operation.userNumA;
    } else if (!(operation.answerVar === '')) {
        operation.answerVar += this.innerText;
        displayInput.value = operation.answerVar;
        operation.userNumB = '';
    } else {
        operation.userNumB += this.innerText;
        displayInput.value = operation.userNumB;
    }
    console.log(operation);
}

function displayFraction() {
    if (operation.operatorVar === '' && !(displayInput.value.includes('.'))) {
        operation.userNumA += this.innerText;
        displayInput.value = operation.userNumA;
    } else if (!(operation.operatorVar === '') && displayInput.value.includes('.') && operation.userNumB === '' && operation.answerVar === '') {
        operation.userNumB += this.innerText;
        displayInput.value = operation.userNumB;
    } else if (!(operation.operatorVar === '') && !(displayInput.value.includes('.')) && operation.answerVar === '') {
        operation.userNumB += this.innerText;
        displayInput.value = operation.userNumB;
    } else if (!(operation.answerVar === '') && !(displayInput.value.includes('.'))) {
        operation.answerVar += this.innerText;
        displayInput.value = operation.answerVar;
    }
    console.log(operation);
}

decimalButton.addEventListener('click', displayFraction);

function getOperator() {
    if (operation.userNumA === '') {
        operation.operatorVar = '';
    } else if (!(operation.userNumA === '') && !(operation.operatorVar === '') && !(operation.userNumB === '')) {
        operate();
        operation.operatorVar = this.innerText;
    } else {
        operation.operatorVar = this.innerText;
    }
    if (!(operation.answerVar === '')) {
        operation.userNumA = operation.answerVar;
        operation.userNumB = '';
        operation.answerVar = '';
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

//Clear button event listener.
clearButton.addEventListener('click', clearAll);

//Event listener loops.
for (let i = 0; i <= 9; i++) {
   allNum[i].addEventListener('click', displayNum);
}

for (let i = 0; i <= 3; i++) {
    allOperators[i].addEventListener('click', getOperator);
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
    if (operation.answerVar % 1 != 0) {
        const decimalForm = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 8,
        })
        displayInput.value = decimalForm.format(operation.answerVar);
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

eqButton.addEventListener('click', operate);