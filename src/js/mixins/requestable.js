var request = require('../utils/request')
var loading = require('../components/loading.jsx')

module.exports = {
  getDataFromCache: function (url, success, fail) {
    loading.start()
    request.getCache(
      url,
      function (res) {
        loading.end()
        if ('function' === typeof success) {
          success(res)
        }
      },
      function () {
        loading.end()
        if ('function' === typeof fail) {
          fail()
        }
      }
    )
  },

  getDataFromServer: function (url, success, fail) {
    loading.start()
    request.get(
      url, 
      null, 
      function (res) {
        loading.end()
        if ('function' === typeof success) {
          success(res)
        }
      },
      function () {
        loading.end()
        if ('function' === typeof fail) {
          fail()
        }
      }
    )
  },

  getStruct: function () {
    this.getDataFromCache(
      this.props.structUrl,
      function (res) {
        if (res.status === 1)
          this.setState({ struct: res.data })
      }.bind(this)
    )
  },

  setStruct: function (struct) {
    var res = { status: 1, data: struct }
    request.setCache(this.props.structUrl, res)
  },

  getData: function (url) {
    this.getDataFromServer(
      url,
      function (res) {
        if (res.status === 1)
          this.setState({ data: res.data })
      }.bind(this)
    )
  }
}
