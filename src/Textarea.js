"use strict";

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';
import { register } from './higherOrders/FormItem';
import { computedStyle, getLineHeight } from './utils/dom';

class Textarea extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value : props.value,
      rows: props.rows
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount (){
    let el = this.element;

    if(this.props.autoHeight){
      this.lineHeight = getLineHeight(el);
      this.paddingHeight = parseInt(computedStyle(el, 'paddingTop')) + parseInt(computedStyle(el, 'paddingBottom'));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleChange(null, nextProps.value);
    }
  }

  handleChange (event, value){
    if (!value && event) {
      value = event.target.value;
    }

    this.setState({value});
    this.props.onChange && this.props.onChange(value);
    this.props.autoHeight && this.autoHeight();
  }

  /**
   * 自动计算高度
   */
  autoHeight () {
    let el = this.element;
    let scrH;
    let rows;

    el.style.height = '1px';
    scrH = el.scrollHeight - this.paddingHeight;
    rows = Math.floor( scrH / this.lineHeight);

    if( rows >= this.props.rows ){
      this.setState({
        rows
      });
    }
    el.style.height = 'auto';
  }

  render () {
    let { value, className, onChange, rows, style, autoHeight, ...props } = this.props;

    let classNameStr = classnames(
      this.props.className,
      getGrid(this.props.grid),
      'rct-form-control',
      className
    );

    style.minHeight = 'auto';
    if (autoHeight) {
      style.resize = 'none';
    }


    return (
      <textarea {...props}
      className={classNameStr}
      onChange = {this.handleChange}
      ref={(c) => this.element = c}
      rows={ this.state.rows }
      style={ style }
      value={this.state.value}
      />
    );
  }

}


Textarea.propTypes = {
  /**
   * 是否自动伸缩高
   */
  autoHeight: PropTypes.bool,
  /**
   * classname
   */
  className: PropTypes.string,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  /**
   * placeholder
   */
  placeholder: PropTypes.string,
  /**
   * 默认几行，html textarea 默认的 rows 属性
   */
  rows: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.any
};

Textarea.defaultProps = {
  style: {},
  grid: 1,
  rows: 10
};

module.exports = register(Textarea, ['textarea']);

