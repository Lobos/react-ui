"use strict";

// 为了提高效率，直接操作了tree.state.data，
// 由于tree.state.data是一个array，当data值改变时，不经过setState，
// 所有的Item的data也因此改变，可能破坏了react的一个原则

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { toArray, substitute } from './utils/strings';
import { forEach, isEmpty } from './utils/objects';

import { requireCss } from './themes';
requireCss('tree');

class Tree extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: [],
      value: this.formatValue(this.props.value)
    };

    this.unmounted = false;
  }
  
  componentWillMount () {
    this.formatData(this.props.data);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
    if (nextProps.data !== this.props.data) {
      this.formatData(nextProps.data);
    }
  }

  componentWillUpdate (nextProps, nextState) {
    // initValue 和 initData 分开处理
    if (nextState.value !== this.state.value) {
      this.initValue(nextState.value);
    }
  }

  componentWillUnmount () {
    this.unmounted = true;
  }

  formatValue (value) {
    return toArray(value, this.props.sep);
  }

  getValue (sep) {
    let list = [],
        values = [],
        greedy = this.props.greedy;
    forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy);
    });

    list.forEach(function (d) {
      values.push(d.$value);
    });

    if (sep === undefined) {
      sep = this.props.sep;
    }
    if (sep) {
      values = values.join(this.props.sep);
    }
    return values;
  }

  setValue (value) {
    value = this.formatValue(value);
    this.setState({ value });
  }

  formatData (data) {
    if (typeof data === 'function') {
      data.then((res) => {
        this.formatData(res);
      })();
      return [];
    }
    let tt = this.props.textTpl;
    let vt = this.props.valueTpl;
    let setTpl = function (arr) {
      arr.forEach((d) => {
        d.$text = substitute(tt, d);
        d.$value = substitute(vt, d);
        if (d.children) {
          setTpl(d.children);
        }
      });
    };
    setTpl(data);
    this.init(data, this.state.value);
  }

  initValue (value) {
    this.init(this.state.data, value);
  }

  // 初始化数据，不在item里面判断，在元数据里加入deep和status，减少判断和item.setState次数
  init (data, values) {
    let getStatus = function (d, last, deep) {
      let val = d.$value,
          status,
          newDeep,
          nextDeep;
      if (deep === undefined) {
        newDeep = [];
        nextDeep = [last ? 0 : 1];
      } else {
        newDeep = deep.slice();
        if (!d.children || d.children.length === 0) {
          newDeep.push(last ? 2 : 1);
        }
        nextDeep = deep.slice();
        nextDeep.push(last ? 0 : 1);
      }
      if (d.children && d.children.length > 0) {
        let count = d.children.length;
        d.children.forEach((sub, i) => {
          let subStatus = getStatus(sub, i === (count - 1), nextDeep);
          if (status === undefined) {
            status = subStatus;
          } else if (status !== subStatus) {
            status = 1;
          }
        });
      } else {
        status = values.indexOf(val) >= 0 ? 2 : 0;
      }
      d.$status = status;
      d.$deep = newDeep;
      return status;
    };
    for (let i = 0, count = data.length; i < count; i++) {
      getStatus(data[i], i === (count - 1));
    }
    if (!this.unmounted) {
      this.setState({ data });
    }
  }

  isInitialed () {
    let data = this.state.data;
    if (data.length === 0) {
      return true;
    }
    return !!data[0].$deep;
  }

  toggleAll (open) {
    forEach(this.refs, function (ref) {
      ref.toggleAll(open);
    });
  }

  handleChange () {
    if (this.props.onChange) {
      //setTimeout(() => {
        this.props.onChange(this.getValue());
      //})
    }
  }

  onClick (item) {
    if (this.props.onClick) {
      this.props.onClick(item);
    }
  }

  render () {
    let value = this.state.value;
    let { selectAble, readOnly, open } = this.props;

    let items = this.state.data.map(function (item, i) {
      return (
        <Item ref={i}
          open={open}
          readOnly={readOnly}
          onClick={this.onClick.bind(this)}
          onStatusChange={this.handleChange.bind(this)}
          value={value}
          selectAble={selectAble}
          key={i}
          data={item}
        />
      );
    }, this);

    let className = classnames(
      this.props.className,
      'rct-tree',
      { readonly: this.props.readOnly }
    );

    return (
      <ul className={className}>{items}</ul>
    );
  }
}

Tree.propTypes = {
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]).isRequired,
  greedy: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  readOnly: PropTypes.bool,
  selectAble: PropTypes.bool,
  sep: PropTypes.string,
  src: PropTypes.string,
  textTpl: PropTypes.string,
  value: PropTypes.any,
  valueTpl: PropTypes.string
};

Tree.defaultProps = {
  sep: ',',
  textTpl: '{text}',
  valueTpl: '{id}'
};

class Item extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: this.props.open,
      status: this.props.data.$status || 0
    };
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({status: this.props.data.$status});
    }
  }

  toggle () {
    let open = !this.state.open;
    this.setState({open});
  }

  toggleAll (open) {
    this.setState({open});
    forEach(this.refs, function (ref) {
      ref.toggleAll(open);
    });
  }

  check () {
    if (this.props.readOnly) {
      return;
    }

    let status = this.state.status;
    status = status < 2 ? 2 : 0;
    this.setStatus(status);

    // setTimeout wait state changed
    setTimeout(function () {
      this.props.onStatusChange();
    }.bind(this), 0);
  }

  setStatus (status) {
    this.setState({ status });

    forEach(this.refs, function (ref) {
      ref.setStatus(status);
    });
  }

  getStatus () {
    return this.state.status;
  }

  onClick (data) {
    // check if event
    data = data.hasOwnProperty('_dispatchListeners') ? this.props.data : data;
    if (this.props.onClick) {
      this.props.onClick(data);
    }
  }

  updateStatus () {
    let status;
    for (let k in this.refs) {
      if (this.refs.hasOwnProperty(k)) {
        let s = this.refs[k].getStatus();
        if (status === undefined) {
          status = s;
          if (status === 1) {
            break;
          }
        } else if (s === 1 || s !== status) {
          status = 1;
          break;
        }
      }
    }
    this.setState({ status });
    this.props.onStatusChange();
  }

  getChecked (list, greedy) {
    let checked = greedy ? 1 : 2;
    if (this.state.status >= checked) {
      list.push(this.props.data);
    }
    forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy);
    });
  }

  render () {
    let children,
        handle,
        check,
        checkClass,
        type,
        marks = [];

    let { data, selectAble, readOnly, open, value } = this.props;

    if (data.children) {
      let items = data.children.map(function (item, i) {
        return (
          <Item ref={i}
            key={i}
            open={open}
            readOnly={readOnly}
            value={value}
            selectAble={selectAble}
            data={item}
            onClick={this.onClick.bind(this)}
            onStatusChange={this.updateStatus.bind(this)}
          />
        );
      }, this);

      children = <ul className={classnames({open: this.state.open})}>{items}</ul>;
      type = this.state.open ? 'folder-open' : 'folder';
      handle = (
        <a onClick={this.toggle.bind(this)} className="handle">
          <i className={'tree-icon ' + (this.state.open ? 'minus' : 'plus')} />
        </a>
      );
    } else {
      type = 'file';
    }

    if (selectAble) {
      check = ['square', 'half-check', 'check'][this.state.status];
      checkClass = classnames('check-handle', ['', 'half-checked', 'checked'][this.state.status]);
    }

    for (let i = 0, count = data.$deep.length; i < count; i++) {
      let d = data.$deep[i];
      let mc = classnames('marks', {
        'marks-h': d > 1 || (isEmpty(data.children) && count - 1 === i),
        'marks-v': d === 1,
        'marks-l': d === 2
      });
      marks.push(
        <span key={i} className={mc}>&nbsp;</span>
      );
    }
    return (
      <li>
        <label>
          {marks}
          {handle}
          <i className={'tree-icon ' + type} />
          {
            selectAble &&
            <a className={checkClass} onClick={this.check.bind(this)}><i className={'tree-icon ' + check} /></a>
          }
          <span onClick={this.onClick.bind(this)} className="text">{data.$text}</span>
        </label>
        {children}
      </li>
    );
  }
}

Item.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  onStatusChange: PropTypes.func,
  open: PropTypes.bool,
  readOnly: PropTypes.bool,
  selectAble: PropTypes.bool,
  value: PropTypes.any
};

import FormControl from './FormControl';
FormControl.register(

  'tree',

  function (props) {
    return <Tree {...props} />;
  },

  Tree,

  'array'
);

module.exports = Tree;
