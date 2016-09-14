'use strict'

import React, { createElement } from 'react'
import classnames from 'classnames'
import curry from 'curry'
import { shallowEqual } from '../utils/objects'
import * as Validation from '../utils/validation'
import PropTypes from '../utils/proptypes'

import _inputs from '../styles/_input.scss'

export const COMPONENTS = {}

export default function FormItem (Component) {
  class FormItem extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        hasError: false,
        value: props.value || props.defaultValue
      }

      this.handleChange = this.handleChange.bind(this)
      this.validate = this.validate.bind(this)
    }

    componentWillMount () {
      const { name, defaultValue, dispatch, disabled, ignore } = this.props
      const { itemBind } = this.context

      if (itemBind) {
        itemBind({
          name,
          dispatch,
          value: defaultValue,
          disabled: disabled || ignore,
          validate: this.validate
        })
      }
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value })
      }
    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
      if (!shallowEqual(nextProps, this.props) || !shallowEqual(this.state, nextState)) {
        return true
      }

      if (shallowEqual(this.context, nextContext)) return false

      const { formData } = nextContext
      const { name } = nextProps
      return !shallowEqual(formData[name], this.context.formData[name])
    }

    componentWillUnmount () {
      const { name, onValidate } = this.props
      const { itemUnbind } = this.context
      itemUnbind && itemUnbind(name)

      // remove FormControl validation status
      onValidate && onValidate(name, true)
    }

    validate (value) {
      value = value || this.getValue()
      const { formData } = this.context
      const { onValidate, name, ...other } = this.props

      // component's inner validate
      const validate = getValidate(other.type)

      const result = validate ? validate(value, other, formData)
        : Validation.validate(value, getValueType(other.type), formData, other)

      this.setState({ hasError: result !== true })
      onValidate && onValidate(name, result)

      return result
    }

    getValue () {
      const { name } = this.props
      const { formData } = this.context

      return formData && formData[name] !== undefined ? formData[name] : this.state.value
    }

    handleChange (value) {
      const { itemChange } = this.context
      const { name, onChange } = this.props

      if (typeof value === 'object' && value.nativeEvent) {
        value = value.target.value
      }

      this._timeout && clearTimeout(this._timeout)
      this._timeout = setTimeout(() => {
        this.validate(value)
      }, 400)

      if (!(value instanceof Error)) {
        // if in a form, use formData, else use state
        itemChange ? itemChange(name, value) : this.setState({ value })
      }
      onChange && onChange(...arguments)
    }

    render () {
      let { className, value, style, ...props } = this.props
      value = this.getValue()

      className = classnames(
        className,
        this.state.hasError && _inputs.dangerInput
      )

      // remove defaultValue,  use controlled value
      delete props['defaultValue']

      return (
        <Component {...props}
          hasError={this.state.hasError}
          onChange={this.handleChange}
          style={style}
          value={value}
          className={className}
        />
      )
    }
  }

  FormItem.displayName = 'FormItem'

  FormItem.isFormItem = true

  FormItem.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    dispatch: PropTypes.array_string,
    ignore: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    sep: PropTypes.string,
    style: PropTypes.object_string,
    type: PropTypes.string,
    validator: PropTypes.func_object,
    value: PropTypes.any
  }

  FormItem.contextTypes = {
    formData: PropTypes.object,
    itemBind: PropTypes.func,
    itemChange: PropTypes.func,
    itemUnbind: PropTypes.func
  }

  FormItem.defaultProps = {
    sep: ','
  }

  return FormItem
}

FormItem.register = curry((types, options, component) => {
  let newComponent = FormItem(component)

  // allow empty type
  // if (isEmpty(types)) {
  //  console.warn('types must be string or array');
  //  return;
  // }

  if (!Array.isArray(types)) {
    types = [types]
  }

  types.forEach((type) => {
    if (COMPONENTS.hasOwnProperty(type)) {
      console.warn(`type ${type} was already existed.`)
      return
    }

    let { valueType, render, validate } = options
    if (!valueType) {
      valueType = ['integer', 'number'].indexOf(type) > -1 ? 'number' : 'string'
    }

    if (!render) {
      render = (props) => createElement(newComponent, props)
    }

    COMPONENTS[type] = { render, valueType, component, validate }
  })

  return newComponent
})

export const getValueType = (type) => {
  let valueType = 'string'
  if (COMPONENTS[type]) {
    valueType = COMPONENTS[type].valueType
  }
  return valueType
}

export const getValidate = (type) => {
  if (COMPONENTS[type]) return COMPONENTS[type].validate
}
