'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { toArray, substitute } from './utils/strings';
import { getOuterHeight, overView, withoutTransition } from './utils/dom';
import { deepEqual, hashcode } from './utils/objects';
import ClickAway from './mixins/ClickAway';
import { getGrid } from './utils/grids';
import { fetchEnhance } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';
import { connect } from './utils/connect';
import Transition from './Transition';

import styles from './styles/_select.scss';
import inputStyles from './styles/_input.scss';

class Select extends ClickAway(Component) {
  constructor (props) {
    super(props);

    let values = toArray(props.value, props.mult ? props.sep : undefined);
    let data = this.formatData(props.data, values);
    this.state = {
      active: false,
      data,
      filter: '',
      value: values
    };

    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
 
  componentWillReceiveProps (nextProps) {
    if (!deepEqual(nextProps.value, this.props.value)) {
      this.setValue(nextProps.value);
    }
    if (!deepEqual(nextProps.data, this.props.data)) {
      this.setState({ data: this.formatData(nextProps.data) });
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
  }

  componentDidMount () {
    this.options = findDOMNode(this.refs.options);
    let target = this.props.mult ? undefined : this.options;
    this.registerClickAway(this.hideOptions, target);
  }

  showOptions () {
    if (this.state.active || this.props.readOnly) {
      return;
    }

    this.bindClickAway();

    this.setState({ filter: '', active: true }, () => {
      let offset = getOuterHeight(this.options) + 5;

      let el = this.refs.container;
      let dropup = overView(el, offset);

      withoutTransition(el, () => {
        this.setState({ dropup });
      });
    });
  }

  hideOptions () {
    this.setState({ active: false });
    this.unbindClickAway();
  }

  getValue (sep, data) {
    let value = [],
        raw = [];
    data.forEach((d) => {
      if (d.$checked) {
        value.push(d.$value);
        raw.push(d);
      }
    });

    if (typeof sep === 'string') {
      value = value.join(sep);
    } else if (typeof sep === 'function') {
      value = sep(raw);
    }

    return value;
  }

  setValue (value) {
    value = toArray(value, this.props.mult ? this.props.sep : null);
    if (this.state) {
      let data = this.state.data.map((d) => {
        if (typeof d !== 'string') {
          d.$checked = value.indexOf(d.$value) >= 0;
        }
        return d;
      });
      this.setState({ value, data });
    } else {
      this.setState({ value });
    }
  }

  formatData (data, value = this.state.value) {
    if (!Array.isArray(data)) {
      data = Object.keys(data).map((key) => {
        return { text: data[key], id: key };
      });
    }

    data = data.map((d) => {
      if (typeof d !== 'object') {
        return {
          $option: d,
          $result: d,
          $value: d,
          $filter: d.toLowerCase(),
          $checked: value.indexOf(d) >= 0,
          $key: hashcode(d)
        };
      }

      // speed filter
      if (this.props.filterAble) {
        d.$filter = (Object.keys(d).map((k) => d[k])).join(',').toLowerCase();
      }

      let val = substitute(this.props.valueTpl, d);
      d.$option = substitute(this.props.optionTpl, d);
      d.$result = this.props.resultTpl ? substitute(this.props.resultTpl, d) : d.$option;
      d.$value = val;
      d.$checked = value.indexOf(val) >= 0;
      d.$key = d.id ? d.id : hashcode(val + d.$option);
      return d;
    });

    if (this.props.groupBy) {
      let groups = {},
          groupBy = this.props.groupBy;
      data.forEach((d) => {
        let key = d[groupBy];
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(d);
      });
      data = [];
      Object.keys(groups).forEach((k) => {
        data.push(k);
        data = data.concat(groups[k]);
      });
    }

    return data;
  }

  handleChange (i) {
    if (this.props.readOnly) {
      return;
    }

    let data = this.state.data;
    if (this.props.mult) {
      data[i].$checked = !data[i].$checked;
    } else {
      data.map((d, index) => {
        if (typeof d === 'object') {
          d.$checked = index === i;
        }
      });
      this.hideOptions();
    }

    let value = this.getValue(this.props.sep, data);
    this.setState({ value, data });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleRemove (i) {
    // wait checkClickAway completed
    setTimeout(() => {
      this.handleChange(i);
    }, 0);
  }

  handleFilter (e) {
    this.setState({ filter: e.target.value });
  }

  renderFilter () {
    if (this.props.filterAble) {
      return (
        <div className={styles.filter}>
          <input className={classnames(inputStyles.input)}
            value={this.state.filter}
            onChange={ this.handleFilter }
            type="text" />
        </div>
      );
    }
  }

  render () {
    let { className, grid, readOnly, mult, placeholder, style } = this.props;
    let { filter, active, msg, data, dropup } = this.state;
    let result = [];
 
    className = classnames(
      styles.select,
      className,
      getGrid(grid),
      active && styles.open,
      readOnly && styles.readonly,
      dropup && styles.dropup,
      !mult && styles.single
    );

    let filterText = filter ? filter.toLowerCase() : null;

    let options = data.map((d, i) => {
      if (typeof d === 'string') {
        return <span key={`g-${d}`} className={styles.group}>{d}</span>;
      }

      if (d.$checked) {
        if (mult) {
          result.push(
            <div key={d.$key} className={styles.result}>
              <span dangerouslySetInnerHTML={{__html: d.$result}} />
              <a href="javascript:;" onClick={this.handleRemove.bind(this, i)}>&times;</a>
            </div>
          );
        } else {
          result.push(<span key={d.$key} dangerouslySetInnerHTML={{__html: d.$result}} />);
        }
      }

      let optionClassName = classnames(
        d.$checked && styles.active,
        (filterText ? d.$filter.indexOf(filterText) < 0 : false) && styles.hidden
      );
      return (
        <li key={d.$key}
          onClick={this.handleChange.bind(this, i)}
          className={ optionClassName }
          dangerouslySetInnerHTML={{__html: d.$option}}
        />
      );
    });

    return (
      <div ref="container" onClick={this.showOptions} style={style} className={className}>
        <div className={classnames(styles.control, inputStyles.input)}>
        {
          result.length > 0 ?
            result :
            <span className={inputStyles.placeholder}>{msg || placeholder}&nbsp;</span>
        }
        </div>
        <Transition ref="options" act={active ? 'enter' : 'leave'} duration={166} tf="ease-out">
          <div style={{ display: 'none' }} className={styles.options}>
            {this.renderFilter()}
            <ul>{options}</ul>
          </div>
        </Transition>
      </div>
    );
  }
}

Select.displayName = 'Select';

Select.propTypes = {
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  filterAble: PropTypes.bool,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  groupBy: PropTypes.string,
  mult: PropTypes.bool,
  onChange: PropTypes.func,
  optionTpl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  responsive: PropTypes.string,
  resultTpl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  sep: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  valueTpl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  width: PropTypes.number
};

Select.defaultProps = {
  dropup: false,
  sep: ',',
  data: [],
  optionTpl: '{text}',
  valueTpl: '{id}'
};

module.exports = connect(
  register('select', {valueType: 'array'}),
  fetchEnhance
)(Select);

