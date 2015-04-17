var React = require('react/addons')
var Control = require('./form-control.jsx')
var Submit = require('./form-submit.jsx')

var lang = require('../lang')
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
          this.setValue(res.data)
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
      if (!ref.props.ignore)
        data[k] = ref.getValue()
    }, this)
    return data
  },

  setValue: function (data) {
    Objects.forEach(this.refs, function (ref, k) {
      ref.setValue(data[k])
    })
  },

  renderChildren: function () {
    var labelWidth = this.props.labelWidth || 2
    return React.Children.map(this.props.children, function (child) {
      var props = {
        labelWidth: labelWidth,
        showHint: this.props.showHint,
        layout: this.props.layout
      }
      if (child.type === Control) {
        props.ref = child.props.name
        props.value = this.state.data[child.props.name]
        if (child.props.equal)
          props.onValidate = this.equalValidate(child.props.equal, child.props.name)
      } else if (child.type === Submit) {
        props.locked = this.state.locked
      }

      child = React.addons.cloneWithProps(child, props)
      return child
    }, this)
  },

  equalValidate: function (targetRef, equalRef) {
    var self = this
    return function () {
      var target = self.refs[targetRef]
      if (!target) {
        console.log('equal target is not existed')
        return false
      }
      var equal = self.refs[equalRef] 
      return target.getValue() === equal.getValue()
    }
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
        if (res.status === 1) {
          if (this.props.onSubmit)
            this.props.onSubmit(res)
          if (res.msg)
            message.success(res.msg)
        } else {
          message.error(res.msg || lang.get('request.empty'))
        }
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
