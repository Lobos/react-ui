'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TableHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      asc: 0
    };
  }

  onSort () {
    let asc = this.state.asc === 0 ? 1 : 0;
    this.setState({ asc });
    this.props.onSort(this.props.name, asc);
  }

  render () {
    let sort = [],
        onSort = null,
        style = {};

    if (this.props.sortAble) {
      sort.push(<i key="up" className={classnames('arrow-up', {active: this.props.name === this.props.sort.name && this.state.asc === 1})} />);
      sort.push(<i key="down" className={classnames('arrow-down', {active: this.props.name === this.props.sort.name && this.state.asc === 0})} />);

      onSort = this.onSort.bind(this);
      style = { cursor: 'pointer' };
    }

    return (
      <th style={style} onClick={onSort}>
        {this.props.header}
        {sort}
      </th>
    );
  }
}

TableHeader.propTypes = {
  content: PropTypes.any,
  header: PropTypes.any,
  hidden: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onSort: PropTypes.func,
  sort: PropTypes.object,
  sortAble: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

TableHeader.defaultProps = {
  hidden: false
};

module.exports = TableHeader;
