'use strict'

import React, { Children, Component, cloneElement } from 'react'
import classnames from 'classnames'
import { forEach, deepEqual, hashcode, objectAssign } from './utils/objects'
import clone from './utils/clone'
import { getGrid } from './utils/grids'
import FormControl from './FormControl'
import FormSubmit from './FormSubmit'
import Button from './Button'
import PropTypes from './utils/proptypes'
import { compose } from './utils/compose'

import Fetch from './higherOrders/Fetch'
import PureRender from './mixins/PureRender'

import _forms from './styles/_form.scss'

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: clone(props.data)
    }

    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submit = this.submit.bind(this)

    this.itemBind = this.itemBind.bind(this)
    this.itemUnbind = this.itemUnbind.bind(this)
    this.itemChange = this.itemChange.bind(this)

    this.items = {}
  }

  getChildContext () {
    return {
      formData: this.state.data,
      itemBind: this.itemBind,
      itemUnbind: this.itemUnbind,
      itemChange: this.itemChange
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.setState({ data: clone(nextProps.data) })

      // if data changed, clear validation
      forEach(this.items, (item) => {
        delete item.$validation
      })
    }
  }

  itemBind (item) {
    const { name, value } = item
    this.items[name] = item
    let { data } = this.state
    if (value && !data[name]) {
      data = objectAssign({}, data, {[name]: value})
      this.setState({ data })
    }
  }

  itemUnbind (name) {
    delete this.items[name]
    delete this.state.data[name]
  }

  itemChange (name, value) {
    const data = objectAssign({}, this.state.data, {[name]: value})
    this.setState({ data })
  }

  validate () {
    return Object.keys(this.items)
      .reduce((suc, key) => suc && (this.items[key].validate() === true), true)
  }

  handleSubmit (event) {
    if (this.props.disabled) {
      return
    }

    event.preventDefault()
    this.submit()
  }

  handleReset () {
    const { onReset, data } = this.props
    this.setState({ data: clone(data) })

    onReset && onReset(data)
  }

  submit () {
    let success = this.validate()
    if (success && this.props.beforeSubmit) {
      success = this.props.beforeSubmit()
    }

    if (!success) {
      return
    }

    if (this.props.onSubmit) {
      // send clone data
      let data = clone(this.state.data)

      // remove disabled value
      forEach(this.items, (item) => {
        if (item.disabled) {
          delete data[item.name]
        }
      })

      this.props.onSubmit(data)
    }

    return true
  }

  renderControls () {
    const { hintType, controls, disabled, layout } = this.props

    return clone(controls).map((control) => {
      if (typeof control !== 'object') {
        return control
      } else {
        control.key = control.key || control.name || hashcode(control)
        control.hintType = control.hintType || hintType
        control.readOnly = control.readOnly || disabled
        control.layout = layout
        // control.itemBind = this.itemBind
        // control.itemUnbind = this.itemUnbind
        // control.itemChange = this.itemChange
        // control.formData = data
        return <FormControl { ...control } />
      }
    })
  }

  renderChildren (children) {
    let { disabled, columns } = this.props

    return Children.map(children, (child) => {
      if (!child) { return null }
      if (typeof child === 'string') { return child }
      let { hintType, labelWidth, readOnly } = child.props
      let props = {
        columns,
        hintType: hintType || this.props.hintType,
        labelWidth: labelWidth || this.props.labelWidth,
        readOnly: readOnly || disabled,
        layout: this.props.layout
      }
      if (child.type === FormControl || child.type.isFormItem) {
        // props.itemBind = this.itemBind
        // props.itemUnbind = this.itemUnbind
        // props.itemChange = this.itemChange
        // props.formData = data
      } else if (child.type === FormSubmit) {
        props.disabled = disabled
      } else if (child.props.children) {
        props.children = this.renderChildren(child.props.children)
      }

      return cloneElement(child, props)
    })
  }

  renderButtons (buttons) {
    if (typeof buttons === 'string') {
      buttons = { 'submit': buttons }
    }

    const { submit, reset, cancel } = buttons

    return (
      <FormControl layout={this.props.layout}>
        { submit && <Button className={_forms.button} type="submit" status="primary">{submit}</Button> }
        { reset && <Button onClick={this.handleReset} className={_forms.button}>{reset}</Button> }
        { cancel && <Button onClick={this.props.onCancel} className={_forms.button}>{cancel}</Button> }
      </FormControl>
    )
  }

  render () {
    let { button, buttons, controls, children, className, grid, layout, ...props } = this.props

    className = classnames(
      className,
      getGrid(grid),
      _forms.form,
      _forms[layout]
    )

    let btns = buttons || button

    return (
      <form {...props} onSubmit={this.handleSubmit} className={className}>
        {controls && this.renderControls()}
        {this.renderChildren(children)}
        {btns && this.renderButtons(btns)}
      </form>
    )
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  button: PropTypes.string,
  buttons: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.number,
  controls: PropTypes.array,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  grid: PropTypes.grid,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  labelWidth: PropTypes.number_string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.object
}

Form.defaultProps = {
  data: {},
  layout: 'aligned',
  disabled: false
}

Form.childContextTypes = {
  formData: PropTypes.object,
  itemBind: PropTypes.func,
  itemChange: PropTypes.func,
  itemUnbind: PropTypes.func
}

export default compose(Fetch, PureRender(true))(Form)
