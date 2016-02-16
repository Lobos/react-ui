'use strict';

export let THEME = 'pure';

let styles = [];

export function requireCss(pack) {
  if (styles.indexOf(pack) < 0) {
    styles.push(pack);
  }
}

export function setTheme (theme = THEME) {
  styles.forEach((pack) => {
    require(`./${theme}/${pack}.less`);
  });
}

export const loadStyles = setTheme;
