"use strict"

import Qwest from 'qwest'
import clone from '../utils/clone'
import lang from '../lang'

module.exports = {
  componentWillMount: function () {
    this.$getResource(this.props)
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.src !== this.props.src || nextProps.data !== this.props.data) {
      this.$getResource(nextProps)
    }
  },

  $getResource: function (props) {
    if (props.data) {
      if (this.initData) {
        this.initData(props.data)
      } else {
        this.setState({ data: props.data })
      }
    } else if (props.src) {
      this.setState({ msg: lang.get('request.loading'), data: [] })

      var cache = props.cache === undefined ? true : !!props.cache
      Qwest.get(props.src, null, { cache: cache })
        .then(function (res) {
          let data = res.status === 1 ?
                     res.data :
                     ( res instanceof Array ? res : undefined )

          if (!data) {
            let msg = res.msg ? res.msg : lang.get('request.failure')
            this.setState({ msg: msg })
            return
          } else {
            this.setState({ msg: null })
          }

          data = clone(data)

          // initialize data
          if (this.initData) {
            this.initData(data)
          } else {
            this.setState({ data: data })
          }
        }.bind(this))
        .catch(function () {
          this.setState({ msg: lang.get('request.failure') })
        }.bind(this))
    }
  }
}

