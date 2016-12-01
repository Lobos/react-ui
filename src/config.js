let pureRender = true
let location = 'zh-cn'
let iconPrefix = 'icon'
let iconfont = 'iconfont'

const config = {
  get pureRender () {
    return pureRender
  },

  set pureRender (val) {
    pureRender = val
  },

  get location () {
    return location
  },

  set location (val) {
    location = val
  },

  get iconPrefix () {
    return iconPrefix
  },

  set iconPrefix (val) {
    iconPrefix = val
  },

  get iconfont () {
    return iconfont
  },

  set iconfont (val) {
    iconfont = val
  }
}

export default config
