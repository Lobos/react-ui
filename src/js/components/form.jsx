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

  propTypes: {
    type: React.PropTypes.string,
    action: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      locked: false,
      data: {}
    }
  },

  componentWillMount: function () {
    if (this.props.action && this.props.autoload)
      this.fetchData(this.props.action)
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.action !== this.props.action) {
      this.fetchData(nextProps.action)
    }
  },

  fetchData: function (src) {
    src = src || this.props.action
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

  getValue: function () {
    var data = this.state.data
    Objects.forEach(this.refs, function (ref, k) {
      data[k] = ref.getValue()
    }, this)
    return data
  },

  renderChildren: function () {
    var labelWidth = this.props.labelWidth || 2
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
    if (this.state.locked) return
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

    var data = this.getValue()
    var type = this.props.type === 'form' ? 'form' : 'json'
    request.post(this.props.action, {
      data: data,
      type: type,
      success: function (res) {
        this.setState({ locked: false })
        console.log(res)
      },
      failure: function () {
        this.setState({ locked: false })
      }.bind(this)
    })
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
