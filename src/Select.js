'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { toArray, substitute } from './utils/strings';
import { getOuterHeight, getLineHeight, overView, withoutTransition } from './utils/dom';
import { deepEqual, hashcode } from './utils/objects';
import ClickAway from './mixins/ClickAway';
import { getGrid } from './utils/grids';
import { fetchEnhance } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';
import { compose } from './utils/compose';
import Transition from './Transition';
import * as Events from './utils/events';

import styles from './styles/_select.scss';
import inputStyles from './styles/_input.scss';

class Select extends ClickAway(Component) {
  constructor (props) {
    super(props);

    this.state = {
      active: false,
      scrollTop: 0,
      filter: '',
    };

    // cache, store selected status
    this.data = [];
    this._optionHeight = 0;

    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleOptionsScroll = this.handleOptionsScroll.bind(this);
  }

  componentWillUnmount () {
    this.toggleScroll('off');
    super.componentWillUnmount();
  }

  componentDidMount () {
    this.options = findDOMNode(this.refs.options);
    const target = this.props.mult ? undefined : this.options;
    this.registerClickAway(this.hideOptions, target);
    setTimeout(() => {
      this._optionHeight = this.options.querySelector('ul li').clientHeight;
      const wrap = this.refs.optionsWrap;
      wrap.querySelector('ul').style.height =
        (this._optionHeight * this.data.length) + 'px';
      this.toggleScroll('on');
    }, 0)
  }

  toggleScroll (sw) {
    Events[sw](this.refs.optionsWrap, 'scroll', this.handleOptionsScroll);
  }

  handleOptionsScroll (e) {
    let lastScroll = this.state.scrollTop;
    let scrollTop = e.target.scrollTop;
    if (Math.abs(scrollTop - lastScroll) < (this._optionHeight * this.props.maxShowCount / 3)) {
      return;
    }
    this.toggleScroll('off');
    this.setState({ scrollTop }, () => {
      this.toggleScroll('on');
    });
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
    let values = [],
        raw = [];
    data.forEach((d) => {
      if (d.$selected) {
        values.push(d.$value);
        raw.push(d);
      }
    });

    let value = values;
    if (sep && typeof sep === 'string') {
      value = values.join(sep);
    } else if (typeof sep === 'function') {
      value = sep(raw);
    }

    return value;
  }

  formatData (data) {
    let values = toArray(this.props.value, this.props.mult && this.props.sep);

    if (!Array.isArray(data)) {
      data = Object.keys(data).map((key) => {
        return { text: data[key], id: key };
      });
    }

    const { filterAble, valueTpl, optionTpl, resultTpl, groupBy } = this.props;
    let noResultTpl = !resultTpl;

    data = data.map((d) => {
      if (typeof d !== 'object') {
        d = typeof d === 'string' ? d : d.toString();
        return {
          $option: d,
          $result: d,
          $value: d,
          $filter: d.toLowerCase(),
          $selected: values.indexOf(d) >= 0,
          $key: hashcode(d)
        };
      }

      // speed filter
      if (filterAble) {
        d.$filter = (Object.keys(d).map((k) => d[k])).join(',').toLowerCase();
      }

      let val = substitute(valueTpl, d);
      d.$option = substitute(optionTpl, d);
      d.$result = noResultTpl ? d.$option : substitute(this.props.resultTpl, d);
      d.$value = val;
      d.$selected = values.indexOf(val) >= 0;
      d.$key = d.id ? d.id : hashcode(val + d.$option);
      return d;
    });

    if (groupBy) {
      let groups = {};
      data.forEach((d) => {
        let key = d[groupBy];
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(d);
      });
      data = [];
      Object.keys(groups).forEach((k) => {
        data.push({ $group: k });
        data = data.concat(groups[k]);
      });
    }

    this.data = data;
    return data;
  }

  handleChange (i) {
    if (this.props.readOnly) {
      return;
    }

    let data = this.data;
    if (this.props.mult) {
      data[i].$selected = !data[i].$selected;
    } else {
      data.map((d, index) => {
        if (typeof d === 'object') {
          d.$selected = index === i;
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
    if (!this.state.active) {
      return;
    }
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
    let { className, grid, readOnly, maxShowCount, data, mult, placeholder, style } = this.props;
    let { filter, active, msg, dropup, scrollTop } = this.state;
    let result = [];

    data = this.formatData(data);
 
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
    let showCount = data.length;
    let scrolledOptCount = this._optionHeight > 0 ?
      Math.floor(scrollTop / this._optionHeight - maxShowCount / 3) : 0;
    if (scrolledOptCount < 0) {
      scrolledOptCount = 0;
    }

    let options = data.map((d, i) => {
      d.$index = i;

      if (d.$selected) {
        if (mult) {
          result.push(
            <div key={d.$key} className={styles.result}
              onClick={this.handleRemove.bind(this, d.$index)}>
              <span dangerouslySetInnerHTML={{__html: d.$result}} />
              <a href="javascript:;">&times;</a>
            </div>
          );
        } else {
          result.push(
            <span key={d.$key} dangerouslySetInnerHTML={{__html: d.$result}} />
          );
        }
      }

      return d;
    });
    
    // filter by search text
    if (filterText) {
      options = options.filter((d) => {
        return !d.$filter || d.$filter.indexOf(filterText) > 0;
      });
      showCount = options.length;
    }
  
    // limit show options
    if (options.length > maxShowCount) {
      let showedCount = 0;
      options = options.filter((d, i) => {
        if (showedCount >= maxShowCount || i < scrolledOptCount) {
          return false;
        }

        showedCount++;
        return true;
      });
    }

    options = options.map((d, i) => {
      let optionClass = classnames(
        styles.option,
        d.$selected && styles.active
      );

      let groupClass = styles.group;

      let optionStyle = {};
      if (showCount > maxShowCount && this._optionHeight > 0) {
        optionClass += ' ' + styles.absolute;
        groupClass += ' ' + styles.absolute;
        optionStyle.top = this._optionHeight * (i + scrolledOptCount);
      }

      if (d.$group) {
        return (
          <span key={`g-${d.$group}`} style={optionStyle} className={groupClass}>
            {d.$group}
          </span>
        );
      } else {
        return (
          <li key={d.$key} style={optionStyle}
            onClick={this.handleChange.bind(this, d.$index)}
            className={ optionClass }
            dangerouslySetInnerHTML={{__html: d.$option}}
          />
        );
      }
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
            <div ref="optionsWrap" className={styles.optionsWrap}>
              <ul style={{height: this._optionHeight * showCount}}>{options}</ul>
            </div>
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
  maxShowCount: PropTypes.number,
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
  maxShowCount: 30,
  sep: ',',
  optionTpl: '{text}',
  valueTpl: '{id}'
};

module.exports = compose(
  register('select', {valueType: 'array'}),
  fetchEnhance
)(Select);

