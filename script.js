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

clearBtn.addEventListener('click', clearNumber);
deleteBtn.addEventListener('click', deleteNumber);
equalBtn.addEventListener('click', () => { //for equal button
  if(currentOperation == null){
    return;
  }
  execute(equalBtn.textContent);
})
window.addEventListener('keydown', keyboardInput);

numberBtn.forEach((button) => {
  button.addEventListener('click', () => addNumber(button.textContent));
})

operatorBtn.forEach((button) => {
  button.addEventListener('click', () => setOperation(button.textContent));
})

// collect all the input number
function addNumber(number){
  if(currentOperation == "÷" && number == "0"){
    alert("you cannot divide by 0 !");
    number = "";
  } else if(currentScreen.textContent === "0"){
    currentScreen.textContent = "";
  }
  currentScreen.textContent += number;
}

function keyboardInput(e){
  if(e.key <= 9){
    addNumber(e.key);
  } else if(e.key == "+" || e.key == "-"){
    setOperation(e.key);
  } else if(e.key == "/"){
    setOperation("÷");
  } else if(e.key == "*"){
    setOperation("x");
  }
  return;
}

// set the operator
function setOperation(operator){
  // this is what will happen when user already input the operation before
  if(currentOperation !== null){
    execute(operator);
  } else if(currentOperation === null){ // when there is no operation, this logic will run
    firstNumber = currentScreen.textContent;
    currentOperation = operator;
    historyScreen.textContent = `${firstNumber} ${currentOperation}`;
    currentScreen.textContent = "";
  } else{
    return;
  }
}

function execute(operator){
  secondNumber = currentScreen.textContent;
  if(secondNumber == ""){
    historyScreen.textContent = `${firstNumber} ${operator}`
    currentOperation = operator;
    return;
  } else if(operator == "=" && secondNumber !== ""){
    currentScreen.textContent = parseFloat(operate(currentOperation, firstNumber, secondNumber).toFixed(3));
    historyScreen.textContent = `${firstNumber} ${currentOperation} ${secondNumber} =`;
    currentOperation = null;
    firstNumber = currentScreen.textContent;
    secondNumber = "";
  } else if(historyScreen.textContent.includes("+") || // this logic will calculate the previous operator then show current operator
            historyScreen.textContent.includes("-") || // e.g previous operator +, then user input -, this login will calculate the + first, then show the result with operator -
            historyScreen.textContent.includes("÷") ||
            historyScreen.textContent.includes("x") && secondNumber !== ""){
    currentScreen.textContent = parseFloat(operate(currentOperation, firstNumber, secondNumber).toFixed(3));
    historyScreen.textContent = `${currentScreen.textContent} ${operator}`;
    firstNumber = currentScreen.textContent;
    secondNumber = "";
    currentOperation = operator;
    currentScreen.textContent = "";
  }
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
    case "x":
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

