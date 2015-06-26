'use strict'

let React = require('react')
let Qwest = require('qwest')
let Objects = require('../utils/objects')
let Classable = require('../mixins/classable')
let Lang = require('../lang')
let Message = require('./message.jsx')
let FormControl = require('./form-control.jsx')
let FormSubmit = require('./button.jsx')

let Form = React.createClass({
  displayName: 'Form',

  propTypes: {
    action: React.PropTypes.string,
    children: React.PropTypes.any,
    hintType: React.PropTypes.oneOf(['none', 'pop', 'inline']),
    init: React.PropTypes.bool,
    layout: React.PropTypes.oneOf(['aligned', 'stacked']),
    onSubmit: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState: function () {
    return {
      locked: false,
      data: {}
    }
  },

  componentWillMount: function () {
    if (this.props.action && this.props.init) {
      this.fetchData(this.props.action)
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.action !== this.props.action) {
      this.fetchData(nextProps.action)
    }
  },

  fetchData: function (src) {
    src = src || this.props.action
    //loading.start()
    Qwest.get(src, null, {})
      .then((res) => {
        //loading.end()
        if (res.status === 1) {
          this.setValue(res.data)
        } else if (res.msg) {
          Message.show(res.msg, 'warning')
        }
      })
      .cache((e) => {
        Message.show(e.message, 'error')
      })
  },

  getValue: function () {
    let data = this.state.data
    Objects.forEach(this.refs, (ref, k) => {
      if (!ref.props.ignore) {
        data[k] = ref.getValue()
      }
    })
    return data
  },

  setValue: function (data) {
    Objects.forEach(this.refs, (ref, k) => {
      ref.setValue(data[k])
    })
  },

  equalValidate: function (targetRef, equalRef) {
    let self = this
    return function () {
      let target = self.refs[targetRef]
      if (!target) {
        console.warn(`equal target '${targetRef}' not existed`)
        return false
      }
      let equal = self.refs[equalRef]
      return target.getValue() === equal.getValue()
    }
  },

  renderChildren: function () {
    return React.Children.map(this.props.children, function (child) {
      let props = {
        hintType: child.props.hintType || this.props.hintType,
        readOnly: child.props.readOnly || this.state.locked,
        layout: this.props.layout
      }
      if (child.type === FormControl) {
        if (!child.props.name) {
          console.warn('FormControl must have a name!')
          return null
        }
        props.ref = child.props.name
        props.value = this.state.data[child.props.name]
        if (child.props.equal) {
          props.onValidate = this.equalValidate(child.props.equal, child.props.name)
        }
      } else if (child.type === FormSubmit) {
        props.disabled = this.state.locked
      }

      child = React.addons.cloneWithProps(child, props)
      return child
    }, this)
  },

  handleSubmit: function (event) {
    if (this.state.locked) {
      return
    }

    this.setState({ locked: true })

    event.preventDefault()
    let success = true
    Objects.forEach(this.refs, function (child) {
      let suc = child.validate()
      success = success && suc
    })

    if (!success) {
      this.setState({ locked: false })
      return
    }

    let data = this.getValue()
    Qwest.post(this.props.action, data)
    .then(res => {
      if (res.status === 1) {
        if (this.props.onSubmit) {
          this.props.onSubmit(res)
        }
        if (res.msg) {
          Message.show(res.msg, 'success')
        }
      } else {
        Message.show(res.msg || Lang.get('request.empty'), 'warning')
      }
    })
    .catch(e => {
      Message.show(e.message, 'error')
    })
    .complete(() => {
      this.setState({ locked: false })
    })
  },

  render: function () {
    let className = this.getClasses(
      'pure-form',
      {
        'pure-form-aligned': this.props.layout === 'aligned',
        'pure-form-stacked': this.props.layout === 'stacked'
      }
    )

    return (
      <form className={className}>
        {this.renderChildren()}
      </form>
    )
  }
})

module.exports = Form
