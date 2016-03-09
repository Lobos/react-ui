'use strict';

const GRIDS = {};
const OFFSETS = {};
const RESPONSIVE = {
  'sm': '568',
  'md': '768',
  'lg': '992',
  'xl': '1200'
};
let gridPre = 'rct-grid';
let offsetPre = 'rct-offset';
let defaultResponsive = 'md';

export function setOptions(options) {
  if (!options) {
    return;
  }
  if (options.gridPre) {
    gridPre = options.gridPre;
  }
  if (options.offsetPre) {
    offsetPre = options.offsetPre;
  }
  if (options.responsive) {
    defaultResponsive = options.responsive;
  }
}

export function getGrid(options) {
  if (!options) {
    return '';
  }
  if (typeof options === 'number') {
    options = { width: options };
  }

  let { width, offset, responsive } = options;
  let gridClass = generate(width, 'grid', responsive);
  let offsetClass = generate(offset, 'offset', responsive);

  return `${gridPre} ${gridPre}-1 ${gridClass} ${offsetClass}`;
}

function generate(width, type, responsive) {
  if (!width || width <= 0) {
    return '';
  }

  if (width > 1) { width = 1; }
  width = (width * 100).toFixed(4);
  width = width.substr(0, width.length - 1);

  responsive = responsive || defaultResponsive;
  let key = responsive + '-' + width.replace('.', '-');
  if (type === 'grid') {
    if (!GRIDS[key]) {
      generateGrid(width, key, responsive);
    }
    return `${gridPre}-${key}`;
  } else {
    if (!OFFSETS[key]) {
      generateOffset(width, key, responsive);
    }
    return `${offsetPre}-${key}`;
  }
}

function generateGrid(width, key, responsive) {
  GRIDS[key] = true;
  let minWidth = RESPONSIVE[responsive];
  let text = `@media screen and (min-width: ${minWidth}px) { .${gridPre}-${key}{width: ${width}%} }`;

  createStyle(text);
}

function generateOffset(width, key, responsive) {
  OFFSETS[key] = true;
  let minWidth = RESPONSIVE[responsive];
  let text = `@media screen and (min-width: ${minWidth}px) { .${offsetPre}-${key}{margin-left: ${width}%} }`;

  createStyle(text);
}

function createStyle(text) {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = text
  document.head.appendChild(style);
}

(function () {
  let text = [];

  text.push(`
.${gridPre} {
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
  box-sizing: border-box;
}`);

  text.push(`.${gridPre}-1{width:100%}`);
  createStyle(text.join(''));
})();

