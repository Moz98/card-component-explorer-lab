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
  lazy: false,
  placeholderChar: "",
}
const cvcMask = IMask(cvcField, cvcPattern)

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
  lazy: false,
  placeholderChar: "_",
}

const expirationMask = IMask(expritaionField, expirationPattern)
