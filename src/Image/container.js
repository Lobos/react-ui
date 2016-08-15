import * as Event from '../utils/events'

const throttle = 80
const images = []
let timeout = null
let isLock = false

export function addStack (image) {
  images.push(image)
}

export function dispatch () {
  if (isLock) return
  isLock = true

  // handle
  console.log(111, Date.now())

  isLock = false
}

Event.on(document, 'scroll', () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    dispatch()
    timeout = null
  }, throttle)
})
