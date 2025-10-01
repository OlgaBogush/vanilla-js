import { TILE_STATUSES, createBoard, markTile } from "./minesweeper.js"

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 5

// array
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

const mineLeftText = document.querySelector("[data-mine-count]")
mineLeftText.textContent = NUMBER_OF_MINES

console.log(board)

board.forEach((item) => {
  item.forEach((i) => {
    boardElement.append(i.element)
    i.element.addEventListener("click", () => {
      console.log("click")
    })
    i.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTile(i)
      listMinesLeft()
    })
  })
})

function listMinesLeft() {
  const marketTilesCount = board.reduce((acc,cur) => {
    return acc + cur.filter(item => item.status === TILE_STATUSES.MARKED).length
  }, 0)
  mineLeftText.textContent = NUMBER_OF_MINES - marketTilesCount
}
