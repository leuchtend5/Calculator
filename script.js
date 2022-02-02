const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const pointBtn = document.getElementById('point');
const equalBtn = document.getElementById('equal');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const historyScreen = document.getElementById('history');
const currentScreen = document.getElementById('current');

let currentOperation = null;
let firstNumber = "";
let secondNumber = "";
let resetScreen = false;

clearBtn.addEventListener('click', clearNumber);
deleteBtn.addEventListener('click', deleteNumber);
equalBtn.addEventListener('click', () => {
  if(currentOperation == null){
    return;
  }
  execute(equalBtn.textContent);
})

numberBtn.forEach((button) => {
  button.addEventListener('click', () => addNumber(button.textContent));
})

operatorBtn.forEach((button) => {
  button.addEventListener('click', () => setOperation(button.textContent));
})

function addNumber(number){
  if(currentScreen.textContent === "0"){
    currentScreen.textContent = "";
  } else if(resetScreen){
    currentScreen.textContent = "";
    resetScreen = false;
  }
  currentScreen.textContent += number;
}

function setOperation(operator){
  if(currentOperation !== null){
    execute(operator);
  } else if(currentOperation === null){
    firstNumber = currentScreen.textContent;
    currentOperation = operator;
    historyScreen.textContent = `${firstNumber} ${currentOperation}`
    resetScreen = true;
  } else{
    return;
  }
}

function execute(operator){
  secondNumber = currentScreen.textContent;
  if(operator == "="){
    currentScreen.textContent = operate(currentOperation, firstNumber, secondNumber);
    historyScreen.textContent = `${firstNumber} ${currentOperation} ${secondNumber} =`;
  } else{
    currentScreen.textContent = operate(operator, firstNumber, secondNumber);
    historyScreen.textContent = `${currentScreen.textContent} ${operator}`;
  }
  currentOperation = null;
  firstNumber = currentScreen.textContent;
  secondNumber = "";
  resetScreen = true;
}

function operate(operator, a, b){
  let computation;
  let previous = parseFloat(a);
  let current = parseFloat(b);
  switch(operator){
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "÷":
      computation = previous / current;
      break;
    default:        
      return;
  }
  return computation;
}

function clearNumber(){
  currentScreen.textContent = "0";
  historyScreen.textContent = "";
  currentOperation = null;
  firstNumber = "";
  secondNumber = "";
}

function deleteNumber(){
  currentScreen.textContent = currentScreen.textContent.slice(0, -1);
}

