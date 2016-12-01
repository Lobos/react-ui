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

function clickaway (e) {
  if (isDescendant(div, e.target)) return
  hide()
  document.removeEventListener('click', clickaway)
}

export function show (props) {
  const { position, style, content, background, border } = props

  div.style = ''
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

  div.className = className

  ReactDOM.render(content, inner)

  document.addEventListener('click', clickaway)
}

export function hide () {
  div.style.display = 'none'
  div.className = ''
}
