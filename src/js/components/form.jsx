var React = require('react/addons')
var Control = require('./form-control.jsx')
var Submit = require('./form-submit.jsx')

var Objects = require('../utils/objects')
var Classable = require('../mixins/classable')

var Form = React.createClass({
  mixins: [Classable],

  getInitialState: function () {
    return {
      locked: false
    }
  },

  renderChildren: function () {
    var labelWidth = this.props.labelWidth || 2
    return React.Children.map(this.props.children, function (child, i) {
      if (child.type === Control) {
        child = React.addons.cloneWithProps(child, {
          ref: 'control-' + i,
          labelWidth: labelWidth,
          layout: this.props.layout
        })
      } else if (child.type === Submit) {
        child = React.addons.cloneWithProps(child, {
          labelWidth: labelWidth,
          locked: this.state.locked,
          layout: this.props.layout
        })
      }

      return child
    }, this)
  },

  handleSubmit: function (event) {
    this.setState({ locked: true })
    event.preventDefault() 
    var success = true
    Objects.forEach(this.refs, function (child) {
      var suc = child.validate()
      success = success && suc
    })

    if (!success) {
      this.setState({ locked: false })
      return
    }

    console.log(event.target)
  },

  render: function () {
    var className
    switch (this.props.layout) {
      case 'inline':
        className = 'form-inline'
        break
      case 'horizontal':
        className = 'form-horizontal'
        break
    }

    className = this.getClasses(className)

    return (
      <form onSubmit={this.handleSubmit} className={className}>{this.renderChildren()}</form>
    )
  }
})

Form.Control = Control
Form.Submit = Submit

module.exports = Form
