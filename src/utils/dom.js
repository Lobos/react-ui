'use strict'

function tryParseInt (p) {
  if (!p) {
    return 0
  }
  return parseInt(p) || 0
}

export function isDescendant (parent, child) {
  let node = child.parentNode

  while (node !== null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }

  return false
}

export function offset (el) {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}

export function forceRedraw (el) {
  let originalDisplay = el.style.display

  el.style.display = 'none'
  let oh = el.offsetHeight
  el.style.display = originalDisplay
  return oh
}

export function withoutTransition (el, callback) {
  // turn off transition
  el.style.transition = 'none'

  callback()

  // force a redraw
  forceRedraw(el)

  // put the transition back
  el.style.transition = ''
}

export function getOuterHeight (el) {
  let height = el.clientHeight +
    tryParseInt(el.style.borderTopWidth) +
    tryParseInt(el.style.borderBottomWidth) +
    tryParseInt(el.style.marginTop) +
    tryParseInt(el.style.marginBottom)
  return height
}

export function getScrollTop () {
  const dd = document.documentElement
  let scrollTop = 0
  if (dd && dd.scrollTop) {
    scrollTop = dd.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

export function overView (el, pad = 0) {
  let height = window.innerHeight || document.documentElement.clientHeight
  let bottom = el.getBoundingClientRect().bottom + pad
  return bottom > height
}

export function computedStyle (el, attr) {
  var result
  if (el.currentStyle) {
    result = el.currentStyle[attr]
  } else if (window.getComputedStyle) {
    result = window.getComputedStyle(el, null)[attr]
  }
  return result
}

export function getLineHeight (origin) {
  let el = origin.cloneNode(true)
  let lineHeight
  el.style.padding = 0
  el.rows = 1
  el.innerHTML = '&nbsp;'
  el.style.minHeight = 'inherit'
  origin.parentNode.appendChild(el)
  lineHeight = el.clientHeight
  origin.parentNode.removeChild(el)

  return lineHeight
}

export function cloneShadow (origin) {
  let el = origin.cloneNode(true)
  el.style.position = 'absolute'
  el.style.opacity = 0
  el.style.visibility = 'hidden'
  el.style.height = 0
  el.style.left = 0
  el.style.zIndex = -1
  el.disabled = 'disabled'
  el.name = ''
  el.id = ''
  origin.parentNode.appendChild(el)
  return el
}

export function addClass (el, className) {
  if (!className) return

  let els = Array.isArray(el) ? el : [el]

  els.forEach((el) => {
    if (el.classList) {
      el.classList.add(className.split(' '))
    } else {
      el.className += ' ' + className
    }
  })
}

export function removeClass (el, className) {
  if (!className) return

  let els = Array.isArray(el) ? el : [el]

  els.forEach((el) => {
    if (el.classList) {
      el.classList.remove(className.split(' '))
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  })
}
