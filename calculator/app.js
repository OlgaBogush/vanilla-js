class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement
    this.currentTextElement = currentTextElement
    this.clear()
  }

  clear() {
    this.previous = ""
    this.current = ""
    this.operation = undefined
  }

  delete() {
    this.current = this.current.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return
    this.current = this.current.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.current === "") return
    if (this.previous !== "") {
      this.compute()
    }
    this.previous = this.current
    this.current = ""
    this.operation = operation
  }

  compute() {
    let result
    const prev = parseFloat(this.previous)
    const cur = parseFloat(this.current)
    if (isNaN(prev) || isNaN(cur)) return
    switch (this.operation) {
      case "*":
        result = prev * cur
        break
      case "+":
        result = prev + cur
        break
      case "-":
        result = prev - cur
        break
      case "÷":
        result = prev / cur
        break
      default:
        return
    }
    this.current = result
    this.previous = ""
    this.operation = undefined
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integer = parseFloat(stringNumber.split(".")[0])
    const decimal = stringNumber.split(".")[1]
    let integerDisplay

    if(isNaN(integer)) {
      integerDisplay = ""
    } else {
      integerDisplay = integer.toLocaleString("ru", {maximumFractionDigits: 0})
    }

    if(decimal != null) {
      return `${integerDisplay}.${decimal}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplayNumber(this.current)
    if(this.operation !== undefined) {
      this.previousTextElement.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`
    } else {
      this.previousTextElement.innerText = ""
    }
    // console.log(this);
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationsButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const clearButton = document.querySelector("[data-all-clear]")

const previousTextElement = document.querySelector("[data-previous-operand]")
const currentTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach((item) => {
  item.addEventListener("click", () => {
    calculator.appendNumber(item.innerText)
    calculator.updateDisplay()
  })
})

operationsButtons.forEach((item) => {
  item.addEventListener("click", () => {
    calculator.chooseOperation(item.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener("click", () => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
  calculator.delete()
  calculator.updateDisplay()
})
