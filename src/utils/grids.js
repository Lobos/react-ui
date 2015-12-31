'use strict';

const GRIDS = {};
const RESPONSIVE = {
  'sm': '35.5',
  'md': '48',
  'lg': '64',
  'xl': '80'
};
let prefix = 'e97deffa';
let defaultResponsive = 'md';

export function setOptions(options) {
  if (!options) {
    return;
  }
  if (options.prefix) {
    prefix = options.prefix;
  }
  if (options.responsive) {
    defaultResponsive = options.responsive;
  }
}

export function getGrid(grid) {
  if (!grid) {
    return '';
  }
  if (typeof grid === 'number') {
    grid = [grid];
  }
  if (!Array.isArray(grid)) {
    console.warn('grid must be number or array');
    return '';
  }

  let width = (grid[0] * 100).toFixed(4);
  width = width.substr(0, width.length - 1);
  let responsive = grid[1] || defaultResponsive;
  let key = responsive + '-' + width.replace('.', '-');

  if (!GRIDS[key]) {
    generateGrid(width, key, responsive);
  }
  return `${prefix} ${prefix}-1 ${prefix}-${key}`;
}

function createStyle(text) {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = text
  document.head.appendChild(style);
}

function generateGrid(width, key, responsive) {
  GRIDS[key] = true;
  let minWidth = RESPONSIVE[responsive];
  let text = `@media screen and (min-width: ${minWidth}em) { .${prefix}-${key}{width: ${width}%} }`;

  createStyle(text);
}

(function () {
  let text = [];

  text.push(`
.${prefix} {
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
}`);

  text.push(`.${prefix}-1{width:100%}`);
  createStyle(text.join(''));
})();

