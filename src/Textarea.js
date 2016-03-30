'use strict';

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
    this.props.onChange && this.props.onChange(value, event);
    this.props.autoHeight && this.autoHeight();
  }

  handleTrigger (trigger, event) {
    let value = this.element.value;
    this.props[trigger](value, event);
  }

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
    let { className, grid, style, autoHeight } = this.props;
    const { value, rows } = this.state;

    style.minHeight = 'auto';
    if (autoHeight) {
      style.resize = 'none';
    }

    const props = {
      className: classnames(
        className,
        getGrid(grid),
        'rct-form-control'
      ),
      onChange: this.handleChange,
      style,
      rows,
      value
    };

    ['onBlur', 'onKeyDown', 'onKeyUp'].forEach((key) => {
      if (this.props[key]) {
        props[key] = this.handleTrigger.bind(this, key);
      }
    });

    return (
      <textarea ref={ (c) => this.element = c } { ...this.props } { ...props } />
    );
  }
}

Textarea.propTypes = {
  autoHeight: PropTypes.bool,
  className: PropTypes.string,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
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

