let screenExpression = document.getElementById('expression');
let screenValue = document.getElementById('typed');
const btns = document.querySelectorAll('.btn');

let expressionMembers = [];

function disableButtons() {
    btns.forEach(btn => {
        if(!btn.classList.contains('clear')){
            btn.setAttribute('disabled', 'true');
            btn.style.opacity = '0.5';
        } 
    });
}

function ableButtons() {
    btns.forEach(btn => {
        if(!btn.classList.contains('clear')){
            btn.removeAttribute('disabled');
            btn.style.opacity = '1';
        } 
    });
}

function evaluate() {
    let result = 0;

    for(let i = 0; i < expressionMembers.length; i++) {
        if(expressionMembers[i] === '*' ) {
            expressionMembers[i] = expressionMembers[i - 1] * expressionMembers[i + 1];
            expressionMembers[i - 1] = expressionMembers[i + 1] = 0;
        } else if (expressionMembers[i] === '/' ) {
            expressionMembers[i] = expressionMembers[i - 1] / expressionMembers[i + 1];
            expressionMembers[i - 1] = expressionMembers[i + 1] = 0;
        }
    }

    expressionMembers = expressionMembers.filter(expressionMember => expressionMember !== 0);
    result = expressionMembers[0];

    for(let i = 0; i < expressionMembers.length; i++) {
        if(expressionMembers[i] === '+' ) {
            result += expressionMembers[i+1];
        } else if (expressionMembers[i] === '-' ) {
            result -= expressionMembers[i+1];
        }
    }

    console.log(expressionMembers);

    screenValue.innerHTML = result;
    result = 0;
    expressionMembers = [];

    disableButtons();
}

function handleClick({ target }) {
    if(target.classList.contains('clear')){
        screenValue.innerHTML = 0;
        screenExpression.innerHTML = 0;

        expressionMembers = [];

        ableButtons();

        screenExpression.style.opacity = '0';
    } else if(target.classList.contains('num') || target.classList.contains('dot')) {
        if(screenValue.innerHTML == 0) screenValue.innerHTML = '';
        
        screenValue.innerHTML += target.value;
    } else if(target.classList.contains('op')) {
        screenExpression.style.opacity = '1';

        if(screenValue.innerHTML !== ''){
            if(screenExpression.innerHTML == 0) screenExpression.innerHTML = '';

            expressionMembers.push(Number(screenValue.innerHTML));
            expressionMembers.push(target.value);

            screenExpression.innerHTML += screenValue.innerHTML + target.value;
            
            screenValue.innerHTML = '';
        }
    } else {
        if(expressionMembers.length !== 0 || screenValue.innerHTML !== '') {
            expressionMembers.push(Number(screenValue.innerHTML));

            screenExpression.innerHTML += screenValue.innerHTML + target.value;

            evaluate();
        }
    }
}


btns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});