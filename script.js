// basic operation function declarations
function add(...args) {
  return args.reduce((x, y) => x + y);
}
function subtract(...args) {
  return args.reduce((x, y) => x - y);
}
function multiply(...args) {
  return args.reduce((x, y) => x*y)
}
function divide(...args) {
  return args.reduce((x, y) => x/y)
}
const exp = (num, exp) => num ** exp;