var request = require('../utils/request')
var Objects = require('../utils/objects')
var message = require('../actions/message')
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
          var data = res.status === 1 ?
                     res.data :
                     ( res instanceof Array ? res : undefined )

          if (!data && res.msg) {
            message.error(res.msg)
            return
          }

          data = Objects.clone(data)
          
          // initialize data
          if (this.initData) {
            this.initData(data)
          } else {
            this.setState({ data: data })
          }

        }.bind(this),
        failure: function () {
          this.setState({ msg: lang.get('request.error') })
        }.bind(this)
      })
    }
  }
}

module.exports = resourceable

