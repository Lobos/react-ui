'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { forEach } from './utils/objects';

import { requireCss } from './themes';
requireCss('pagination');

class Pagination extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: this.props.index
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({ index: nextProps.index });
    }
  }

  getIndex () {
    return this.state.index;
  }

  setIndex (index) {
    index = parseInt(index);
    this.setState({index});
  }

  setInput (event) {
    event.preventDefault();

    let value = this.refs.input.value;
    value = parseInt(value);
    if (isNaN(value)) {
      return;
    }
    if (value < 1) {
      this.handleChange(1);
      return;
    }

    this.setIndex(value);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleChange (index) {
    this.setIndex(index);
    if (this.refs.input) {
      this.refs.input.value = index;
    }
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  getPages () {
    let total = this.props.total,
        size = this.props.size,
        index = this.state.index,
        span = this.props.pages,
        max = Math.ceil(total / size),
        pages = [],
        left,
        right;

    if (index > max) {
      index = max;
    }

    left = index - Math.floor(span / 2) + 1;
    if (left < 1) {
      left = 1;
    }
    right = left + span - 2;
    if (right >= max) {
      right = max;
      left = right - span + 2;
      if (left < 1) {
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    // add first
    if (left > 1) {
      pages.push(1);
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i);
    }
    // add last
    if (right < max) {
      pages.push(max);
    }

    return {pages, max};
  }

  render () {
    let index = this.state.index,
        {mini} = this.props,
        {pages, max} = this.getPages(),
        items = [];

    // Previous
    items.push(
      <li key="previous" onClick={index <= 1 ? null : this.handleChange.bind(this, index - 1)} className={classnames({ disabled: index <= 1 })}>
        <a>&laquo;</a>
      </li>
    );

    if (mini) {
      items.push(
        <form key="i" onSubmit={this.setInput.bind(this)}>
          <input ref="input" defaultValue={this.state.index} type="text" className="rct-form-control" />
        </form>
      );
      items.push(<span key="s"> / {max}</span>);
    } else {
      forEach(pages, function (i) {
        items.push(
          <li onClick={this.handleChange.bind(this, i)} className={classnames({ active: i === index })} key={i}>
            <a>{i}</a>
          </li>
        );
      }, this);
    }

    // Next
    items.push(
      <li key="next" onClick={index >= max ? null : this.handleChange.bind(this, index + 1)} className={classnames({ disabled: index >= max })}>
        <a>&raquo;</a>
      </li>
    );

    let className = classnames(
      this.props.className,
      'rct-pagination-wrap',
      { 'rct-pagination-mini': mini }
    );
    return (
      <div style={this.props.style} className={className}>
        <ul className="rct-pagination">
          {items}
        </ul>
        {
          this.props.jumper && !mini &&
          <form onSubmit={this.setInput.bind(this)}>
            <div className="rct-input-group">
              <input ref="input" defaultValue={this.state.index} type="text" className="rct-form-control" />
              <span onClick={this.setInput.bind(this)} className="addon">go</span>
            </div>
          </form>
        }
      </div>
    );
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  jumper: PropTypes.bool,
  mini: PropTypes.bool,
  onChange: PropTypes.func,
  pages: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  total: PropTypes.number
};

Pagination.defaultProps = {
  index: 1,
  pages: 10,
  size: 20,
  total: 0
};

module.exports = Pagination;
