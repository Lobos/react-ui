var React = require('react')
var Reflux = require('reflux')
var Icon = require('./icon.jsx')
var Classable = require('../mixins/classable')

//var loadingActions = require('../actions/loading')
var loadingStore = require('../store/loading')

var Loading = React.createClass({
  mixins: [Classable, Reflux.listenTo(loadingStore, 'onChange')],

  getInitialState: function () {
    return {
      count: 0,
      defText: this.props.text || 'loading...'
    }
  },

  onChange: function (count, text) {
    this.setState({ count: count, text: text || this.state.defText })
  },

  render: function () {
    var className = this.getClasses(
      'loading',
      'overlay',
      { 'active': this.state.count > 0 }
    )

    return (
      <div className={className}>
        <div className="inner">
          <Icon ref="icon" icon="spinner" spin={true} />
          <div>{this.state.text}</div>
        </div>
      </div>
    )
  }
})

module.exports = Loading
