'use strict';

import React, { Component, PropTypes } from 'react';
import refetch from 'refetch';
import { deepEqual } from '../utils/objects';
import clone from '../utils/clone';

import { setLang } from '../lang';
setLang('fetch');

export const FETCH_PENDING = 'pending';
export const FETCH_SUCCESS = 'success';
export const FETCH_FAILURE = 'failure';

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
        data: undefined,
        fetchStatus: FETCH_SUCCESS
      }

      this.getSelected = this.getSelected.bind(this)
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

    handleData (data) {
      // old dataSource api
      if (typeof data === 'function') {
        this.setState({ data: undefined, fetchStatus: FETCH_PENDING });
        data.then((res) => {
          if (this._isMounted) {
            this.setState({ data: clone(res) });
          }
        })();
      } else {
        this.setState({ data: clone(data), fetchStatus: FETCH_SUCCESS });
      }
    }

    getSelected () {
      return this.component.getSelected(...arguments);
    }

    fetchData (fetch) {
      if (!fetch) {
        return;
      }

      this.setState({ fetchStatus: FETCH_PENDING });

      if (typeof fetch === 'function') {
        fetch.then((data) => {
          this.setData(data);
        });
        return;
      }

      if (typeof fetch === 'string') {
        fetch = { url: fetch };
      }
      let { method='get', url, data, then, ...options } = fetch;
      let request = refetch[method](url, data, options).then(peerData.bind(request));

      // handle response
      if (then) { request = request.then(then); }
      request.then((data) => {
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
        this.setState({ fetchStatus: FETCH_FAILURE });
      } else {
        this.setState({ data: clone(data), fetchStatus: FETCH_SUCCESS });
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
