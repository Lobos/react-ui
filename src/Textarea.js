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
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  componentDidMount (){
    let el = this.element;

    if(this.props.autoHeight){
      this.lineHeight = getLineHeight(el);
      this.paddingHeight = parseInt(computedStyle(el, 'paddingTop')) + parseInt(computedStyle(el, 'paddingBottom'));
    }
  }

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== this.props.value && value !== this.state.value) {
      this.setState({ value });
    }
  }

  handleChange (event){
    this.props.autoHeight && this.autoHeight();

    let value = event.target.value;
    this.setState({ value });

    if (this.props.trigger === 'change') {
      this.handleTrigger(event);
    }
  }

  handleTrigger (event) {
    let value = event.target.value;
    this.props.onChange(value, event);
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
    let { className, grid, style, autoHeight, trigger, ...other } = this.props;
    const { rows, value } = this.state;

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

    if (trigger !== 'change') {
      let handle = 'on' + trigger.charAt(0).toUpperCase() + trigger.slice(1);
      props[handle] = this.handleTrigger;
    }

    return (
      <textarea ref={ (c) => this.element = c } { ...other } { ...props } />
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
  trigger: PropTypes.string,
  value: PropTypes.any
};

Textarea.defaultProps = {
  style: {},
  grid: 1,
  rows: 10,
  trigger: 'blur',
  value: ''
};

module.exports = register(Textarea, ['textarea']);

