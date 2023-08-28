function countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function processResult() {
    if (currValue.textContent && prevValue.textContent) {
        let prevValueAsNumber = parseFloat(prevValue.textContent);
        let currValueAsNumber = parseFloat(currValue.textContent);
        let result;
        switch (currOperator) {
            case '÷':
                result = (prevValueAsNumber / currValueAsNumber);
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
        if (countDecimals(result) > 3) {
            result = result.toFixed(3);
        } else if (countDecimals(result) >= 1) {
            result = result.toFixed(countDecimals(result));
        }
        currValue.textContent = result;
        prevValue.textContent = '';
    }
}

const display = document.querySelector('.display');
const currValue = document.querySelector('.current-value');
const prevValue = document.querySelector('.previous-value');

let currOperator;

const numberButtons = document.querySelectorAll('.numbers');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currValue.textContent.length < 18) {
            currValue.textContent += button.textContent;
        }
    });
});

const acButton = document.querySelector('#ac');
acButton.addEventListener('click', () => {
    prevValue.textContent = '';
    currValue.textContent = '';
    currOperator = '';
});

const cButton = document.querySelector('#c');
cButton.addEventListener('click', () => {
    currValue.textContent = '';
});

const decimalPointButton = document.querySelector('#decimal-point');
decimalPointButton.addEventListener('click', () => {
    currValue.textContent += '.';
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currValue.textContent) {
            if (prevValue.textContent) {
                processResult();
            }
            currOperator = button.textContent;
            prevValue.textContent = currValue.textContent + ' ' + currOperator;
            currValue.textContent = '';
        }
    });
});

const resultButton = document.querySelector('#result');
resultButton.addEventListener('click', processResult);

const sqrtButton = document.querySelector('#sqrt');
sqrtButton.addEventListener('click', () => {
    currValue.textContent = Math.sqrt(currValue.textContent);
});
