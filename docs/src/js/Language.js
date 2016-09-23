'use strict'

import { create, getLanguage, setLanguage } from 'react-language'

export const En = create(true)
export const Cn = create('zh-cn')

import config from 'rctui/config'

export const set = (lang) => {
  if (!lang) {
    lang = getLanguage().toLowerCase()
  } else {
    setLanguage(lang)
  }
  config.location = lang
}

export const get = getLanguage
