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

  // Check if the operator exists in the mapping
  if (operators.hasOwnProperty(o)) {
    // Get the corresponding function for the operator
    const operatorFunc = operators[o];

    // Apply the operator function to the numbers
    let ans = operatorFunc(Number(x), Number(y));
    
    return ans;
  } else {
    throw new Error(`Unsupported operator: ${o}`);
  }
}

// Example usage
console.log(operate('3 + 5')); // Output: 8
console.log(operate('6 * 2')); // Output: 12
console.log(operate('10 - 4')); // Output: 6
console.log(operate('9 / 3')); // Output: 3
console.log(operate('2 ** 4')); // Output: 16