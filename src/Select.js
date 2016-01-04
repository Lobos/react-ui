'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { toArray, substitute } from './utils/strings';
import { getOuterHeight, overView, withoutTransition } from './utils/dom';
import clone from './utils/clone';
import isEqual from './utils/isEqual';
import clickAway from './higherorder/clickaway';
import { getGrid } from './utils/grids';

import { requireCss } from './themes';
requireCss('select');
requireCss('form-control');

class Select extends Component {
  constructor (props) {
    super(props);
    this.unmounted = false;

    let values = toArray(this.props.value, this.props.sep);
    let data = this.formatData(this.props.data, values);
    this.state = {
      active: false,
      data,
      filter: '',
      value: values
    };
  }
  
  componentWillMount () {
    //let values = toArray(this.props.value, this.props.sep);
    //let data = this.formatData(this.props.data, values);
    //this.setState({ data });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
    if (!isEqual(nextProps.data, this.props.data)) {
      this.setState({ data: this.formatData(nextProps.data) });
    }
  }

  componentWillUnmount () {
    this.unmounted = true;
  }

  componentClickAway () {
    this.close();
  }

  open () {
    if (!this.state.active && !this.props.readOnly) {
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
  }

  close () {
    this.setState({ active: false });
    this.unbindClickAway();
    // use setTimeout instead of transitionEnd
    setTimeout(() => {
      if (this.state.active === false) {
        this.refs.options.style.display = 'none';
      }
    }, 500);
  }

  getValue (sep = this.props.sep, data = this.state.data) {
    let value = [];
    data.forEach((d) => {
      if (d.$checked) {
        value.push(d.$value);
      }
    });

    if (sep) {
      value = value.join(sep);
    }

    return value;
  }

  setValue (value) {
    value = toArray(value, this.props.sep);
    if (this.state) {
      //let data = clone(this.state.data).map(d => {
      let data = this.state.data.map((d) => {
        d.$checked = value.indexOf(d.$value) >= 0;
        return d;
      });
      this.setState({ value, data });
    } else {
      this.setState({ value });
    }
  }

  formatData (data, value = this.state.value) {
    if (typeof data === 'function') {
      data.then((res) => {
        if (!this.unmounted) {
          this.setState({ data: this.formatData(res) });
        }
      })();
      return [];
    }

    // don't use data, clone
    data = clone(data).map((d) => {
      if (typeof d !== 'object') {
        return {
          $option: d,
          $result: d,
          $value: d,
          $filter: d.toLowerCase(),
          $checked: value.indexOf(d) >= 0
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
      this.setState({ data });
    } else {
      data.map((d) => {
        if (typeof d !== 'string') {
          d.$checked = false;
        }
      });
      data[i].$checked = true;
      this.setState({ data });
      this.close();
    }
    if (this.props.onChange) {
      let value = this.getValue(this.props.sep, data);
      setTimeout(() => {
        this.props.onChange(value);
      }, 0);
    }
  }

  handleRemove (i) {
    // wait checkClickAway completed
    setTimeout(() => {
      this.handleChange(i);
    }, 0);
  }

  render () {
    let active = this.state.active;
    let result = [];
    let { grid, readOnly, mult, placeholder, style } = this.props;

    let className = classnames(
      this.props.className,
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

    let filter;
    if (this.props.filterAble) {
      filter = (
        <div className="filter">
          <i className="search" />
          <input value={this.state.filter}
            onChange={ (e) => this.setState({ filter: e.target.value }) }
            type="text" />
        </div>
      );
    }

    let filterText = this.state.filter ?
                     this.state.filter.toLowerCase() :
                     null;

    let options = this.state.data.map((d, i) => {
      if (typeof d === 'string') {
        return <span key={i} className="show group">{d}</span>;
      }

      if (d.$checked) {
        if (this.props.mult) {
          result.push(
            <div key={i} className="rct-select-result"
              onClick={this.handleRemove.bind(this, i)}
              dangerouslySetInnerHTML={{__html: d.$result}}
            />
          );
        } else {
          result.push(<span key={i} dangerouslySetInnerHTML={{__html: d.$result}} />);
        }
      }
      let optionClassName = classnames({
        active: d.$checked,
        show: filterText ? d.$filter.indexOf(filterText) >= 0 : true
      });
      return (
        <li key={i}
          onClick={this.handleChange.bind(this, i)}
          className={ optionClassName }
          dangerouslySetInnerHTML={{__html: d.$option}}
        />
      );
    });

    return (
      <div ref="container" onClick={this.open.bind(this)} style={style} className={className}>
        { result.length > 0 ? result : <span className="placeholder">{this.state.msg || placeholder}&nbsp;</span> }
        <div className="rct-select-options-wrap">
          <hr />
          <div ref="options" className="rct-select-options">
            {filter}
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
    PropTypes.func
  ]).isRequired,
  filterAble: PropTypes.bool,
  grid: PropTypes.object,
  groupBy: PropTypes.string,
  mult: PropTypes.bool,
  onChange: PropTypes.func,
  optionTpl: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  responsive: PropTypes.string,
  resultTpl: PropTypes.string,
  sep: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  valueTpl: PropTypes.string,
  width: PropTypes.number
};

Select.defaultProps = {
  dropup: false,
  sep: ',',
  optionTpl: '{text}',
  valueTpl: '{id}'
};

Select = clickAway(Select);

import FormControl from './FormControl';
FormControl.register(

  'select',

  function (props) {
    return <Select {...props} />;
  },

  Select,

  'array'
);

module.exports = Select;
