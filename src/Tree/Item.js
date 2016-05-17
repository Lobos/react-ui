'use strict';

import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { forEach, isEmpty, deepEqual } from '../utils/objects';
import { addClass } from '../utils/dom';
import { Checkbox } from '../Checkbox';
import pureRenderMixin from '../mixins/PureRender';

import TreeStyles from '../styles/_tree.scss';

class Item extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: props.open,
      status: props.data.$status || 0
    };

    this.updateStatus = this.updateStatus.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(nextProps.value, this.props.value)) {
      this.setState({status: nextProps.data.$status});
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

  handleCheck () {
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

  handleClick (data) {
    // check if event
    let isEvent = data.hasOwnProperty('_dispatchListeners');
    if (isEvent) {
      data = this.props.data;
    }

    this.props.onClick(data);
    if (isEvent) {
      addClass(findDOMNode(this).querySelector('div'), TreeStyles.active);
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
    let checked = (greedy === true || greedy === 'true') ? 1 : 2;
    if (this.state.status >= checked) {
      list.push(this.props.data);
      if (greedy === 'never') {
        return;
      }
    }
    forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy);
    });
  }

  renderCheckbox () {
    let { selectAble, readOnly } = this.props;
    if (!selectAble) {
      return;
    }

    let { status } = this.state;

    return (
      <Checkbox onChange={this.handleCheck}
        checked={status === 2}
        indeterminate={status === 1}
        isIndicator
        readOnly={readOnly} />
    );
  }

  renderMarks () {
    let className;
    let { $deep, children } = this.props.data;
    let noChild = isEmpty(children);
    let count = $deep.length;

    return $deep.map((deep, i) => {
      let mark;
      if (deep === 2) {
        mark = TreeStyles.ml;
      } else if (noChild && count - 1 === i) {
        mark = TreeStyles.mh;
      } else if (deep === 1) {
        mark = TreeStyles.mv;
      }

      className = classnames(TreeStyles.marks, mark);
      return <span key={i} className={className}>&nbsp;</span>;
    });
  }

  render () {
    let { data, selectAble, readOnly, value, icons } = this.props;

    let open = this.state.open;
    let children,
        handle,
        icon;

    if (data.children) {
      let items = data.children.map(function (item, i) {
        return (
          <Item ref={i}
            key={item.$key}
            icons={icons}
            open={this.props.open}
            readOnly={readOnly}
            value={value}
            selectAble={selectAble}
            data={item}
            onClick={this.handleClick}
            onStatusChange={this.updateStatus}
          />
        );
      }, this);

      children = <ul className={classnames(open && TreeStyles.open)}>{items}</ul>;
      icon = open ? icons[1] : icons[0];
      handle = (
        <a onClick={this.toggle} className={TreeStyles.handle}>
          <i className={classnames(TreeStyles.icon, open ? TreeStyles.minus : TreeStyles.plus)} />
        </a>
      );
    } else {
      icon = icons[2];
    }

    return (
      <li>
        <div className={TreeStyles.label}>
          {this.renderMarks()}
          {handle}
          {icon && <span className={TreeStyles.handle}>{icon}</span>}
          {this.renderCheckbox()}
          <span onClick={this.handleClick} className={TreeStyles.text}>{data.$text}</span>
        </div>
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

module.exports = pureRenderMixin(Item);
