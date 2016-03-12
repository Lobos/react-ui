"use strict";

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';
import { requireCss } from './themes';


class Textarea extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value : props.value,
      rows:  props.rows
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount (){
    let el = this.element;

    if(this.props.autoHeight){
      this.lineHeight = this.getLineHight();
      this.paddingH = parseInt(this.computedStyle(el, 'paddingTop')) + parseInt(this.computedStyle(el, 'paddingBottom'));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
  }

  handleChange (event, value){
    value = value || event.target.value;

    if(this.props.maxLength){
      value = value.substr(0, this.props.maxLength);
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
    scrH = el.scrollHeight - this.paddingH;
    rows = Math.floor( scrH / this.lineHeight);

    if( rows >= this.props.rows ){
      this.setState({
        rows
      });
    }
    el.style.height = 'auto';

  }


  getValue (){
    return this.state.value;
  }

  setValue (value){
    this.handleChange(null, value);
  }

  computedStyle (el, attr) {
    var lineHeight;
    if (el.currentStyle) {
      lineHeight = el.currentStyle[attr]
    } else if (window.getComputedStyle) {
      lineHeight = window.getComputedStyle(el , null)[attr];
    }
    return lineHeight;
  }

  getLineHight () {
    let el  = this.element.cloneNode(true);
    let lineHeight;
    el.style.padding = 0;
    el.rows = 1;
    el.innerHTML = '&nbsp;'
    el.style.minHeight= 'inherit'
    this.element.parentNode.appendChild(el);
    lineHeight = el.clientHeight;
    this.element.parentNode.removeChild(el);

    return lineHeight;
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
  maxLength: PropTypes.number,
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

Textarea.displayName = 'Textarea';

module.exports = Textarea;

