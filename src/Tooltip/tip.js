import classnames from 'classnames'
import _styles from '../styles/_tooltip.scss'

const div = document.createElement('div')
div.style.display = 'none'
document.body.appendChild(div)

const arrow = document.createElement('div')
arrow.className = _styles['tooltip-arrow']
div.appendChild(arrow)

const inner = document.createElement('div')
inner.className = _styles['tooltip-inner']
div.appendChild(inner)

function clickaway () {
  hide()
  document.removeEventListener('click', clickaway)
}

export function show (props) {
  const { position, style, tip, trigger } = props

  div.style.cssText = 'display: none'
  Object.keys(style).forEach(k => {
    div.style[k] = style[k]
  })

  const className = classnames(
    _styles.tooltip,
    _styles.in,
    _styles[`tooltip-${position}`]
  )

  // fix safari
  setTimeout(() => {
    div.style.display = 'block'
    div.className = className
  }, 0)

  inner.innerText = tip

  if (trigger === 'click') {
    document.addEventListener('click', clickaway)
  }
}

export function hide () {
  div.style.display = 'none'
  div.className = ''
}
