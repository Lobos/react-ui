var React = require('react/addons')
var Control = require('./form-control.jsx')
var Submit = require('./form-submit.jsx')

var request = require('../utils/request')
var loading = require('../actions/loading')
var message = require('../actions/message')

var Objects = require('../utils/objects')
var Classable = require('../mixins/classable')

var Form = React.createClass({
  mixins: [Classable],

  getInitialState: function () {
    return {
      locked: false,
      data: {}
    }
  },

  componentWillMount: function () {
    if (this.props.action && !this.props.delay)
      this.getData(this.props.action)
  },

  getData: function (src) {
    loading.start()
    request.getData(src, {
      success: function (res) {
        loading.end()
        if (res.status === 1) {
          this.setState({ data: res.data })
        } else if (res.msg) {
          message.error(res.msg)
        }
      }.bind(this),
      failure: loading.end
    })
  },

  renderChildren: function () {
    var labelWidth = this.props.labelWidth || 2
    this.controls = {}
    return React.Children.map(this.props.children, function (child) {
      if (child.type === Control) {
        child = React.addons.cloneWithProps(child, {
          ref: child.props.name,
          value: this.state.data[child.props.name],
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
