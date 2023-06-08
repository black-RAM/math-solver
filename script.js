function operate(input) {
  const x = parseFloat(input.match(/(\d+)/)); // match first number
  const o = input.match(/[+x÷^-]/)[0]; // match operator
  const y = parseFloat(input.match(/(?<=[+\-x÷^])\d+/)); // match number after operator
  // mapping of operators to functions
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b)
  };
  const operatorFunc = operators[o]; // access function for operator
  let ans = operatorFunc(+x, +y);// pass numbers as function parameters
  return ans; // return result
}

// DOM reference to calc displays and clickable buttons
const displayA = document.getElementById('main-display');
const displayB = document.getElementById('up-display');
const toDisplay = [
  ...document.getElementsByClassName('num'),
  ...document.getElementsByClassName('o')
];

let onDisplay = "";
let opNum = 0;

toDisplay.forEach((button) => {

  button.addEventListener('click', () => {
    let char = button.innerText;
    onDisplay+=char;

    if(/[+x÷^=-]/.test(char)) {
      displayB.innerText = onDisplay;
      displayA.innerText = "";
      opNum++;
    } else {
      displayA.innerText += char;
    };
    
    // evaluate
    if(opNum > 1) {
      let result = operate(onDisplay);
      displayA.innerText = result;
      if(char === "=") {
        onDisplay = [result];
        opNum = 0;
      } else {
        onDisplay = [result, char].join("");
        opNum = 1;
        displayB.innerText = onDisplay;
        displayA.innerText = "";
      }
    }
  });
});