import * as Event from './events'
import { findDOMNode } from 'react-dom'
import { nextUid } from './strings'

const throttle = 80
const components = {}
let timeout = null
let isLock = false

export function addStack (obj) {
  const id = nextUid()
  components[id] = obj
  return id
}

export function removeStack (id) {
  delete components[id]
}

const winHeight = window.innerHeight || document.documentElement.clientHeight

export function dispatch () {
  if (isLock) return
  isLock = true

  // handle
  Object.keys(components).forEach(k => {
    const comp = components[k]
    const rect = findDOMNode(comp).getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > winHeight) return

    delete components[k]
    comp.markToRender()
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
