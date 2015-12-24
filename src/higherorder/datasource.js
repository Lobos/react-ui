/*
'use strict';

import React, { PropTypes } from 'react';

export const DATA_PENDING = 0;
export const DATA_SUCCESS = 1;
export const DATA_FAILURE = 2;

export default function dataSource(Component) {
  class DataSource extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        data: this.props.data,
        fetchStatus: this.props.data ? DATA_SUCCESS : DATA_PENDING
      };
    }

    componentWillMount () {
      if (this.props.fetch) {
        this.fetchData(this.props.fetch);
      }
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.data !== nextProps.data) {
        this.setState({ data: nextProps.data });
      }
      if (this.props.fetch !== nextProps.fetch) {
        this.fetchData(nextProps.fetch);
      }
    }

    fetchData (config) {
      console.log(config);
    }

    render () {
      const { data, children, ...others } = this.props;
      return (
        <Component data={this.state.data} {...others}>{children}</Component>
      );
    }
  };

  DataSource.propTypes = {
    children: PropTypes.any,
    data: PropTypes.any,
    fetch: PropTypes.object
  };

  return DataSource;
}
*/
