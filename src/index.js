import operate from "./calculator"
import "./style.css"

let initializeInput = (inputHandler) => {
  const keypad = document.getElementById("keypad")
  keypad.addEventListener("click", event => inputHandler(event.target.innerText))
  document.addEventListener("keyup", event => inputHandler(event.key))
}

let updateView = (newState) => {
  const displayA = document.getElementById('main-display')
  const displayB = document.getElementById('up-display')
  if(newState.answer) displayA.innerText = newState.answer
  displayB.innerText = newState.expression
}

const calculatorInterface = () => {
  const state = {
    expression: "",
    answer: NaN
  }

  const calculate = () => {
    state.answer = operate(state.expression)
  }

  const backSpace = () => {
    let temp = state.expression.split("")
    temp.pop()
    temp = temp.join("")
    state.expression = temp
  }

  const clear = () => {
    state.expression = ""
  }

  const userCommands = {
    "=": calculate,
    "Backspace": backSpace,
    "Escape": clear
  }
 
  const reset = () => {
    state.expression = String(state.answer)
    state.answer = NaN
  }

  const handleDecimal = () => {
    const lastNum = state.expression.match(/\d+(\.\d+)?/g).pop()
    const isInteger = /^\d+$/.test(lastNum)
    return isInteger ? "." : ""
  }

  const validInput = (testString) => {
    return typeof testString == "string" && /^\d|[-+*/.=^]|Escape|Backspace?$/.test(testString)
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
    if(key == ".") key = handleDecimal()
    if(!validInput(key)) return
    
    if(Object.hasOwn(userCommands, key)) {
      userCommands[key]()
    } else {
      if(state.answer && /[-+*/.=^]/.test(key)) reset()
      state.expression += key
    }

    updateView(state)
  }

  initializeInput(handleInput)
}

// start app
calculatorInterface()

export default calculatorInterface