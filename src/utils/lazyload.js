import * as Event from './events'
import { findDOMNode } from 'react-dom'

const throttle = 80
const components = []
let timeout = null
let isLock = false

export function addStack (image) {
  components.push(image)
}

export function dispatch () {
  if (isLock) return
  isLock = true

  // handle
  components.forEach((comp, i) => {
    const rect = findDOMNode(comp).getBoundingClientRect()
    const isInViewport = rect.top >= 0 ||
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    if (isInViewport) {
      components.splice(i, 1)
      comp.markToRender()
    }
  })

  isLock = false
}

Event.on(document, 'scroll', () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    dispatch()
    timeout = null
  }, throttle)
})
