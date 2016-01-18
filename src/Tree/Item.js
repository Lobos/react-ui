'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { forEach, isEmpty } from '../utils/objects';

class Item extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: this.props.open,
      status: this.props.data.$status || 0
    };

    this.onClick = this.onClick.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.toggle = this.toggle.bind(this);
    this.check = this.check.bind(this);
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
    setTimeout(() => {
      this.props.onStatusChange();
    }, 0);
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
            onClick={this.onClick}
            onStatusChange={this.updateStatus}
          />
        );
      }, this);

      children = <ul className={classnames({open: this.state.open})}>{items}</ul>;
      type = this.state.open ? 'folder-open' : 'folder';
      handle = (
        <a onClick={this.toggle} className="handle">
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
            <a className={checkClass} onClick={this.check}><i className={'tree-icon ' + check} /></a>
          }
          <span onClick={this.onClick} className="text">{data.$text}</span>
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

module.exports = Item;
