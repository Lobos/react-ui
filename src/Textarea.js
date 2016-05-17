'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import objectAssign from 'object-assign';
import { getGrid } from './utils/grids';
import { register } from './higherOrders/FormItem';
import { computedStyle, getLineHeight } from './utils/dom';

import Styles from './styles/_input.scss';

class Textarea extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value : props.value,
      imeLock: false,
      rows: props.rows
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.bindElement = this.bindElement.bind(this)
    this.handleCompositionStart = this.handleCompositionStart.bind(this);
    this.handleCompositionEnd = this.handleCompositionEnd.bind(this);

  }

  componentDidMount (){
    let el = this.element;

    if(this.props.autoHeight){
      setTimeout(() => {
        this.lineHeight = getLineHeight(el);
        this.paddingHeight = parseInt(computedStyle(el, 'paddingTop')) +
          parseInt(computedStyle(el, 'paddingBottom'));
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== this.props.value && value !== this.state.value) {
      this.setState({ value });
    }
  }

  bindElement (ref) {
    this.element = ref;
  }

  handleChange (event){
    this.props.autoHeight && this.autoHeight();

    let value = event.target.value;
    this.setState({ value });

    if (this.props.trigger === 'change' && !this.state.imeLock) {
      this.props.onChange(value);
    }
  }

  handleTrigger (event) {
    let value = event.target.value;
    this.props.onChange(value, event);
  }

  handleCompositionStart () {
    this.setState({ imeLock: true });
  }

  handleCompositionEnd () {
    this.setState({ imeLock: false });
  }

  autoHeight () {
    let el = this.element;
    let scrH;
    let rows;

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
    let { className, grid, autoHeight, readOnly, trigger, ...other } = this.props;
    const { rows, value } = this.state;

    let style = { minHeight: 'auto' };
    if (autoHeight) {
      style.resize = 'none';
    }

    const props = {
      className: classnames(
        className,
        getGrid(grid),
        readOnly && Styles.disabled,
        Styles.input
      ),
      onChange: this.handleChange,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd,
      style: objectAssign({}, this.props.style, style),
      readOnly,
      rows,
      value
    };

    if (trigger !== 'change') {
      let handle = 'on' + trigger.charAt(0).toUpperCase() + trigger.slice(1);
      props[handle] = this.handleTrigger;
    }

    return (
      <textarea ref={this.bindElement} { ...other } { ...props } />
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
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  style: PropTypes.object,
  trigger: PropTypes.string,
  value: PropTypes.any
};

Textarea.defaultProps = {
  style: {},
  grid: 1,
  rows: 10,
  trigger: 'change',
  value: ''
};

export default register(['textarea'], {}, Textarea);

