'use strict';

import React from 'react';
import { objectAssign } from '../utils/objects';
import PropTypes from '../utils/proptypes';

export function pagible (Component) {
  class Pagination extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        page: 1
      };
    }

    getData (pagination) {
      let data = this.props.data;

      if (pagination) {
        const { page, size } = pagination;
        data = data.slice((page - 1) * size, page * size);
      }

      return data;
    }

    getPagination (pagination) {
      if (!pagination) return;

      let props = objectAssign(
        {
          page: this.state.page,
          size: 20,
          position: 'center',
          total: this.props.data.length
        },
        pagination.props || pagination
      );

      let onChange = props.onChange;
      props.onChange = (page) => {
        if (typeof onChange === 'function') {
          onChange(page);
        } else {
          this.setState({ page });
        }
      };

      return props;
    }

    render () {
      const { pagination, ...props } = this.props;
      let pagi = this.getPagination(pagination);

      return (
        <Component {...props}
          data={this.getData(pagi)}
          pagination={pagi}
        />
      );
    }
  }

  Pagination.propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.element_object
  };

  return Pagination;
}
