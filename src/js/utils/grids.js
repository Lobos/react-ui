'use strict'

function gridUnit(responsive) {
  responsive = responsive ? responsive + '-' : ''
  let text = [], width
  for (let i = 1; i <= 24; i++) {
    width = (i * 100 / 24).toFixed(6)
    text.push(`.pure-u-${responsive}${i}-24{width:${width}%;}`)
  }
  for (let i = 1; i <= 5; i++) {
    width = (i * 20).toFixed(6)
    text.push(`.pure-u-${responsive}${i}-5{width:${width}%;}`)
  }
  return text.join('')
}

export const create = function () {
  let style = document.createElement('style')
  let text = []
  style.type = 'text/css'

  text.push(gridUnit())

  text.push('@media screen and (min-width: 35.5em) {')
  text.push(gridUnit('sm'))
  text.push('}')

  text.push('@media screen and (min-width: 48em) {')
  text.push(gridUnit('md'))
  text.push('}')

  text.push('@media screen and (min-width: 64em) {')
  text.push(gridUnit('lg'))
  text.push('}')

  text.push('@media screen and (min-width: 80em) {')
  text.push(gridUnit('xl'))
  text.push('}')

  style.innerHTML = text.join('')
  document.head.appendChild(style)
}
