'use strict';

export let THEME = 'pure';

export function requireCss(pack) {
  require(`./pure/${pack}.less`);
};
