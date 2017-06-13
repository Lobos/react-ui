import React, { Component } from 'react'
import PropTypes from './utils/proptypes'
import { objectAssign } from './utils/objects'
import Enhance from './higherOrders/FormItem'

class FormBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.itemBind = this.itemBind.bind(this)
    this.itemUnbind = this.itemUnbind.bind(this)
    this.itemChange = this.itemChange.bind(this)

    this.items = {}
    this.initData = {}
  }

  getChildContext () {
    const { columns, labelWidth, layout, hintType } = this.props

    const np = {}
    if (columns) np.columns = columns
    if (labelWidth) np.labelWidth = labelWidth
    if (layout) np.layout = layout
    if (hintType) np.hintType = hintType

    return {
      formData: this.props.value,
      itemBind: this.itemBind,
      itemUnbind: this.itemUnbind,
      itemChange: this.itemChange,
      controlProps: objectAssign({}, this.context.controlProps, np)
    }
  }

  componentDidMount () {
    this.props.onChange(this.initData)
  }

  itemBind (item) {
    const { name, value } = item
    const data = { ...this.props.value }
    this.items[name] = item
    if (value !== undefined && !data[name]) {
      this.initData[name] = value
    }
  }

  itemUnbind (name) {
    delete this.items[name]
    const data = {...this.props.value}
    delete data[name]
    this.props.onChange(data)
  }

  itemChange (name, value) {
    const data = objectAssign({}, this.props.value, {[name]: value})
    this.props.onChange(data)
  }

  validate (data) {
    return Object.keys(this.items).reduce((suc, key) => {
      return suc && (this.items[key].validate(data[key], true) === true)
    }, true)
  }

  render () {
    const { className, children } = this.props
    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

FormBlock.isFormBlock = true

FormBlock.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.number,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  labelWidth: PropTypes.number_string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object
}

FormBlock.defaultProps = {
  value: {}
}

FormBlock.contextTypes = {
  controlProps: PropTypes.object
}

FormBlock.childContextTypes = {
  formData: PropTypes.object,
  itemBind: PropTypes.func,
  itemChange: PropTypes.func,
  itemUnbind: PropTypes.func,
  controlProps: PropTypes.object
}

export default Enhance(FormBlock)

