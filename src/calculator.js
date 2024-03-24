function operate(expression) {
  if(!(typeof expression == "string" && expression.split().every(char => /^\d|[-+*/.]$/.test(char)))) {
    throw new Error("operate argument must be an arithmetic expression")
  }

  return Number(eval(expression))
}

export default operate