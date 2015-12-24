"use strict";

import { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';

import { requireCss } from './themes';
requireCss('rating');

let themes = {
  // "star": [Icon, Icon],
  // "heart": [img, img]
};

class Rating extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      hover: 0,
      wink: false
    };
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
  }

  handleHover (value) {
    return function () {
      this.setState({ hover: value });
    }.bind(this);
  }

  handleLeave () {
    this.setState({ hover: 0 });
  }

  setValue (value) {
    this.setState({ value });
  }

  getValue () {
    return this.state.value;
  }

  getIcon (pos = 0) {
    let icons = this.props.icons;
    if (!icons) {
      let theme = this.props.theme || Object.keys(themes)[0];
      icons = themes[theme];
    }
    if (!icons) {
      console.warn('icons or theme not exist');
      return null;
    }

    return icons[pos];
  }

  getBackground () {
    let items = [],
        icon = this.getIcon(0);
    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(cloneElement(icon, { key: i }));
    }

    return <div className="rct-rating-bg">{items}</div>;
  }

  handleChange (val) {
    this.setValue(val);
    this.setState({ wink: true });
    setTimeout(() => {
      this.setState({ wink: false });
    }, 1000);
    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(val);
      }
    });
  }

  getHandle () {
    let items = [],
        icon = this.getIcon(1),
        hover = this.state.hover,
        wink = this.state.wink,
        value = hover > 0 ? hover : this.state.value;

    for (let i = 0, active; i < this.props.maxValue; i++) {
      active = value > i;
      items.push(
        <span key={i}
          style={{cursor: 'pointer'}}
          onMouseOver={this.handleHover(i + 1)}
          onClick={this.handleChange.bind(this, i + 1)}
          className={classnames('rct-rating-handle', { active, wink: active && wink })}>
          {cloneElement(icon)}
        </span>
      );
    }

    return <div onMouseOut={this.handleLeave.bind(this)} className="rct-rating-front">{items}</div>;
  }

  getMute () {
    let items = [],
        icon = this.getIcon(1),
        width = (this.state.value / this.props.maxValue * 100) + '%';

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(cloneElement(icon, { key: i }));
    }

    return (
      <div style={{ width }} className="rct-rating-front">
        <div className="rct-rating-inner">
          {items}
        </div>
      </div>
    );
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-rating'
    );
    return (
      <div style={this.props.style} className={className}>
        { this.getBackground() }
        { this.props.readOnly ? this.getMute() : this.getHandle() }
      </div>
    );
  }
}

Rating.register = function (key, icons) {
  themes[key] = icons;
};

Rating.propTypes = {
  className: PropTypes.string,
  icons: PropTypes.array,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.object,
  theme: PropTypes.string,
  value: PropTypes.number
};

Rating.defaultProps = {
  maxValue: 5
};

import FormControl from './FormControl';
FormControl.register(

  'rating',

  function (props) {
    return <Rating {...props} />;
  },

  Rating

);

module.exports = Rating;
