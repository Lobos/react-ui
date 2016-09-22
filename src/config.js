let pureRender = false

const config = {
  get pureRender () {
    return pureRender
  },

  set pureRender (val) {
    pureRender = val
  }
}

export default config
