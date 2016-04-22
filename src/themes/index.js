'use strict';

export let THEME = 'pure';

export function requireCss(pack) {
  require(`./${THEME}/${pack}.less`);
}

export function setTheme (theme) {
  THEME = theme;
}
