let pureRender = true
let location = 'zh-cn'

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
  }
}

export default config
