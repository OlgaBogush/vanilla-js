const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
)
const winningMessageElement = document.getElementById("winningMessage")
const restartButton = document.getElementById("restartButton")

let circleTurn

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach((item) => {
    // for restart
    item.classList.remove("circle")
    item.classList.remove("x")
    item.removeEventListener("click", handleClick)

    item.addEventListener("click", handleClick, { once: true })
  })
  setBoardHoverClass()
  // for restart
  winningMessageElement.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? "circle" : "x"
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    lostGame(false)
  } else if (isDraw()) {
    lostGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function isDraw() {
  return [...cellElements].every((item) => {
    return item.classList.contains("circle") || item.classList.contains("x")
  })
}

function lostGame(status) {
  if (status) {
    winningMessageTextElement.innerText = "Draw!"
    winningMessageElement.classList.add("show")
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    winningMessageElement.classList.add("show")
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove("circle")
  board.classList.remove("x")
  if (circleTurn) {
    board.classList.add("circle")
  } else {
    board.classList.add("x")
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((arr) => {
    return arr.every((item) => {
      return cellElements[item].classList.contains(currentClass)
    })
  })
}
