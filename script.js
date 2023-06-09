function operate(input) {
  input = input.split(" ");
  input.splice(-2);
  const [x, o, y] = input;

  // mapping of operators to functions
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b)
  };
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
let opNum = 0;
let char = "";
let currentDisplay = displayA;

toDisplay.forEach((button) => {

  button.addEventListener('click', () => {
    char = button.innerText;

    if(/[+x÷^=-]/.test(char)) {
      currentDisplay = displayB;
      onDisplay+=` ${char} `;
      displayB.innerText = onDisplay;
      displayA.innerText = "";
      opNum++;
    } else {
      onDisplay+=char;
      currentDisplay = displayA;
      displayA.innerText += char;
    };
    
    // evaluate
    if(opNum > 1) {
      let result = operate(onDisplay);
      if(char === "=") {
        onDisplay = [result];
        opNum = 0;
        displayA.innerText = onDisplay;
      } else {
        onDisplay = [result, char].join("");
        opNum = 1;
        displayB.innerText = onDisplay;
      }
    }
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