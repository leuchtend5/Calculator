const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const pointBtn = document.getElementById('point');
const equalBtn = document.getElementById('equal');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const historyScreen = document.getElementById('history');
const currentScreen = document.getElementById('current');

let userInputValue = "";

function userInput(){
  // for button input
  numberBtn.forEach(button => {
    button.addEventListener('click', function(){
      if(button.textContent <= 9){
       userInputValue = button.textContent;
      }
      updateCurrentDisplay();
    });
  })

  // for keyboard input
  window.addEventListener('keydown', (e) => {
    if(e.key <= 9){
      userInputValue = e.key;
    } else{
      return userInputValue;
    }
    updateCurrentDisplay();
  })
}

function operatorInput(){
  operatorBtn.forEach(button => {
    button.addEventListener('click', function(e){
      if(button.textContent == "+"){
        historyScreen.textContent = currentScreen.textContent;
      }
    })
  })
}

function updateCurrentDisplay(){
  if(currentScreen.textContent == "0"){
    currentScreen.textContent = "";
    currentScreen.textContent += userInputValue;
  } else if(currentScreen.textContent.length == 12){
    return currentScreen.textContent;
  } else{
   currentScreen.textContent += userInputValue;
  }
}

function clear(){
  currentScreen.textContent = "0";
  historyScreen.textContent = "";  
}

// function historyDisplay(){
//   historyScreen.textContent = currentScreen.textContent;
// }

clearBtn.addEventListener('click', clear);
window.addEventListener('load', () => {
  userInput();
  operatorInput();
});