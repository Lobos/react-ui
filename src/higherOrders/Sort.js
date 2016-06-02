'use strict';

import React from 'react';
import PropTypes from '../utils/proptypes';

export function sortable (Component) {
  class Sort extends React.Component {
    constructor (props) {
      super(props);

      this.state = {};
      this.handleSort = this.handleSort.bind(this);
    }

    handleSort (key, asc) {
      this.setState({ key, asc });
      this.props.onSort && this.props.onSort(key, asc);
    }

    sort (data, key, asc) {
      return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (asc) {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        } else {
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
      });
    }

    render () {
      const { key, asc } = this.state;
      const { data, ...props } = this.props;

      let sortData = key ? this.sort(data, key, asc) : data;

      return <Component {...props} onSort={this.handleSort} data={sortData} />;
    }
  }

  Sort.propTypes = {
    data: PropTypes.array,
    onSort: PropTypes.func
  };

  return Sort;
}

