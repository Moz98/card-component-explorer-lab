import "./css/index.css"

const bgColor1 = document.querySelector("[data-color1]")
const bgColor2 = document.querySelector("[data-color2]")
const icon = document.querySelector("[data-card-icon]")

function changeFlag(type) {
  const flag = {
    default: {
      color1: "#black",
      color2: "#gray",
      icon: "/public/cc-default.svg",
    },
    visa: {
      color1: "#436D99",
      color2: "#2D57F2",
      icon: "/public/cc-visa.svg",
    },
    mastercard: {
      color1: "#DF6F29",
      color2: "#C69347",
      icon: "/public/cc-mastercard.svg",
    },
    elo: {
      color1: "#8000CE",
      color2: "#F73A67",
      icon: "/public/cc-elo.svg",
    },
    hiperrcard: {
      color1: "#FF0000",
      color2: "#FFFFFF",
      icon: "/public/cc-default.svg",
    },
    diners: {
      color1: "#0E0E0E",
      color2: "#0E0E0E",
      icon: "/public/cc-diners.svg",
    },
    amex: {
      color1: "#0E0E0E",
      color2: "#FFFFFF30",
      icon: "/public/cc-amex.svg",
    },
  }

  bgColor1.setAttribute("fill", flag[type].color1)
  bgColor2.setAttribute("fill", flag[type].color2)
  icon.setAttribute("src", flag[type].icon)
}

globalThis.changeFlag = changeFlag

import IMask from "imask"

const cvcField = document.querySelector("[data-cvc]")
const cvcPattern = {
  mask: "0000",
}
const cvcMask = IMask(cvcField, cvcPattern)
cvcMask.on("accept", () => {
  const cvcOutput = document.querySelector("[data-cvc-output]")
  cvcOutput.innerHTML = cvcField.value.length === 0 ? 123 : cvcField.value
})

const year = new Date().getFullYear().toString()
const yearYY = Number(year.substring(2))
const expritaionField = document.querySelector("[data-expiration]")
const expirationPattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: yearYY,
      to: yearYY + 10,
    },
  },
}
const expirationMask = IMask(expritaionField, expirationPattern)
expirationMask.on("accept", () => {
  const expirationOutput = document.querySelector("[data-expiration-output]")
  expirationOutput.innerText =
    expritaionField.value.length === 0 ? "01/32" : expritaionField.value
})

const cardNumberField = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^(5[1-5]{0,1}\d{0,2}|22[2-9]{0,1}\d{0,1}|2[3-7]{0,1}\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^38|^60)\d{0,16}/,
      cardtype: "hipercard",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: (appended, dynamicMasked) => {
    const filteredNumber = (dynamicMasked.value + appended).replace(/\D/g, "")

    return dynamicMasked.compiledMasks.find((m) => {
      return filteredNumber.match(m.regex)
    })
  },
}
const cardNumberMask = IMask(cardNumberField, cardNumberPattern)

const nameField = document.querySelector("[data-name]")
nameField.addEventListener("input", () => {
  const nameOutput = document.querySelector("[data-name-output]")
  nameOutput.innerHTML =
    nameField.value.length === 0 ? "John Doe" : nameField.value
})

cardNumberMask.on("accept", () => {
  const cardNumberOutput = document.querySelector("[data-card-number-output]")

  cardNumberOutput.innerText =
    cardNumberMask.value.length === 0
      ? "1234 5678 9012 3456"
      : cardNumberMask.value
  const cardType = cardNumberMask.masked.currentMask.cardtype
  changeFlag(cardType)
})
