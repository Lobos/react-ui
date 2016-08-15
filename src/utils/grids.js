'use strict'

import md5 from 'blueimp-md5'

const CACHES = {}
const RESPONSIVE = {
  'sm': '568',
  'md': '768',
  'lg': '992',
  'xl': '1200'
}
const GridClassName = 's_' + md5('rctui-grid').substr(24)
const GridFullClassName = 's_' + md5('rctui-grid-full').substr(24)
const defaultResponsive = 'md'

export function getGrid (options) {
  if (!options) {
    return ''
  }
  if (typeof options === 'number') {
    options = { width: options }
  }

  let { width, offset, responsive } = options
  let gridClass = generate(width, 'grid', responsive)
  let offsetClass = generate(offset, 'offset', responsive)

  return `${GridClassName} ${GridFullClassName} ${gridClass} ${offsetClass}`
}

function generate (width, type, responsive) {
  if (!width || width <= 0) {
    return ''
  }

  if (width > 1) { width = 1 }
  width = (width * 100).toFixed(4)
  width = width.substr(0, width.length - 1)

  responsive = responsive || defaultResponsive
  let className = 'rctui-' + type + '-' + responsive + '-' + width.replace('.', '-')
  className = 's_' + md5(className).substr(24)
  if (!CACHES[className]) {
    type === 'grid'
      ? generateGrid(width, className, responsive)
      : generateOffset(width, className, responsive)
    CACHES[className] = true
  }
  return className
}

function generateGrid (width, className, responsive) {
  let minWidth = RESPONSIVE[responsive]
  let text = `@media screen and (min-width: ${minWidth}px) { .${className}{width: ${width}%} }`
  createStyle(text, className)
}

function generateOffset (width, className, responsive) {
  let minWidth = RESPONSIVE[responsive]
  let text = `@media screen and (min-width: ${minWidth}px) { .${className}{margin-left: ${width}%} }`
  createStyle(text, className)
}

function createStyle (text, id) {
  let style = document.head.querySelector('#' + id)
  if (style) {
    return
  }

  style = document.createElement('style')
  style.type = 'text/css'
  style.id = id
  style.innerHTML = text
  document.head.appendChild(style)
}

(function () {
  let text = []

  text.push(`
.${GridClassName} {
  position: relative;
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
  box-sizing: border-box;
}`)

  text.push(`.${GridFullClassName}{width:100%}`)
  createStyle(text.join(''), GridClassName)
})()

