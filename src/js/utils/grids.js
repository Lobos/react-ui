'use strict'

function getGcd(m, n) {
	let u = m, v = n
	while (v !== 0) {
    [u, v] = [v, u % v]
	}
  return u
}

function gridUnit(pre, responsive) {
  responsive = responsive ? responsive + '-' : ''
  let text = [], width
  for (let i = 1; i <= 24; i++) {
    let gcd = getGcd(i, 24)
    width = (i * 100 / 24).toFixed(6)
    text.push(`.${pre}-${responsive}${i}-24`)
    if (gcd > 1) {
      text.push(`,.${pre}-${responsive}` + (i / gcd) + '-' + (24 / gcd))
    }
    text.push(`{width:${width}%;}`)
  }
  for (let i = 1; i <= 5; i++) {
    width = (i * 20).toFixed(6)
    text.push(`.${pre}-${responsive}${i}-5{width:${width}%;}`)
  }
  return text.join('')
}

export function create (pre = 'rct-g') {
  let style = document.createElement('style')
  let text = []
  style.type = 'text/css'

  text.push(`
.${pre} {
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
}`)

  text.push(`.${pre}-1{width:100%}`)
  text.push(gridUnit(pre))

  ; [['35.5', 'sm'], ['48', 'md'], ['64', 'lg'], ['80', 'xl']].forEach(([x, m]) => {
    text.push(`@media screen and (min-width: ${x}em) {`)
    text.push(gridUnit(pre, m))
    text.push('}')
  })

  style.innerHTML = text.join('')
  document.head.appendChild(style)
}
