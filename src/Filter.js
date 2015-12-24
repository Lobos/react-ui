'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';
import FilterItem from './FilterItem';
import clickAway from './higherorder/clickaway';

import { requireCss } from './themes';
requireCss('filter');

import {getLang, setLang} from './lang';
setLang('buttons');

class Filter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false,
      filters: []
    };
  }

  componentWillMount () {
    this.initData(this.props.options);
  }

  componentClickAway () {
    this.close();
  }

  initData (options) {
    options = options.map((d, i) => {
      d.optionsIndex = i;
      return d;
    });
    this.setState({ options });
  }

  onSearch () {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
  }

  open () {
    this.bindClickAway();
    let options = this.refs.options;
    options.style.display = 'block';
    setTimeout(() => {
      this.setState({ active: true });
    }, 0);
    setTimeout(() => {
      options.parentNode.style.overflow = 'visible';
    }, 450);
  }

  close () {
    let options = this.refs.options;
    options.parentNode.style.overflow = 'hidden';
    this.setState({ active: false });
    this.unbindClickAway();
    setTimeout(() => {
      options.style.display = 'none';
    }, 450);
  }

  addFilter () {
    let filters = this.state.filters;
    filters.push({});
    this.setState({ filters });
  }

  removeFilter (index) {
    let filters = this.state.filters;
    filters.splice(index, 1);
    this.setState({ filters });
  }

  clearFilter () {
    this.setState({ filters: [], resultText: '' });
    this.close();
    if (this.props.onFilter) {
      this.props.onFilter([]);
    }
  }

  onChange (index, filter) {
    let filters = this.state.filters,
        f = filters[index];
    Object.keys(filter).forEach((k) => {
      f[k] = filter[k];
    });
    this.setState({ filters });
  }

  onFilter () {
    this.close();
    let filters = this.state.filters,
        local = this.props.local;
    this.setState({ resultText: this.formatText(filters) });
    if (this.props.onFilter) {
      let novs = [];
      filters.forEach((f, i) => {
        if (f.op && f.value) {
          let nov = { name: f.name, op: f.op, value: f.value };
          if (local) {
            nov.func = this.refs[`fi${i}`].getFunc();
          }
          novs.push(nov);
        }
      });
      this.props.onFilter(novs);
    }
  }

  formatText (filters) {
    let text = [];
    filters.forEach((f) => {
      if (f.op && f.value) {
        text.push(`${f.label} ${f.op} '${f.value}'`);
      }
    });
    return text.join(', ');
  }

  renderFilters () {
    let filters = this.state.filters.map((f, i) => {
      return (
        <FilterItem onChange={this.onChange.bind(this)} removeFilter={this.removeFilter.bind(this)} ref={`fi${i}`} index={i} key={i} {...f} options={this.state.options} />
      );
    });
    return filters;
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-filter',
      'rct-form-control',
      this.state.active ? 'active' : ''
    );
    return (
      <div style={this.props.style} className={className}>
        <div onClick={this.open.bind(this)} className="rct-filter-result">
          {this.state.resultText}
          <i className="search" />
        </div>

        <div className="rct-filter-options-wrap">
          <div ref="options" className="rct-filter-options">

            {this.renderFilters()}

            <div>
              <Button status="success" onClick={this.addFilter.bind(this)}>+</Button>
              <Button style={{marginLeft: 10}} onClick={this.clearFilter.bind(this)}>{getLang('buttons.clear')}</Button>
              <Button style={{marginLeft: 10}} status="primary" onClick={this.onFilter.bind(this)}>{getLang('buttons.ok')}</Button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  className: PropTypes.string,
  local: PropTypes.bool,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
  options: PropTypes.array,
  style: PropTypes.object,
  type: PropTypes.string
};

Filter.defaultProps = {
  options: []
};

module.exports = clickAway(Filter);
