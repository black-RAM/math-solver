function operate(input) {
  const x = parseFloat(input.match(/(\d+)/)); // match first number
  const o = input.match(/[+x÷^-]/)[0]; // match operator
  const y = parseFloat(input.match(/(?<=[+\-x÷^])\d+/)); // match number after operator

  // Define the mapping of operators to functions
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

// populate display
const displayA = document.getElementById('main-display');
const displayB = document.getElementById('up-display');

const toDisplay = [
  ...document.getElementsByClassName('num'),
  ...document.getElementsByClassName('o')
];

let onDisplay = [];

toDisplay.forEach((button) => {

  button.addEventListener('click', () => {
    let char = button.innerText;
    onDisplay.push(char);
    
    let isOp = /[+\-x÷=]/.test(char);

    if(isOp) {
      displayB.innerText = onDisplay.join('');
      displayA.innerText = "";
    } else {
      displayA.innerText += char;
    }
  });
});

// evaluate when = clicked
document.getElementById('equals').addEventListener('click', () => {
  operate(onDisplay.join(''))
  onDisplay = [];
})