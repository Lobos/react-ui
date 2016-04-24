'use strict';

function tryParseInt(p) {
  if (!p) {
    return 0;
  }
  const pi = parseInt(p);
  return pi || 0;
}

export function isDescendant (parent, child) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

export function offset (el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

export function forceRedraw (el) {
  let originalDisplay = el.style.display;

  el.style.display = 'none';
  let oh = el.offsetHeight;
  el.style.display = originalDisplay;
  return oh;
}

export function withoutTransition (el, callback) {
  //turn off transition
  el.style.transition = 'none';

  callback();

  //force a redraw
  forceRedraw(el);

  //put the transition back
  el.style.transition = '';
}

export function getOuterHeight (el) {
  let height = el.clientHeight
    + tryParseInt(el.style.borderTopWidth)
    + tryParseInt(el.style.borderBottomWidth)
    + tryParseInt(el.style.marginTop)
    + tryParseInt(el.style.marginBottom);
  return height;
}

export function getScrollTop () {
  const dd = document.documentElement;
  let scrollTop = 0;
  if (dd && dd.scrollTop) {
    scrollTop = dd.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

export function overView (el, pad = 0) {
  let height = window.innerHeight || document.documentElement.clientHeight;
  let bottom = el.getBoundingClientRect().bottom + pad;
  return bottom > height;
}

export function computedStyle (el, attr) {
  var lineHeight;
  if (el.currentStyle) {
    lineHeight = el.currentStyle[attr]
  } else if (window.getComputedStyle) {
    lineHeight = window.getComputedStyle(el , null)[attr];
  }
  return lineHeight;
}

export function getLineHeight (origin) {
  let el = origin.cloneNode(true);
  let lineHeight;
  el.style.padding = 0;
  el.rows = 1;
  el.innerHTML = '&nbsp;'
  el.style.minHeight= 'inherit'
  origin.parentNode.appendChild(el);
  lineHeight = el.clientHeight;
  origin.parentNode.removeChild(el);

  return lineHeight;
}
