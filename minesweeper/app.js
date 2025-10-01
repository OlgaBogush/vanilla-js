import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js"

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 5

// array
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

const mineLeftText = document.querySelector("[data-mine-count]")
mineLeftText.textContent = NUMBER_OF_MINES

const subText = document.querySelector(".subtext")

board.forEach((item) => {
  item.forEach((i) => {
    boardElement.append(i.element)
    i.element.addEventListener("click", () => {
      revealTile(board, i)
      checkGameEnd()
    })
    i.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTile(i)
      listMinesLeft()
    })
  })
})

function listMinesLeft() {
  const marketTilesCount = board.reduce((acc, cur) => {
    return (
      acc + cur.filter((item) => item.status === TILE_STATUSES.MARKED).length
    )
  }, 0)
  mineLeftText.textContent = NUMBER_OF_MINES - marketTilesCount
}

function checkGameEnd() {
  const win = checkWin(board)
  const lose = checkLose(board)
  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true })
    boardElement.addEventListener("contextmenu", stopProp, { capture: true })
  }
  if (win) {
    subText.textContent = "You Win!"
  }
  if (lose) {
    subText.textContent = "You Lose!"
    board.forEach((item) => {
      item.forEach((i) => {
        boardElement.append(i.element)
        if (i.status === TILE_STATUSES.MARKED) markTile(i)
        if (i.mine) revealTile(board, i)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}
