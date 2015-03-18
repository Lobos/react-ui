var React = require('react')
var Cortex = require("cortexjs")
var Icon = require('./icon.jsx')
var Classable = require('../mixins/classable')
var cortex = new Cortex({ count: 0 })

var Loading = React.createClass({

  getInitialState: function () {
    return {
      defText: this.props.text || 'loading'
    }
  },

  mixins: [Classable],

  componentDidMount: function () {
    cortex.on('update', function () {
      this.forceUpdate()
    }.bind(this))
  },

  render: function () {
    var ctx = cortex.getValue()
    var classes = {
      'loading': true,
      'active': ctx.count > 0
    }
    var className = this.getClasses(classes)

    return(
      <div className={className}>
        <div className="inner">
          <Icon ref="icon" icon="spinner" spin={true} />
          <div>{ctx.text || this.state.defText}</div>
        </div>
      </div>
    )
  }

})

Loading.start = function (text) {
  var count = cortex.count.getValue() + 1
  cortex.set({ count: count, text: text })
}

Loading.end = function () {
  var count = cortex.count.getValue() - 1
  if (count < 0) { count = 0 }
  cortex.set({ count: count })
}

module.exports = Loading
