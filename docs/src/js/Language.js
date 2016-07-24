'use strict'

import { create, getLanguage, setLanguage } from 'react-language'

export const En = create(true)
export const Cn = create('zh-cn')

import { setLocation } from '../../../src/lang'

export const set = (lang) => {
  if (!lang) {
    lang = getLanguage().toLowerCase()
    setLocation(lang === 'zh-cn' ? 'zh-cn' : 'en')
  } else {
    setLanguage(lang)
    setLocation(lang === 'zh-cn' ? 'zh-cn' : 'en')
  }
}

export const get = getLanguage
