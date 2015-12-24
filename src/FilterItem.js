'use strict';

import { Component, PropTypes } from 'react';
import Datetime from './Datetime';
import Input from './Input';
import Select from './Select';

const DEFAULT_OPS = ['=', 'like', '>', '>=', '<', '<=', 'in', 'not in'];

class FilterItem extends Component {
  onLabelChange (optionsIndex) {
    optionsIndex = parseInt(optionsIndex);
    let options = this.props.options[optionsIndex];
    let filter = {
      optionsIndex,
      label: options.label,
      name: options.name,
      op: null,
      value: null,
      ops: options.ops || DEFAULT_OPS
    };
    // only one op, use it
    if (filter.ops.length === 1) {
      filter.op = filter.ops[0];
    }
    this.props.onChange(this.props.index, filter);
  }

  onOpChange (op) {
    this.props.onChange(this.props.index, { op });
  }

  onValueChange (value) {
    this.props.onChange(this.props.index, { value });
  }

  getFunc () {
    let options = this.props.options,
        name = this.props.name,
        value = this.props.value,
        op = this.props.op,
        func = function () {},
        filter = options[this.props.index];

    if (options.type === 'integer' || options.type === 'number') {
      value = parseFloat(value);
    }

    if (filter[op]) {
      return function (d) {
        return filter[op](d, value);
      };
    }

    switch (op) {
      case '=':
        func = (d) => { return d[name].toString() === value.toString(); };
      break;
      case 'like':
        func = (d) => { return d[name].indexOf(value) >= 0; };
      break;
      case '>':
        func = (d) => { return d[name] > value; };
      break;
      case '>=':
        func = (d) => { return d[name] >= value; };
      break;
      case '<':
        func = (d) => { return d[name] < value; };
      break;
      case '<=':
        func = (d) => { return d[name] <= value; };
      break;
      case 'in':
        func = (d) => { return value.split(',').indexOf(d[name].toString()) >= 0; };
      break;
      case 'not in':
        func = (d) => { return value.split(',').indexOf(d[name].toString()) < 0; };
      break;
    }

    return func;
  }

  remove () {
    // setTimeout wait parent clickaway completed
    setTimeout(() => {
      this.props.removeFilter(this.props.index);
    }, 0);
  }

  renderOp () {
    if (this.props.ops) {
      return <Select style={{width: 120}} value={this.props.op} onChange={this.onOpChange.bind(this)} data={this.props.ops} />;
    } else {
      return null;
    }
  }

  renderControl () {
    if (!this.props.label) {
      return null;
    }
    let options = this.props.options[this.props.optionsIndex],
        props = options.props || {},
        onChange = this.onValueChange.bind(this),
        style = { width: 240 },
        control;
    switch (options.type) {
      case 'select':
        control = <Select value={this.props.value} onChange={onChange} style={style} {...props} />;
      break;
      case 'datetime':
        control = <Datetime value={this.props.value} onChange={onChange} {...props} />;
      break;
      default:
        control = <Input value={this.props.value} type={options.type} style={style} onChange={onChange} {...props} />;
      break;
    }
    return control;
  }

  render () {
    let optionsIndex = this.props.optionsIndex;
    if (optionsIndex !== undefined) {
      optionsIndex = optionsIndex.toString();
    }
    return (
      <div className="rct-filter-item">
        <Select style={{width: 140}}
          value={optionsIndex}
          onChange={this.onLabelChange.bind(this)}
          optionTpl="{label}"
          valueTpl="{optionsIndex}"
          data={this.props.options} />

        { this.renderOp() }

        { this.renderControl() }

        <button onClick={this.remove.bind(this)} className="remove">&times;</button>
      </div>
    );
  }
}

FilterItem.propTypes = {
  index: PropTypes.number, // for onChange update filters
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  op: PropTypes.string,
  ops: PropTypes.array,
  options: PropTypes.array,
  optionsIndex: PropTypes.number,
  removeFilter: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.any
};

module.exports = FilterItem;
