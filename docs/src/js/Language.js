'use strict'

import { create, getLanguage } from 'react-language'

export const En = create(true)
export const Cn = create('zh-CN')

import EN from '../../../src/lang/en'
import CN from '../../../src/lang/zh-cn'
import { setLang } from '../../../src/lang'

setLang(getLanguage().toLowerCase() === 'zh-cn' ? CN : EN)
