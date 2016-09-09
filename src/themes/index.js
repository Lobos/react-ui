'use strict';

export let THEME = 'mui';

export function requireCss(pack) {
  require(`./${THEME}/${pack}.less`);
}

export function setTheme () {
}
