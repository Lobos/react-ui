'use strict'

function getGcd(m, n) {
	let u = m, v = n
	while (v !== 0) {
    [u, v] = [v, u % v]
	}
  return u
}

function gridUnit(responsive) {
  responsive = responsive ? responsive + '-' : ''
  let text = [], width
  for (let i = 1; i <= 24; i++) {
    let gcd = getGcd(i, 24)
    width = (i * 100 / 24).toFixed(6)
    text.push(`.pure-u-${responsive}${i}-24`)
    if (gcd > 1) {
      text.push(`,.pure-u-${responsive}` + (i / gcd) + '-' + (24 / gcd))
    }
    text.push(`{width:${width}%;}`)
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

  ; [['35.5', 'sm'], ['48', 'md'], ['64', 'lg'], ['80', 'xl']].forEach(([x, m]) => {
    text.push(`@media screen and (min-width: ${x}em) {`)
    text.push(gridUnit(m))
    text.push('}')
  })

  style.innerHTML = text.join('')
  document.head.appendChild(style)
}
