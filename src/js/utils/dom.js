"use strict"

function tryParseInt(p) {
  if (!p) {
    return 0
  }
  const pi = parseInt(p)
  return pi || 0
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

export function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    el.className += ' ' + className
  }
}

export function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
}

export function hasClass (el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

export function toggleClass (el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className)
  } else {
    addClass(el, className)
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
  //turn off transition
  el.style.transition = 'none'

  callback()

  //force a redraw
  forceRedraw(el)

  //put the transition back
  el.style.transition = ''
}

export function getOuterHeight (el) {
  let height = el.clientHeight
    + tryParseInt(el.style.borderTopWidth)
    + tryParseInt(el.style.borderBottomWidth)
    + tryParseInt(el.style.marginTop)
    + tryParseInt(el.style.marginBottom)
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
