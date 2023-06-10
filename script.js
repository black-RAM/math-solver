function operate(input) {
  input = input.split(" ");
  input.splice(-2);
  const [x, o, y] = input;

  // mapping of operators to functions
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b)
  };
  // Add additional keys for certain operators
  operators['÷'] = operators['/']; 
  operators['x'] = operators['*'];

  const operatorFunc = operators[o]; // access function for operator

  let ans = operatorFunc(parseFloat(x), parseFloat(y));// pass numbers as function parameters

  // turns ans into a string, match digits after "."
  decimals = JSON.stringify(ans).match(/(?<=\.)\d+/);
  if(decimals === null) decimals = [];

  // round to ten d.p.
  if(decimals.length > 10) ans = ans.toFixed(10);

  return ans; // return result
}

// DOM reference to calc displays and clickable buttons
const displayA = document.getElementById('main-display');
const displayB = document.getElementById('up-display');
const toDisplay = [
  ...document.getElementsByClassName('num'),
  ...document.getElementsByClassName('o')
];

// populate the display
let onDisplay = "";
let currentDisplay = displayA;
let opNum = 0;
let char = "";

toDisplay.forEach((button) => {

  button.addEventListener('click', () => {
    char = button.innerText;

    // Check if character is a decimal point
    if (char === '.') {
      // Check if the current operand already contains a decimal point
      const lastOperand = onDisplay.split(' ').pop();
      if (lastOperand.includes('.')) {
        return; // Skip appending the decimal point
      }
    }

    if(/[+x÷^=-]/.test(char)) { // if character is an operator
      currentDisplay = displayB;
      onDisplay+=` ${char} `;
      currentDisplay.innerText = onDisplay;
      displayA.innerText = "";
      opNum++;
    } else {
      currentDisplay = displayA;
      onDisplay+=char;
      currentDisplay.innerText += char;
    };
    
    // evaluate, if more than 1 operator
    if(opNum > 1) {
      let result = operate(onDisplay);
      if(char === "=") {
        onDisplay = result;
        opNum = 0;
        displayA.innerText = onDisplay;
      } else {
        onDisplay = [result, char].join("");
        opNum = 1;
        displayB.innerText = onDisplay;
      }
    }

    // edge case: user clicks number then equals
    document.getElementById('equals').addEventListener('click', () => {
      if(opNum === 1) {
        onDisplay = onDisplay.match(/(\d+|\.)/gi).join("");
        displayA.innerText = onDisplay;
        opNum = 0;
      }
    })
  });
});

// clear buttons
const clears = [
  document.getElementById('C'),
  document.getElementById('AC')
]
clears[0].addEventListener('click', () => {
  onDisplay = onDisplay.slice(0, -1);
  currentDisplay.innerText = onDisplay;
}); // backspace
clears[1].addEventListener('click', () => {
  onDisplay = '';
  displayA.innerText = '';
  displayB.innerText ='';
}); // clear all

// Keyboard functionality
document.addEventListener('keydown', (event) => {
  const key = event.key;
  handleKeyPress(key);
});

function handleKeyPress(key) {
  // Check if the key is a number
  if (/^\d$/.test(key)) {
    appendNum();
  }

  // Check if the key is the decimal point (.)
  if (key === '.') {
    // prevent multiple decimals
    const lastOperand = onDisplay.split(' ').pop();
    if (lastOperand.includes('.')) {
      return;
    }
    appendNum();
  }

  function appendNum() {
    onDisplay += key;
    currentDisplay = displayA;
    currentDisplay.innerText += key;
  }

  // if key is an operator
  if(/^[+x÷^=-]$/.test(key)) {
    onDisplay+=` ${key} `;
    currentDisplay = displayB;
    currentDisplay.innerText = onDisplay;
    displayA.innerText = "";
    opNum++;
  };

  // Check if the key is the equals sign (=)
  if (key === '=') {
    // in case user pressed equals early
    if (opNum === 1) {
      onDisplay = onDisplay.match(/(\d+|\.)/gi).join('');
      displayA.innerText = onDisplay;
      opNum = 0;
    } else if (opNum > 1) {
      let result = operate(onDisplay);
      onDisplay = result;
      opNum = 0;
      displayA.innerText = onDisplay;
    }
  }

  // Check if the key is the backspace key
  if (key === 'Backspace') {
    onDisplay = onDisplay.slice(0, -1);
    currentDisplay.innerText = onDisplay;
  }

  // Check if the key is the Escape key (clear all)
  if (key === 'Escape') {
    onDisplay = '';
    displayA.innerText = '';
    displayB.innerText = '';
    opNum = 0;
  }
}