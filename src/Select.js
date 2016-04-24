'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { toArray, substitute } from './utils/strings';
import { getOuterHeight, overView, withoutTransition } from './utils/dom';
import { deepEqual, hashcode } from './utils/objects';
import ClickAway from './mixins/ClickAway';
import { getGrid } from './utils/grids';
import { fetchEnhance, FETCH_SUCCESS } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';
import { getLang } from './lang';

import { requireCss } from './themes';
requireCss('select');
requireCss('form-control');

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
    let target = this.props.mult ? undefined : this.refs.options;
    this.registerClickAway(this.hideOptions, target);
  }

  showOptions () {
    if (this.state.active || this.props.readOnly) {
      return;
    }

    let options = this.refs.options;
    options.style.display = 'block';
    let offset = getOuterHeight(options) + 5;

    let el = this.refs.container;
    let dropup = overView(el, offset);

    withoutTransition(el, () => {
      this.setState({ dropup });
    });

    this.bindClickAway();

    setTimeout(() => {
      this.setState({ filter: '', active: true });
    }, 0);
  }

  hideOptions () {
    this.setState({ active: false });
    this.unbindClickAway();
    // use setTimeout instead of transitionEnd
    setTimeout(() => {
      if (this.state.active === false) {
        this.refs.options.style.display = 'none';
      }
    }, 500);
  }

  getValue (sep=this.props.sep, data=this.state.data) {
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
      d.$result = substitute(this.props.resultTpl || this.props.optionTpl, d);
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
        if (typeof d !== 'string') {
          d.$checked = index === i ? true : false;
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

  renderFilter () {
    if (this.props.filterAble) {
      return (
        <div className="filter">
          <i className="search" />
          <input value={this.state.filter}
            onChange={ (e) => this.setState({ filter: e.target.value }) }
            type="text" />
        </div>
      );
    }
  }

  render () {
    let { className, fetchStatus, grid, readOnly, mult, placeholder, style } = this.props;
    let { filter, active, msg, data } = this.state;
    let result = [];
 
    className = classnames(
      className,
      getGrid(grid),
      'rct-form-control',
      'rct-select',
      {
        active,
        readonly: readOnly,
        dropup: this.state.dropup,
        single: !mult
      }
    );
   
    // if get remote data pending or failure, render message
    if (fetchStatus !== FETCH_SUCCESS) {
      return <div className={className}>{getLang('fetch.status')[fetchStatus]}</div>;
    }

    let filterText = filter ? filter.toLowerCase() : null;

    let options = data.map((d, i) => {
      if (typeof d === 'string') {
        return <span key={`g-${d}`} className="show group">{d}</span>;
      }

      if (d.$checked) {
        if (mult) {
          result.push(
            <div key={d.$key} className="rct-select-result"
              onClick={this.handleRemove.bind(this, i)}
              dangerouslySetInnerHTML={{__html: d.$result}}
            />
          );
        } else {
          result.push(<span key={d.$key} dangerouslySetInnerHTML={{__html: d.$result}} />);
        }
      }

      let optionClassName = classnames({
        active: d.$checked,
        show: filterText ? d.$filter.indexOf(filterText) >= 0 : true
      });
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
        { result.length > 0 ? result : <span className="placeholder">{msg || placeholder}&nbsp;</span> }
        <div className="rct-select-options-wrap">
          <hr />
          <div ref="options" className="rct-select-options">
            {this.renderFilter()}
            <ul>{options}</ul>
          </div>
        </div>
      </div>
    );
  }
}

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

Select = fetchEnhance(Select);

module.exports = register(Select, 'select', {valueType: 'array'});

