var request = require('../utils/request')
var Objects = require('../utils/objects')
var message = require('../components/message.jsx')
var lang = require('../lang')

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
      this.setState({ msg: lang.get('request.loading'), data: [] })
      request.getData(props.src, {
        cache: true,
        success: function (res) {
          if (res.status === 1)
            this.setState({ data: Objects.clone(res.data), $time: new Date().getTime() })
          else if (res instanceof Array)
            this.setState({ data: Objects.clone(res) })
          else if (res.msg)
            message.error(res.msg)
        }.bind(this),
        failure: function () {
          this.setState({ msg: lang.get('request.error') })
        }.bind(this)
      })
    }
  }
}

module.exports = resourceable

