import "./css/index.css"

const bgColor1 = document.querySelector("[data-color1]")
const bgColor2 = document.querySelector("[data-color2]")
const icon = document.querySelector("[data-card-icon]")

function changeFlag(type) {
  const flag = {
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
    default: {
      color1: "#black",
      color2: "#gray",
      icon: "/public/cc-default.svg",
    },
  }

  bgColor1.setAttribute("fill", flag[type].color1)
  bgColor2.setAttribute("fill", flag[type].color2)
  icon.setAttribute("src", flag[type].icon)
}

changeFlag("")
