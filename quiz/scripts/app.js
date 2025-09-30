const startButton = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffleQuestions
let currentQuestionIndex

startButton.addEventListener("click", startGame)
nextBtn.addEventListener("click", setNextQuestion)


function startGame() {
  startButton.classList.add("hide")
  shuffleQuestions = questions.sort(()  => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainer.classList.remove("hide")
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffleQuestions[currentQuestionIndex])
  currentQuestionIndex++
}

function resetState() {
  nextBtn.classList.add("hide")
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
  // console.log("reset");
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach((item) => {
    const button = document.createElement("button")
    button.classList.add("btn")
    button.innerText = item.text
    if(item.correct) {
      button.dataset.correct = item.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function selectAnswer(e) {
  const selectedButton = e.target
  const status = selectedButton.dataset.correct
  Array.from(answerButtonsElement.children).forEach((item) => {
    if (!status) {
      selectedButton.classList.add("wrong")
      if (item.dataset.correct) {
        item.classList.add("correct")
      }
    } else {
      selectedButton.classList.add("correct")
    }
  })
  if (currentQuestionIndex < questions.length ) {
    nextBtn.classList.remove("hide")
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
  }
}

