'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import { objectAssign } from './utils/objects';
import { getGrid } from './utils/grids';
import { register } from './higherOrders/FormItem';
import { computedStyle, getLineHeight } from './utils/dom';
import PropTypes from './utils/proptypes';

import Styles from './styles/_input.scss';

class Textarea extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rows: props.rows
    };

    this.imeLock = false;

    this.handleChange = this.handleChange.bind(this);
    this.bindElement = this.bindElement.bind(this);
    this.handleCompositionStart = this.handleCompositionStart.bind(this);
    this.handleCompositionEnd = this.handleCompositionEnd.bind(this);
  }

  componentDidMount () {
    let el = this.element;

    if (this.props.autoHeight) {
      setTimeout(() => {
        this.lineHeight = getLineHeight(el);
        this.paddingHeight = parseInt(computedStyle(el, 'paddingTop')) +
          parseInt(computedStyle(el, 'paddingBottom'));
      }, 0);
    }
  }

  bindElement (ref) {
    this.element = ref;
  }

  handleChange (event) {
    this.props.autoHeight && this.autoHeight();
    this.props.onChange(event.target.value);
  }

  handleCompositionStart () {
    this.imeLock = true;
  }

  handleCompositionEnd () {
    this.imeLock = false;
  }

  autoHeight () {
    let el = this.element;
    let scrH;
    let rows;

    scrH = el.scrollHeight - this.paddingHeight;
    rows = Math.floor(scrH / this.lineHeight);

    if (rows >= this.props.rows) {
      this.setState({
        rows
      });
    }

    el.style.height = 'auto';
  }

  render () {
    let { className, grid, autoHeight, readOnly, ...other } = this.props;
    const { rows } = this.state;

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
      rows
    };

    return (
      <textarea ref={this.bindElement} { ...other } { ...props } />
    );
  }
}

Textarea.propTypes = {
  autoHeight: PropTypes.bool,
  className: PropTypes.string,
  grid: PropTypes.grid,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.any
};

Textarea.defaultProps = {
  style: {},
  grid: 1,
  rows: 10,
  value: ''
};

export default register(['textarea'], {}, Textarea);

