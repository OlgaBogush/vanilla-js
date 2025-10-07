const cards = document.querySelectorAll(".card")

let counterMatchedCards = 0
let cardOne, cardTwo
let isDisabled = false

cards.forEach((item) => {
  item.addEventListener("click", flipCard)
})

function flipCard(e) {
  let clickedCard = e.target
  if (clickedCard !== cardOne && !isDisabled) {
    clickedCard.classList.add("flip")
    if (!cardOne) {
      return (cardOne = clickedCard)
    }
    cardTwo = clickedCard
    isDisabled = true
    // to get img
    let cardOneImg = cardOne.querySelector("img").src
    let cardTwoImg = cardTwo.querySelector("img").src
    matchCards(cardOneImg, cardTwoImg)
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    counterMatchedCards++
    if (counterMatchedCards == 8) {
      setTimeout(() => {
        return shufleCards()
      }, 1000)
    }
    cardOne.removeEventListener("click", flipCard)
    cardTwo.removeEventListener("click", flipCard)
    cardOne = ""
    cardTwo = ""
    return (isDisabled = false)
  }
  setTimeout(() => {
    cardOne.classList.add("shake")
    cardTwo.classList.add("shake")
  }, 400)
  setTimeout(() => {
    cardOne.classList.remove("flip", "shake")
    cardTwo.classList.remove("flip", "shake")
    cardOne = ""
    cardTwo = ""
    isDisabled = false
  }, 1200)
}

function shufleCards() {
  counterMatchedCards = 0
  cardOne = ""
  cardTwo = ""
  isDisabled = false
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
  array.sort(() => (Math.random() > 0.5 ? 1 : -1))

  cards.forEach((item, index) => {
    item.classList.remove("flip")
    let imgTag = item.querySelector("img")
    imgTag.src = `./images/img-${array[index]}.svg`
    item.addEventListener("click", flipCard)
  })
}

shufleCards()

