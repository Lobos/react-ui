'use strict';

import { Component, PropTypes } from 'react';
import refetch from 'refetch';
import { deepEqual } from '../utils/objects';
import clone from '../utils/clone';

export const DATA_PENDING = 0;
export const DATA_SUCCESS = 1;
export const DATA_FAILURE = 2;

// handle response data
function peerData (res) {
  return res;
}

export function setPeer(fn) {
  peerData = fn;
}

export const fetchEnhance = (ComposedComponent) => {
  class Fetch extends Component {
    constructor (props) {
      super(props);

      this.state = {
        data: undefined
      }
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

    componentWillReceiveProps (nextProps) {
      if (!deepEqual(this.props.data, nextProps.data)) {
        this.handleData(nextProps.data);
      }
      if (!deepEqual(this.props.fetch, nextProps.fetch)) {
        this.fetchData(nextProps.fetch);
      }
    }

    componentWillUnmount () {
      this._isMounted = false;
    }

    componentDidMount () {
      let component = this.component;
      Object.keys(component).forEach((key) => {
        if (!this.hasOwnProperty(key)) {
          let func = component[key];
          if (typeof func === 'function') {
            this[key] = func;
          }
        }
      });
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
      request.then(peerData.bind(request))
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

    render () {
      const { data, ...others } = this.props;
      return (
        <ComposedComponent ref={(c) => this.component = c} data={this.state.data} fetchStatus={this.state.fetchStatus} {...others} />
      );
    }
  }

  Fetch.propTypes = {
    data: PropTypes.any,
    fetch: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ])
  };

  return Fetch;
}
