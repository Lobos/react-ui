'use strict';

import { cloneElement, PropTypes } from 'react';
import objectAssign from 'object-assign';

import EN from '../../../src/lang/en';
import CN from '../../../src/lang/zh-cn';
import { setLang } from '../../../src/lang';

export function getLanguage() {
  if (!global.language) {
    let lang = navigator.language || navigator.browserLanguage || '';
    lang = lang.toLowerCase().indexOf('cn') >= 0 ? 'cn' : 'en';
    setLanguage(lang);
  }

  return global.language;
}

export function setLanguage(lang) {
  global.language = lang;
  setLang(lang === 'cn' ? CN : EN);
}

function Language(props) {
  const { children, lang } = props;

  let style = objectAssign({}, props.style, {
    display: getLanguage() === lang ? 'undefined' : 'none'
  });

  if (typeof children === 'string' || Array.isArray(children)) {
    return <div style={style}>{children}</div>;
  } else {
    return cloneElement(children, { style });
  }
}

Language.propTypes = {
  children: PropTypes.any,
  lang: PropTypes.string.isRequired,
  style: PropTypes.object
};

export function En(props) {
  return <Language {...props} lang="en" />;
}

export function Cn(props) {
  return <Language {...props} lang="cn" />;
}

window.setLang=setLanguage;
