import React, { createElement } from 'react'
import classnames from 'classnames'
import curry from 'curry'
import { shallowEqual } from '../utils/objects'
import * as Validation from '../utils/validation'
import PropTypes from '../utils/proptypes'
import Popover from '../Tooltip/FormItemPopover'

import _inputs from '../styles/_input.scss'

export const COMPONENTS = {}

export default function FormItem (Component) {
  class FormItem extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        result: undefined,
        value: props.value !== undefined ? props.value : props.defaultValue
      }

      this.handleChange = this.handleChange.bind(this)
      this.validate = this.validate.bind(this)
      this.setResult = this.setResult.bind(this)
    }

    componentWillMount () {
      const { name, value, defaultValue, dispatch, disabled, ignore } = this.props
      const { itemBind } = this.context

      if (itemBind && name) {
        itemBind({
          name,
          dispatch,
          value: value || defaultValue,
          disabled: disabled || ignore,
          validate: this.validate
        })
      }
    }

    componentDidMount () {
      const { validator } = this.props
      const value = this.getValue()
      if (validator && validator.async && value !== undefined) {
        this.validate()
      }
    }

    componentWillReceiveProps (nextProps) {
      const { itemChange } = this.context
      if (this.props.value !== nextProps.value) {
        itemChange && nextProps.name
          ? itemChange(nextProps.name, nextProps.value)
          : this.setState({ value: nextProps.value })
      }
    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
      if (!shallowEqual(nextProps, this.props) || !shallowEqual(this.state, nextState)) {
        return true
      }

      if (shallowEqual(this.context, nextContext)) return false
      if (!shallowEqual(this.context.controlProps, nextContext.controlProps)) return true

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

    setResult (result) {
      const { name, onValidate } = this.props
      this.setState({ result })
      onValidate && onValidate(name, result)
    }

    validate (value, useState) {
      if (useState && this.state.result !== undefined) {
        return this.state.result
      }

      value = value || this.getValue()
      const { formData } = this.context
      const { type } = this.props

      let validate

      // component's inner validate
      if (Component.isFormBlock) {
        if (this._el) validate = this._el.validate.bind(this._el)
      } else {
        validate = getValidate(type)
      }

      const result = validate ? validate(value, this.props, formData)
        : Validation.validate(value, getValueType(type), formData, this.props, this.setResult)

      this.setResult(result)

      return result
    }

    getValue () {
      const { name, type } = this.props
      const { formData } = this.context

      if (!name || !formData) return this.state.value

      const comp = COMPONENTS[type]
      if (comp && comp.allowEmpty) return formData[name]

      return formData[name] !== undefined ? formData[name] : this.state.value
    }

    handleChange (value) {
      const { itemChange } = this.context
      const { name, onChange, beforeChange } = this.props

      if (typeof value === 'object' && value.nativeEvent) {
        value = value.target.value
      }

      this._timeout && clearTimeout(this._timeout)

      if (value instanceof Error) {
        this.setResult(value)
      } else {
        this._timeout = setTimeout(() => {
          this.validate(value)
        }, 400)

        if (beforeChange) value = beforeChange(value)
        // if in a form, use formData, else use state
        itemChange && name ? itemChange(name, value) : this.setState({ value })

        // arguments handle
        let args = Array.prototype.slice.call(arguments)
        args[0] = value
        onChange && onChange(...args)
      }
    }

    render () {
      let { readOnly, popover, ...props } = this.props
      const { controlProps } = this.context
      const { result } = this.state

      let value = this.getValue()

      let className = classnames(
        this.props.className,
        (this.state.result instanceof Error) && _inputs.dangerInput
      )

      if (controlProps && controlProps.disabled) readOnly = true

      // remove defaultValue,  use controlled value
      delete props['defaultValue']

      let el = (
        <Component {...props}
          ref={(el) => { this._el = el }}
          hasError={this.state.result instanceof Error}
          onChange={this.handleChange}
          value={value}
          readOnly={readOnly}
          className={className}
        />
      )

      if (popover) {
        return (
          <Popover position={popover}
            type={'danger'}
            content={result instanceof Error ? result.message : undefined}>
            {el}
          </Popover>
        )
      } else {
        return el
      }
    }
  }

  FormItem.displayName = 'FormItem'

  FormItem.isFormItem = true

  FormItem.propTypes = {
    beforeChange: PropTypes.func,
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    dispatch: PropTypes.array_string,
    ignore: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    popover: PropTypes.string,
    readOnly: PropTypes.bool,
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
    itemUnbind: PropTypes.func,
    controlProps: PropTypes.object
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

    let { valueType, render, validate, allowEmpty } = options
    if (!valueType) {
      valueType = ['integer', 'number'].indexOf(type) > -1 ? 'number' : 'string'
    }

    if (!render) {
      render = (props) => createElement(newComponent, props)
    }

    COMPONENTS[type] = { render, valueType, component, validate, allowEmpty }
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
