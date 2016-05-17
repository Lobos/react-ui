'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { shallowEqual } from './utils/objects';

import Styles from './styles/_radio-checkbox.scss';

export default class Radio extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // empty function
    this.handleChange = () => {};
  }

  shouldComponentUpdate (nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  handleClick () {
    const { onClick, index, defaultValue } = this.props;
    if (onClick) {
      onClick(defaultValue, true, index);
    }
  }

  render () {
    const { style, className, checked, block, readOnly, defaultValue, text, children } = this.props;

    let labelClass = classnames(
      className,
      Styles.radio,
      block ? Styles.block : Styles.inline,
      readOnly ? Styles.disabled : undefined,
      checked ? Styles.checked : undefined
    );

    return (
      <label style={style} className={labelClass}>
        <input ref="input"
          type="radio"
          disabled={readOnly}
          onChange={this.handleChange}
          onClick={this.handleClick}
          checked={checked}
          value={defaultValue}
        />
        <span className={Styles.indicator} />
        <span>{text}</span>
        { children }
      </label>
    );
  }
}

Radio.propTypes = {
  block: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  index: PropTypes.number,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
};
