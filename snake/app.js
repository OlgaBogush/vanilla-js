const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const controls = document.querySelectorAll(".arrow")

let gameOver = false
let foodX, foodY
let snakeX = 5,
  snakeY = 10
let snakeBody = []
let velocityX = 0,
  velocityY = 0
let setIntervalId
let score = 0

let highScore = localStorage.getItem("high-score") || 0
highScoreElement.innerText = `High score: ${highScore}`

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1
  foodY = Math.floor(Math.random() * 30) + 1
}

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0
    velocityY = -1
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0
    velocityY = 1
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1
    velocityY = 0
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1
    velocityY = 0
  }
}

const handleGameOver = () => {
  clearInterval(setIntervalId)
  alert("Game Over!")
  location.reload()
}

controls.forEach((item) => {
  item.addEventListener("click", () => {
    changeDirection({ key: item.dataset.key })
  })
})

const initGame = () => {
  if (gameOver) {
    return handleGameOver()
  }
  console.log("i am initGame")
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`
  if (foodX === snakeX && foodY === snakeY) {
    changeFoodPosition()
    snakeBody.push([foodX, foodY])
    score++
    highScore = score >= highScore ? score : highScore
    localStorage.setItem("high-score", highScore)
    scoreElement.innerText = `Score: ${score}`
  }

  // 2) shift elements of snake
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]
  }

  snakeBody[0] = [snakeX, snakeY]

  // update head position
  snakeX += velocityX
  snakeY += velocityY

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true
  }

  // 1) snake gets food position
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`
    // checking if the snake hit the body
    if (
      i !== 0 &&
      snakeBody[i][1] === snakeBody[0][1] &&
      snakeBody[i][0] === snakeBody[0][0]
    ) {
      gameOver = true
    }
  }

  playBoard.innerHTML = htmlMarkup
}

changeFoodPosition()

document.addEventListener("keydown", changeDirection)

setIntervalId = setInterval(initGame, 125)
