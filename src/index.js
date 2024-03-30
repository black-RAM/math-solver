import Calculator from "./calculator"
import regExpLib from "./regex"
import "./style.css"

const initializeInput = (inputHandler) => {
  const keypad = document.getElementById("keypad")
  keypad.addEventListener("click", event => inputHandler(event.target.innerText))
  document.addEventListener("keyup", event => inputHandler(event.key))
}

const updateView = (newState) => {
  const displayA = document.getElementById('main-display')
  const displayB = document.getElementById('up-display')
  displayA.innerText = newState.answer
  displayB.innerText = newState.expression
}

const initializeState = () => {
  // properties are private
  let expression = ""
  let answer = ""

  // methods
  const preventDoubleDecimal = () => {
    const numArray = expression.match(regExpLib.allPossibleDecimals) || ["0"]
    return regExpLib.integer.test(numArray.pop()) ? "." : ""
  }

  const append = (term) => {
    if(!regExpLib.arithmetic.test(term)) return
    if(regExpLib.isDecimal.test(term)) term = preventDoubleDecimal()
    expression += term
  }

  const calculate = () => {
    const calculator = new Calculator(expression)
    answer = String(calculator.answer)
  }

  const backSpace = () => {
    expression = expression.slice(0, -1)
  }

  const clear = () => {
    expression = ""
    answer = ""
  }

  const reset = () => {
    expression = answer
    answer = ""
  }

  const read = () => ({expression, answer})

  return {
    append,
    calculate,
    backSpace,
    clear,
    read,
    reset
  }
}

const calculatorInterface = () => {
  const state = initializeState()

  const userCommands = {
    "=": state.calculate,
    "Backspace": state.backSpace,
    "Escape": state.clear
  }

  const keyboardChar = {
    "÷": "/",
    "×": "*",
    "C": "Backspace",
    "AC": "Escape", 
    "Enter":  "=",
    "π":"22/7"
  }
 
  const handleInput = (key) => {
    if(Object.hasOwn(keyboardChar, key)) key = keyboardChar[key]
    
    if(Object.hasOwn(userCommands, key)) {
      userCommands[key]()
    } else {
      if(state.read().answer) {
        if(regExpLib.integer.test(key)) state.clear()
        state.reset()
      }
      
      state.append(key)      
    }

    updateView(state.read())
  }

  initializeInput(handleInput)
}

// start app
calculatorInterface()

export default calculatorInterface