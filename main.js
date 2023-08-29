function countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function processResult() {

    prevOperator = '=';
    if (currValue.textContent && prevValue.textContent) {
        let prevValueAsNumber = parseFloat(prevValue.textContent);
        let currValueAsNumber = parseFloat(currValue.textContent);
        let result;
        switch (currOperator) {
            case '÷': case '/':
                result = (prevValueAsNumber / currValueAsNumber);
                if (result == Infinity) {
                    result = "Can't divide by zero!";
                }
                break;
            case '*':
                result = (prevValueAsNumber * currValueAsNumber);
                break;
            case '-':
                result = (prevValueAsNumber - currValueAsNumber);
                break;
            case '+':
                result = (prevValueAsNumber + currValueAsNumber);
                break;
        }
        if (typeof(result) === 'number') {
            if (countDecimals(result) > 3) {
                result = result.toFixed(3);
            } else if (countDecimals(result) >= 1) {
                result = result.toFixed(countDecimals(result));
            }
        }
        currValue.textContent = result;
        prevValue.textContent = '';
    }
}

function processNumber(number) {
    if (prevOperator == '=' || currValue.textContent == sqrtOfNegativeMsg) {
        currValue.textContent = '';
        prevOperator = '';
    }
    if (currValue.textContent.length < 20) {
        currValue.textContent += number;
    }
}

function processOperator(operator) {
    if (operator == '-' && !currValue.textContent) {
        prevOperator = '';
        currValue.textContent = '-';
    }
    else if (currValue.textContent) {
        if (prevValue.textContent) {
            processResult();
        }
        currOperator = operator;
        prevValue.textContent = currValue.textContent + ' ' + currOperator;
        currValue.textContent = '';
    }
}

function processDecimalPoint() {
    if (!currValue.textContent) {
        currValue.textContent = '0.';
    }
    else if (currValue.textContent && !currValue.textContent.includes('.')) {
        currValue.textContent += '.';   
    }
}

function processSqrt() {
    if (currValue.textContent) {
        if (parseFloat(currValue.textContent) < 0) {
            currValue.textContent = sqrtOfNegativeMsg;
        } else {
            currValue.textContent = Math.sqrt(currValue.textContent)
        }
    }
}

function allClear() {
    prevValue.textContent = '';
    currValue.textContent = '';
    currOperator = '';
}

const display = document.querySelector('.display');
document.addEventListener('keydown', (e) => {
    if (!isNaN(Number(e.key))) {
        processNumber(e.key);
    }
    switch (e.key) {
        case 'Backspace':
            currValue.textContent = currValue.textContent.slice(0, -1);
            break;
        case '*': case '+': case '-':
            processOperator(e.key);
            break;
        case '/':
            e.preventDefault();
            processOperator(e.key);
            break;
        case '.':
            processDecimalPoint();
            break;
        case 'a':
            allClear();
            break;
        case 'c':
            currValue.textContent = '';
            break;
        case 'r':
            processSqrt();
            break;
        case 'Enter':
            e.preventDefault();
            processResult();
            break;
    }

});

const currValue = document.querySelector('.current-value');
const prevValue = document.querySelector('.previous-value');

let currOperator;
let prevOperator;

const sqrtOfNegativeMsg = "Can't extract the square root of a negative value";

const numberButtons = document.querySelectorAll('.numbers');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        processNumber(button.textContent);
    });
});

const acButton = document.querySelector('#ac');
acButton.addEventListener('click', () => {
    allClear();
});

const cButton = document.querySelector('#c');
cButton.addEventListener('click', () => {
    currValue.textContent = '';
});

const decimalPointButton = document.querySelector('#decimal-point');
decimalPointButton.addEventListener('click', () => {
    processDecimalPoint();
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        processOperator(button.textContent);
    });
});

const resultButton = document.querySelector('#result');
resultButton.addEventListener('click', processResult);

const sqrtButton = document.querySelector('#sqrt');
sqrtButton.addEventListener('click', () => {
    processSqrt();
});