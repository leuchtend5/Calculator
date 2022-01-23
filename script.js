const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const pointBtn = document.getElementById('point');
const equalBtn = document.getElementById('equal');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const historyScreen = document.getElementById('history');
const currentScreen = document.getElementById('current');

let userInputValue = "";
let arrayNumber = [];
let total = 0;

// function userInput(){
//   // for number button input
//   numberBtn.forEach(button => {
//     button.addEventListener('click', function(){
//       if(button.textContent <= 9){
//         userInputValue = button.textContent;
//       }
//       updateCurrentDisplay(); // for updateting the currentScreen
//     });
//   })
// 
//   operatorBtn.forEach(button => {
//     button.addEventListener('click', function(){
//       if(button.textContent == "+"){
//         historyScreen.textContent = currentScreen.textContent + button.textContent;
//         let stringToNumber = parseInt(currentScreen.textContent); // convert the string to number
//         arrayNumber.push(stringToNumber) // add the number into the array
//       }
//     })
//   })
// 
//   // for keyboard input (number and delete button)
//   window.addEventListener('keydown', (e) => {
//     if(e.key <= 9){
//       userInputValue = e.key;
//       updateCurrentDisplay();
//     } else if(e.key == 'Backspace'){
//       let finalNumber = currentScreen.textContent.slice(0, -1); // delete from keyboard input
//       currentScreen.textContent = finalNumber;
//     }
//   })
// }

function userInputClick(e){
  if(e.target.textContent <= 9){
    userInputValue = e.target.textContent;
    updateCurrentDisplay();
  } else if(e.target.textContent == "+"){
    historyScreen.textContent = currentScreen.textContent + e.target.textContent;
    let stringToNumber = parseInt(currentScreen.textContent); // convert the string to number
    arrayNumber.push(stringToNumber) // add the number into the array
  }
}

function userInputKeyboard(e){

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

function deleteNumber(){
  let newNumber = currentScreen.textContent.slice(0, -1);
  currentScreen.textContent = newNumber;
}

clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
window.addEventListener('click', userInputClick);
window.addEventListener('keydown', userInputKeyboard);