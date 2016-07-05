'use strict'

import { create, getLanguage, setLanguage } from 'react-language'

export const En = create(true)
export const Cn = create('zh-CN')

import { setLocation, setLang } from '../../../src/lang'

import EN from '../../../src/lang/en'
import CN from '../../../src/lang/zh-cn'

export const set = (lang) => {
  if (!lang) {
    lang = getLanguage().toLowerCase()
    setLocation(lang === 'zh-cn' ? 'zh-cn' : 'en')
  } else {
    setLanguage(lang)
    setLang(lang === 'zh-cn' ? CN : EN)
  }
}

export const get = getLanguage
