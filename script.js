function operate(str) {
  const [x, o, y] = 
    str.split(' ') // split string
    .map(part => part.trim()) //remove whitespace;

  // Define the mapping of operators to functions
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '**': (a, b) => Math.pow(a, b)
  };

  // Get the corresponding function for the operator
  const operatorFunc = operators[o];

  // Apply the operator function to the numbers
  let ans = operatorFunc(+x, +y);
  
  return ans;
}

// populate display
const displayA = document.getElementById('main-display');
const displayB = document.getElementById('up-display');

const nums = [...document.getElementsByClassName('num')]; // number buttons
const ops = [...document.getElementsByClassName('o')]; // operator buttons

const toDisplay = [...nums, ...ops];

let onDisplay = [];

toDisplay.forEach((button) => {

  button.addEventListener('click', () => {
    let char = button.innerText;
    onDisplay.push(char);
    
    let isOp = /[+\-×÷=]/.test(char);

    if(!isOp) {
      displayA.innerText += char;
    } else {
      displayB.innerText = onDisplay.join('');
      displayA.innerText = "";
    }
  });
});