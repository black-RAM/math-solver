class Node {
  constructor(datum) {
    this.data = datum
    this.right = null
    this.left = null
  }
}

class CalculationTree {
  constructor(arithmetic) {
    this.operatorTable = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '^': (a, b) => Math.pow(a, b),
    }
    this.tree = this.buildTree(this.splitOperations(arithmetic))
    this.answer = this.calculate()
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

  calculate(root = this.tree) { // post-order transversal
    if(!/[-+*/^]/.test(root.data)) return Number(root.data)
    const leftValue = this.calculate(root.left)
    const rightValue = this.calculate(root.right)
    const operator = this.operatorTable[root.data]
    const value = operator(leftValue, rightValue)
    return value
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

export default CalculationTree