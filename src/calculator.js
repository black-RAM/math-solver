class Node {
  constructor(datum) {
    this.data = datum
    this.right = null
    this.left = null
  }
}

class CalculationTree {
  constructor(arithmetic) {
    this.root = this.buildTree(this.splitOperations(arithmetic))
  }

  splitOperations(arithmeticString) {
    return arithmeticString.split(/([-+*/^])/)
  }

  buildTree(terms) {
    if(terms.length == 1) return new Node(...terms)

    const precedences = terms.map(this.getPrecedence)
    const minPrecedenceIndex = precedences.lastIndexOf(Math.min(...precedences))
    const root = new Node(terms[minPrecedenceIndex])

    root.left = this.buildTree(terms.slice(0, minPrecedenceIndex))
    root.right = this.buildTree(terms.slice(minPrecedenceIndex + 1))

    return root
  }

  getPrecedence(term) {
    if(["+", "-"].includes(term)) {
      return 1
    } else if(["*", "/"].includes(term)) {
      return 2
    } else if(term == "^") {
      return 3
    } else {
      return Infinity
    }
  }
}

function handleExceptions(input) {
  return !(typeof input == "string" || input.split().every(char => /^\d|[-+*/^.]$/.test(char)))
}

function operate(expression) {
  const exception = handleExceptions(expression)
  if(exception) return "Math Error"

  const tree = new CalculationTree("100/5*4^2-8*3+15")
  console.log(tree.root)
  
  return Number(eval(expression))
}

export default operate