'use strict';

import { Component } from 'react';
import refetch from 'refetch';
import isEqual from '../utils/isEqual';
import clone from '../utils/clone';

export const DATA_PENDING = 0;
export const DATA_SUCCESS = 1;
export const DATA_FAILURE = 2;

// handle response data
function dataPeer (res) {
  return res;
}

export function setDataPeer(fn) {
  dataPeer = fn;
}

export const dataSource = (ComposedComponent) => class extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this._isMounted = true;
    let { data, fetch } = this.props;
    if (data) {
      this.handleData(data);
    }
    if (fetch) {
      this.fetchData(fetch);
    }
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.handleData(nextProps.data);
    }
    if (!isEqual(this.props.fetch, nextProps.fetch)) {
      this.fetchData(nextProps.fetch);
    }
  }

  handleData (data) {
    // old dataSource api
    if (typeof data === 'function') {
      data.then((res) => {
        if (this._isMounted) {
          this.setState({ data: clone(res) });
        }
      })();
      this.setState({ data: undefined });
    } else {
      this.setState({ data: clone(data) });
    }
  }

  fetchData (fetch) {
    if (!fetch) {
      return;
    }

    this.setState({ fetchStatus: DATA_PENDING });

    if (typeof fetch === 'function') {
      fetch.then((data) => {
        this.setData(data);
      });
      return;
    }

    if (typeof fetch === 'string') {
      fetch = { url: fetch };
    }
    let { method='get', url, data, ...options } = fetch;
    let request = refetch[method](url, data, options);
    request.then(dataPeer.bind(request))
      .then((data) => {
        this.setData(data);
      })
      .catch((err) => {
        console.warn(err);
        this.setData(new Error());
      });
  }

  setData (data) {
    if (!this._isMounted) {
      return;
    }

    if (data instanceof Error) {
      this.setState({ fetchStatus: DATA_FAILURE });
    } else {
      this.setState({ data: clone(data), fetchStatus: DATA_SUCCESS });
    }
  }

  getValue () {
    return this.refs.component.getValue(...arguments);
  }

  // table function
  getChecked () {
    return this.refs.component.getChecked(...arguments);
  }

  render () {
    const { data, ...others } = this.props;
    return (
      <ComposedComponent ref="component" data={this.state.data} fetchStatus={this.state.fetchStatus} {...others} />
    );
  }
}
