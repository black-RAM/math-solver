function operate(input) {
  const x = parseFloat(input.match(/(\d+)/));
  const o = input.match(/[+x÷^-]/)[0];
  const y = parseFloat(input.match(/(?<=[+\-x÷^])\d+/));
  console.log(x,o,y);

  // Define the mapping of operators to functions
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b)
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

const toDisplay = [
  ...document.getElementsByClassName('num'),
  ...document.getElementsByClassName('o')];

let onDisplay = [];

toDisplay.forEach((button) => {

  button.addEventListener('click', () => {
    let char = button.innerText;
    onDisplay.push(char);
    
    let isOp = /[+\-x÷=]/.test(char);

    if(!isOp) {
      displayA.innerText += char;
    } else {
      displayB.innerText = onDisplay.join('');
      displayA.innerText = "";
    }

    console.log(onDisplay);
  });
});

// evaluate when = clicked
document.getElementById('equals').addEventListener('click', () => {
  console.log(
    operate(onDisplay.join(''))
  )
  onDisplay = [];
})