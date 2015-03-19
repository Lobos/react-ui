var requestable = require('./requestable')
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
    this.setState({ data: [] })
    if (props.data) {
      this.setState({ data: props.data })
    } else if (props.src) {
      this.getDataFromCache(props.src, function (res) {
        if (res.status === 1)
          this.setState({ data: res.data })
        else if (res instanceof Array)
          this.setState({ data: res })
        else if (res.msg)
          message.error(res.msg)
      }.bind(this))
    }
  }
}

for (var attr in requestable) {
    if (requestable.hasOwnProperty(attr)) 
      resourceable[attr] = requestable[attr]
}

module.exports = resourceable

