'use strict';

import React, { PropTypes } from 'react';

export const DATA_PENDING = 0;
export const DATA_SUCCESS = 1;
export const DATA_FAILURE = 2;

export default function dataSource(Component) {
  return class DataSource extends React.Component {
    static displayName = 'DataSource'

    static propTypes = {
      children: PropTypes.any,
      data: PropTypes.any,
      fetch: PropTypes.object
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

    static defaultState = {
      data: this.props.data,
      fetchStatus: this.props.data ? DATA_SUCCESS : DATA_PENDING
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
}
