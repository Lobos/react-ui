import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { isDescendant } from '../utils/dom'
import _styles from '../styles/_popover.scss'

const div = document.createElement('div')
div.style.display = 'none'
document.body.appendChild(div)

const arrow = document.createElement('div')
arrow.className = _styles['popover-arrow']
div.appendChild(arrow)

const inner = document.createElement('div')
inner.className = _styles['popover-content']
div.appendChild(inner)

let _tm = null

div.addEventListener('mouseenter', function () {
  if (!_tm) return
  clearTimeout(_tm)
  document.addEventListener('click', clickaway)
})

function clickaway (e) {
  if (isDescendant(div, e.target)) return
  hide(0)
  document.removeEventListener('click', clickaway)
}

export function show (props) {
  const { position, style, content, background, border, noArrow } = props

  div.style.cssText = 'display: none'
  Object.keys(style).forEach(k => {
    div.style[k] = style[k]
  })

  div.style.background = background || ''
  inner.style.background = background || ''
  arrow.style.background = background || ''

  div.style.borderColor = border || ''
  arrow.style.borderColor = border || ''

  const className = classnames(
    _styles.popover,
    _styles[`popover-${position}`]
  )

  arrow.style.display = noArrow ? 'none' : 'block'

  // fix safari
  setTimeout(() => {
    div.style.display = 'block'
    div.className = className
  }, 0)

  ReactDOM.render(content, inner)

  document.addEventListener('click', clickaway)
}

export function hide (delay) {
  delay = typeof delay === 'number' ? delay : 400
  _tm = setTimeout(() => {
    div.style.display = 'none'
    div.className = ''
  }, delay)
}
