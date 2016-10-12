let pureRender = true
let location = 'zh-cn'
let iconPrefix = 'icon'

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
  }
}

export default config
