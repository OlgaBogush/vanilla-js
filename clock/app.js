const hourHandElement = document.querySelector("[data-hour")
const minuteHandElement = document.querySelector("[data-minute]")
const secondHandElement = document.querySelector("[data-second]")


function setClock() {
  const currentDate = new Date()
  
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

  setRotation(hourHandElement, hoursRatio)
  setRotation(minuteHandElement, minutesRatio)
  setRotation(secondHandElement, secondsRatio)
}

function setRotation(element, rotation) {
  element.style.setProperty("--rotation", rotation * 360)
}

setInterval(setClock, 1000)

// чтобы часы сразу показывали фактическое время:
setClock()