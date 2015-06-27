"use strict"

function tryParseInt(p) {
  if (!p) {
    return 0
  }
  let pi = parseInt(p)
  return pi || 0
}

module.exports = {

  isDescendant: function(parent, child) {
    let node = child.parentNode

    while (node !== null) {
      if (node === parent) {
        return true
      }
      node = node.parentNode
    }

    return false
  },

  offset: function(el) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  },

  addClass: function(el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ' ' + className
    }
  },

  removeClass: function(el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  },

  hasClass: function(el, className) {
    if (el.classList) {
      return el.classList.contains(className)
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
    }
  },

  toggleClass: function(el, className) {
    if (this.hasClass(el, className)) {
      this.removeClass(el, className)
    } else {
      this.addClass(el, className)
    }
  },

  forceRedraw: function(el) {
    let originalDisplay = el.style.display

    el.style.display = 'none'
    let oh = el.offsetHeight
    el.style.display = originalDisplay
    return oh
  },

  withoutTransition: function(el, callback) {
    //turn off transition
    el.style.transition = 'none'

    callback()

    //force a redraw
    this.forceRedraw(el)

    //put the transition back
    el.style.transition = ''
  },

  getOuterHeight: function (el) {
    let height = el.clientHeight
      + tryParseInt(el.style.borderTopWidth)
      + tryParseInt(el.style.borderBottomWidth)
      + tryParseInt(el.style.marginTop)
      + tryParseInt(el.style.marginBottom)
    return height
  },

  getScrollTop: function () {
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
      scrollTop = document.body.scrollTop
    }
    return scrollTop
  },

  overView: function (el, offset = 0) {
    let height = window.innerHeight || document.documentElement.clientHeight
    let bottom = el.getBoundingClientRect().bottom + offset
    return bottom > height
  }

}
