'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { forEach, isEmpty } from '../utils/objects';

class Item extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: props.open,
      status: props.data.$status || 0
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

  renderCheckbox () {
    let { selectAble } = this.props;
    if (!selectAble) {
      return;
    }

    let { status } = this.state;
    let check = ['unchecked', 'half-checked', 'checked'][status];
    let className = classnames(
      'check-handle',
      ['', 'half-checked', 'checked'][status]
    );

    return (
      <a className={className} onClick={this.check}>
        <i className={'tree-icon ' + check} />
      </a>
    );
  }

  renderMarks () {
    let className;
    let { $deep, children } = this.props.data;
    let noChild = isEmpty(children);
    let count = $deep.length;

    return $deep.map((deep, i) => {
      className = classnames('marks', {
        'marks-h': deep > 1 || (noChild && count - 1 === i),
        'marks-v': deep === 1,
        'marks-l': deep === 2
      });
      return <span key={i} className={className}>&nbsp;</span>;
    });
  }

  render () {
    let { data, selectAble, readOnly, open, value, icons } = this.props;

    let children,
        handle,
        icon;

    if (data.children) {
      let items = data.children.map(function (item, i) {
        return (
          <Item ref={i}
            key={item.$key}
            icons={icons}
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
      icon = this.state.open ? icons[1] : icons[0];
      handle = (
        <a onClick={this.toggle} className="handle">
          <i className={'tree-icon ' + (this.state.open ? 'minus' : 'plus')} />
        </a>
      );
    } else {
      icon = icons[2];
    }

    return (
      <li>
        <label>
          {this.renderMarks()}
          {handle}
          {icon}
          {this.renderCheckbox()}
          <span onClick={this.onClick} className="text">{data.$text}</span>
        </label>
        {children}
      </li>
    );
  }
}

Item.propTypes = {
  data: PropTypes.object,
  icons: PropTypes.array,
  onClick: PropTypes.func,
  onStatusChange: PropTypes.func,
  open: PropTypes.bool,
  readOnly: PropTypes.bool,
  selectAble: PropTypes.bool,
  value: PropTypes.any
};

module.exports = Item;
