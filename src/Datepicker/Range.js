'use strict'

import React from 'react'
import classnames from 'classnames'
import Datepicker from './index'
import PropTypes from '../utils/proptypes'
import PureRender from '../mixins/PureRender'

import _datepickers from '../styles/_datepicker.scss'

class Range extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.firstChange = this.firstChange.bind(this)
    this.secondChange = this.secondChange.bind(this)
  }

  firstChange (value) {
    this.setState({ first: value })
    this.props.onChange(value, this.props.names[0])
  }

  secondChange (value) {
    this.setState({ second: value })
    this.props.onChange(value, this.props.names[1])
  }

  render () {
    const { className, names, min, max, con, ...other } = this.props
    return (
      <div className={classnames(className, _datepickers.range)}>
        <Datepicker min={min} name={names[0]} {...other}
          max={this.state.second}
          onChange={this.firstChange}
        />
        {con}
        <Datepicker max={max} name={names[1]} {...other}
          min={this.state.first}
          onChange={this.secondChange}
        />
      </div>
    )
  }
};

Range.isFormItem = true

Range.propTypes = {
  className: PropTypes.string,
  con: PropTypes.any,
  max: PropTypes.datetime,
  min: PropTypes.datetime,
  names: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

Range.defaultProps = {
  con: '-',
  names: [],
  onChange: () => {}
}

export default PureRender(Range)
