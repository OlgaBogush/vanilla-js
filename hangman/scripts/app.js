const keyboardElement = document.querySelector(".keyboard")
const wordDisplay = document.querySelector(".word-display")
const guessesText = document.querySelector(".guesses-text span")
const hangmanImage = document.querySelector(".hangman-box img")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessesCount
const maxGuesses = 6

const resetGame = () => {
  correctLetters = []
  wrongGuessesCount = 0
  hangmanImage.src = `./svg/${wrongGuessesCount}.svg`
  guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`
  keyboardElement
    .querySelectorAll("button")
    .forEach((item) => (item.disabled = false))
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("")
  gameModal.classList.remove("show")
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
  currentWord = word
  console.log(currentWord)
  document.querySelector(".hint-text span").innerText = hint
  resetGame()
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You have found the word:`
      : `The correct word was:`
    gameModal.querySelector("img").src = isVictory
      ? `./svg/happy.svg`
      : `./svg/sad.svg`
    gameModal.querySelector("h4").innerText = isVictory
      ? "Congrats!"
      : "Game Over!"
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <span class="correct-word">${currentWord}</span>`
    gameModal.classList.add("show")
  }, 300)
}

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    ;[...currentWord].forEach((item, index) => {
      if (item === clickedLetter) {
        correctLetters.push(item)
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
        wordDisplay.querySelectorAll("li")[index].innerText = item
      }
    })
  } else {
    wrongGuessesCount++
    hangmanImage.src = `./svg/${wrongGuessesCount}.svg`
  }
  guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`
  button.disabled = true
  if (wrongGuessesCount === maxGuesses) return gameOver(false)
  if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button")
  button.innerText = String.fromCharCode(i)
  keyboardElement.append(button)
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  )
}

getRandomWord()

playAgainBtn.addEventListener("click", getRandomWord)
