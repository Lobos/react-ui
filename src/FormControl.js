'use strict'

import { Component, cloneElement, Children } from 'react'
import classnames from 'classnames'
import { COMPONENTS, getValueType } from './higherOrders/FormItem'
import merge from './utils/merge'
import { getGrid } from './utils/grids'
import { format } from './utils/strings'
import { isEmpty, objectAssign, shallowEqual, partialEqual } from './utils/objects'
import PropTypes from './utils/proptypes'

import { getLang, setLang } from './lang'
setLang('validation')

import _forms from './styles/_form.scss'

function setHint (hints, key, value) {
  let text = getLang('validation.hints.' + key, null)
  if (text) {
    hints.push(format(text, value))
  }
}

class FormControl extends Component {
  constructor (props) {
    super(props)
    this.state = {
      validations: {}
    }

    this.names = []
    this.handleValidate = this.handleValidate.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !partialEqual(this.context.formData, nextContext.formData, this.names) ||
      !shallowEqual(this.context.controlProps, nextContext.controlProps)
  }

  handleValidate (name, result) {
    let { validations } = this.state
    if (result === true) {
      delete validations[name]
      validations = {...validations}
    } else {
      validations = objectAssign({}, validations, {[name]: result})
    }
    this.setState({ validations })
  }

  getHint (props) {
    if (props.required) {
      this.required = true
    }

    // allow empty string
    if (props.tip || props.tip === '') {
      return ''
    }

    let valueType = getValueType(props.type)
    let hints = []

    setHint(hints, props.type)
    if (props.min) { setHint(hints, `min.${valueType}`, props.min) }
    if (props.max) { setHint(hints, `max.${valueType}`, props.max) }

    return hints.join(', ')
  }

  setChildrenHint (hints, children) {
    Children.toArray(children).forEach((child) => {
      if (child.type && child.type.isFormItem) {
        let hint = this.getHint(child.props)
        if (hint) hints.push(hint)

        // set name
        this.names.push(child.props.name)
      } else if (child.children) {
        this.setChildrenHint(hints, children)
      }
    })
  }

  getItems () {
    let { label, items, children, ...otherProps} = this.props
    let hints = []

    this.names = []
    this.required = false
    if (children) {
      this.setChildrenHint(hints, children)
    } else {
      if (!items) {
        items = [objectAssign({}, otherProps, {label})]
      }
    }

    if (items) {
      items.forEach((control) => {
        let hint = this.getHint(control)
        if (hint) hints.push(hint)

        // set names
        this.names.push(control.name)
      })
    }

    return { items, hints: hints.join(', ') }
  }

  renderTip (hints) {
    let { tip, errorText } = this.props
    let { validations } = this.state
    hints = tip || hints

    if (!isEmpty(validations)) {
      // if has tip，use tip
      let text = errorText || (Object.keys(validations).map((key) => validations[key].message)).join(', ')
      return <span key="tip" className={_forms.dangerText}>{text}</span>
    }

    if (hints) {
      return <span key="tip" className={_forms.hintText}>{hints}</span>
    } else {
      return
    }
  }

  propsExtend (props) {
    props.onValidate = this.handleValidate
    props.readOnly = props.readOnly || this.props.readOnly
  }

  renderChildren (children, grid) {
    let newChildren = Children.toArray(children).map((child, i) => {
      if (typeof child === 'string') {
        return <span key={i}>{child}</span>
      }

      let props = grid ? { grid } : {}
      if (child.type.isFormItem) {
        this.propsExtend(props)
      } else if (child.props && child.props.children === 'object') {
        props.children = this.renderChildren(child.props.children, grid)
      }

      child = cloneElement(child, props)
      return child
    })
    return newChildren
  }

  renderItems (grid) {
    const { children } = this.props
    let { items, hints } = this.getItems()

    items = (items || []).map((props, i) => {
      i += length
      if (typeof props === 'string') {
        // return <span key={i} dangerouslySetInnerHTML={{__html: props}} />
        return <span key={i}>{props}</span>
      }
      let component = COMPONENTS[props.type]
      if (component) {
        this.propsExtend(props)
        props.key = `${props.label}|${props.name}`
        props = merge({}, props, { grid })
        return component.render(props)
      }
    })

    if (children) {
      items = items.concat(this.renderChildren(children, grid))
    }

    items.push(this.renderTip(hints))

    return items
  }

  render () {
    const mergeProps = objectAssign({}, this.context.controlProps, this.props)
    let { hintType, layout, label, grid, labelWidth, required, style, columns } = mergeProps

    let isInline = layout === 'inline'
    let newStyle = { ...style }

    if (!hintType) hintType = isInline ? 'pop' : 'block'

    let className = classnames(
      this.props.className,
      _forms.group,
      !isEmpty(this.state.validations) && _forms.hasError
    )

    if (isInline) {
      className = classnames(
        className,
        getGrid(grid || (columns ? 1 / columns : undefined)),
        columns && columns > 0 && _forms.columned
      )
      grid = columns && columns > 0 ? 1 : undefined
    }

    // set this.required
    const items = this.renderItems(grid)

    // label =================================================
    const labelClass = classnames(
      _forms.label,
      (required || this.required) && _forms.required
    )

    if (labelWidth) {
      if (typeof labelWidth === 'number' && labelWidth < 1) {
        labelWidth += '%'
      }
    }

    if (layout === 'aligned') {
      labelWidth = labelWidth || '10rem'
      newStyle.paddingLeft = labelWidth
    }

    return (
      <div style={newStyle} className={className}>
        {
          label &&
          <label style={{ width: labelWidth }} className={labelClass}>
            {label}
          </label>
        }
        <div className={_forms.control}>{items}</div>
      </div>
    )
  }
}

FormControl.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.number,
  data: PropTypes.any,
  errorText: PropTypes.string,
  grid: PropTypes.grid,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  items: PropTypes.array,
  label: PropTypes.element_string,
  labelWidth: PropTypes.number_string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.object,
  tip: PropTypes.element_string,
  type: PropTypes.string,
  value: PropTypes.any
}

FormControl.defaultProps = {
  type: 'text'
}

FormControl.contextTypes = {
  controlProps: PropTypes.object
}

export default FormControl

