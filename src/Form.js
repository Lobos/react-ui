import React, { Component } from 'react'
import classnames from 'classnames'
import { forEach, deepEqual, hashcode, objectAssign, isEmpty } from './utils/objects'
import clone from './utils/clone'
import { getGrid } from './utils/grids'
import { filterFormProps } from './utils/propsFilter'
import FormControl from './FormControl'
import Button from './Button'
import PropTypes from './utils/proptypes'
import { compose } from './utils/compose'
import Mask from './Mask'

import Fetch, { FETCH_PENDING } from './higherOrders/Fetch'
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
    const { columns, disabled, labelWidth, layout, hintType } = this.props

    return {
      formData: this.state.data,
      itemBind: this.itemBind,
      itemUnbind: this.itemUnbind,
      itemChange: this.itemChange,
      controlProps: {
        hintType,
        labelWidth,
        disabled,
        layout,
        columns
      }
    }
  }

  componentDidMount () {
    if (!isEmpty(this.state.data) && this.props.initValidate) {
      this.validate()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(this.props.data, nextProps.data) && !deepEqual(nextProps.data, this.state.data)) {
      this.setState({ data: objectAssign({}, this.state.data, nextProps.data) }, () => {
        this.validate()
      })
    }
  }

  itemBind (item) {
    const { name, value } = item
    this.items[name] = item
    let { data } = this.state
    if (value !== undefined && !data[name]) {
      // data = objectAssign({}, data, {[name]: value})
      // this.setState({ data })

      // initial data, don't use setState
      data[name] = value
    }
  }

  itemUnbind (name) {
    delete this.items[name]
    delete this.state.data[name]
  }

  itemChange (name, value) {
    const item = this.items[name]
    const data = objectAssign({}, this.state.data, {[name]: value})
    this.setState({ data }, () => {
      if (item.dispatch) {
        const ds = Array.isArray(item.dispatch) ? item.dispatch : [item.dispatch]
        ds.forEach((d) => this.items[d].validate())
      }
    })

    // handle form data change
    this.props.onChange && this.props.onChange(data)
  }

  validate () {
    const { data } = this.state

    return Object.keys(this.items).reduce((suc, key) => {
      return suc && (this.items[key].validate(data[key], true) === true)
    }, true)
  }

  handleSubmit (event) {
    if (this.props.disabled) {
      return
    }

    event && event.preventDefault()
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
        return <FormControl { ...control } />
      }
    })
  }

  renderButtons (buttons) {
    if (typeof buttons === 'string') {
      buttons = { 'submit': buttons }
    }

    const { submit, primary, reset, cancel, others } = buttons
    const { disabled } = this.props

    return (
      <FormControl key="buttons" columns={null}>
        { submit && <Button className={_forms.button} disabled={disabled} type="submit" status="primary">{submit}</Button> }
        { primary && <Button className={_forms.button} disabled={disabled} onClick={this.handleSubmit} status="primary">{primary}</Button> }
        { reset && <Button type="reset" disabled={disabled} className={_forms.button}>{reset}</Button> }
        { cancel && <Button onClick={this.props.onCancel} disabled={disabled} className={_forms.button}>{cancel}</Button> }
        { others }
      </FormControl>
    )
  }

  render () {
    const { button, buttons, controls, children, grid, layout, fetchStatus, ...props } = this.props

    const className = classnames(
      this.props.className,
      getGrid(grid),
      _forms.form,
      _forms[layout]
    )

    const btns = buttons || button

    return (
      <form {...filterFormProps(props)}
        onReset={this.handleReset}
        onSubmit={this.handleSubmit}
        className={className}>
        <Mask active={fetchStatus === FETCH_PENDING} />
        {controls && this.renderControls()}
        {children}
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
  fetchStatus: PropTypes.string,
  grid: PropTypes.grid,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  initValidate: PropTypes.bool,
  labelWidth: PropTypes.number_string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
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
  itemUnbind: PropTypes.func,
  controlProps: PropTypes.object
}

export default compose(
  Fetch(true),
  PureRender(true)
)(Form)
