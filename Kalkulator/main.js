const btn = document.querySelectorAll('.button')
const display = document.querySelector('.display')

let displayArr = []
let regex = /[0-9.]/gi
let regexOther = /[%*+-/]/gi

const buttonAction = (e) => {
    let a = `${e.target.textContent}`
    console.log(e.target.textContent)
    if (a.match(regex) || a.match(regexOther)) {
        if (a.match(regexOther) && display.textContent[display.textContent.length -1] === a) {
            return
        }
        display.textContent += a
        console.log(displayArr)
    } else if (a.match('=')) {
        if (display.textContent[display.textContent.length -1].match(regexOther)) {
            return
        }
        displayArr.push(display.textContent)
         let result = displayArr.join('')
         let c = eval(result)
         if (c === 'NaN') {
            display.textContent = 0
         }
         display.textContent = c
         displayArr = []
    } else if (a === 'AC') {
        displayArr = []
        display.textContent = ''
    }
}

btn.forEach((item) => {
    item.addEventListener('click', buttonAction)
})
