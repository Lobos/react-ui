var request = require('../utils/request')
var message = require('../components/message.jsx')

var resourceable = {
  componentWillMount: function () {
    this._getResource(this.props)
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.src !== this.props.src || nextProps.data !== this.props.data)
      this._getResource(nextProps)
  },

  _getResource: function (props) {
    if (props.data) {
      this.setState({ data: props.data })
    } else if (props.src) {
      this.setState({ data: [] })
      request.getData(props.src, {
        cache: true,
        success: function (res) {
          if (res.status === 1)
            this.setState({ data: res.data })
          else if (res instanceof Array)
            this.setState({ data: res })
          else if (res.msg)
            message.error(res.msg)
        }.bind(this)
      })
    }
  }
}

module.exports = resourceable

