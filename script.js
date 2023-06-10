// DOM references
const displayA = document.getElementById('main-display');
const displayB = document.getElementById('up-display');
const toDisplay = [
  ...document.getElementsByClassName('num'),
  ...document.getElementsByClassName('o')
];

// State variables
let onDisplay = "";
let currentDisplay = displayA;
let opNum = 0;

// Event listener for button clicks
toDisplay.forEach((button) => {
  button.addEventListener('click', () => {
    let char = button.innerText;
    if(char === 'π') char = Math.PI;

    // prevent multiple decimals
    if (char === '.') {
      const lastOperand = onDisplay.split(' ').pop();
      if (lastOperand.includes('.')) {
        return;
      }
    }

    if (/[+x÷^=-]/.test(char)) { // if char is operator
      currentDisplay = displayB;
      onDisplay += ` ${char} `;
      currentDisplay.innerText = onDisplay;
      displayA.innerText = "";
      opNum++;
    } else {
      currentDisplay = displayA;
      onDisplay += char;
      currentDisplay.innerText += char;
    }

    if (opNum > 1) {
      let result = operate(onDisplay);
      if (char === "=") {
        onDisplay = result;
        opNum = 0;
        displayA.innerText = onDisplay;
      } else {
        onDisplay = `${result}${char}`;
        opNum = 1;
        displayB.innerText = onDisplay;
      }
    }
  });
});

// Event listener for equals button click
document.getElementById('equals').addEventListener('click', () => {
  if (opNum === 1) {
    onDisplay = onDisplay.match(/(\d+|\.)/gi).join("");
    displayA.innerText = onDisplay;
    opNum = 0;
  }
});

// Event listeners for clear buttons
document.getElementById('C').addEventListener('click', () => {
  onDisplay = onDisplay.slice(0, -1);
  currentDisplay.innerText = onDisplay;
}); // backspace

document.getElementById('AC').addEventListener('click', () => {
  onDisplay = '';
  displayA.innerText = '';
  displayB.innerText = '';
}); // clear all

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;
  handleKeyPress(key);
});

function handleKeyPress(key) {
  if (/^\d$/.test(key) || key === '.') {
    const lastOperand = onDisplay.split(' ').pop();
    if (key === '.' && lastOperand.includes('.')) {
      return; // Skip appending the decimal point
    }
    appendNum();
  }

  function appendNum() {
    onDisplay += key;
    currentDisplay = displayA;
    currentDisplay.innerText += key;
  }

  if (/^[+x÷^=-]$/.test(key)) {
    onDisplay += ` ${key} `;
    currentDisplay = displayB;
    currentDisplay.innerText = onDisplay;
    displayA.innerText = "";
    opNum++;
  }

  if (key === '=') {
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

  if (key === 'Backspace') {
    onDisplay = onDisplay.slice(0, -1);
    currentDisplay.innerText = onDisplay;
  }

  if (key === 'Escape') {
    onDisplay = '';
    displayA.innerText = '';
    displayB.innerText = '';
    opNum = 0;
  }
}

// Calculator operations
function operate(input) {
  input = input.split(" ");
  input.splice(-2);
  const [x, o, y] = input;

  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b),
    '÷': (a, b) => a / b,
    'x': (a, b) => a * b
  };

  const operatorFunc = operators[o];
  let ans = operatorFunc(parseFloat(x), parseFloat(y));

  const decimals = JSON.stringify(ans).match(/(?<=\.)\d+/) || [];
  if (decimals.length > 10) {
    ans = ans.toFixed(10);
  }

  return ans;
}