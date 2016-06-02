'use strict'

import React, { Component, PropTypes } from 'react'
import Refetch from 'refetch'
import classnames from 'classnames'
import { deepEqual } from '../utils/objects'
import clone from '../utils/clone'

import { setLang, getLang } from '../lang'
setLang('fetch')

import FormStyles from '../styles/_form.scss'

export const FETCH_PENDING = 'pending'
export const FETCH_SUCCESS = 'success'
export const FETCH_FAILURE = 'failure'

export const fetchable = (ComposedComponent) => {
  class Fetch extends Component {
    constructor (props) {
      super(props)

      this.state = {
        data: undefined,
        fetchStatus: FETCH_SUCCESS,
        error: ''
      }

      this.bindElement = this.bindElement.bind(this)
    }

    componentWillMount () {
      this._isMounted = true
      let { data, fetch } = this.props
      if (data) {
        this.handleData(data)
      } else if (fetch) {
        this.fetchData(fetch)
      }
    }

    componentWillReceiveProps (nextProps) {
      if (!deepEqual(this.props.data, nextProps.data)) {
        this.handleData(nextProps.data)
      }
      if (!deepEqual(this.props.fetch, nextProps.fetch)) {
        this.fetchData(nextProps.fetch)
      }
    }

    componentWillUnmount () {
      this._isMounted = false
    }

    handleData (data) {
      // old dataSource api
      if (typeof data === 'function') {
        this.setState({ data: undefined, fetchStatus: FETCH_PENDING })
        data.then((res) => {
          if (this._isMounted) {
            this.setState({ data: clone(res) })
          }
        })()
      } else {
        this.setState({ data: clone(data), fetchStatus: FETCH_SUCCESS })
      }
    }

    fetchData (fetch) {
      if (!fetch) {
        return
      }

      this.setState({ fetchStatus: FETCH_PENDING })

      if (typeof fetch === 'function') {
        fetch.then((data) => {
          this.setData(data)
        })
        return
      }

      if (typeof fetch === 'string') {
        fetch = { url: fetch }
      }
      let { method = 'get', url, data, then, request, ...options } = fetch
      if (!request) {
        request = Refetch
      }
      request = request[method](url, data, options)

      // handle response
      if (then) { request = request.then(then) }
      request.then((data) => {
        this.setData(data)
      })
      .catch((err) => {
        console.warn(err)
        this.setData(new Error())
      })
    }

    setData (data) {
      if (!this._isMounted) {
        return
      }

      if (data instanceof Error) {
        this.setState({ fetchStatus: FETCH_FAILURE, error: data.message })
      } else {
        this.setState({ data: clone(data), fetchStatus: FETCH_SUCCESS, error: null })
      }
    }

    bindElement (ref) {
      this.component = ref
    }

    render () {
      const { fetchStatus, error } = this.state
      if (fetchStatus === FETCH_SUCCESS) {
        return (
          <ComposedComponent {...this.props} ref={this.bindElement} data={this.state.data} fetchStatus={this.state.fetchStatus} />
        )
      } else {
        let className = classnames(fetchStatus === FETCH_FAILURE && FormStyles.errorText)
        return (
          <span className={className}>
            {error || getLang('fetch.status')[fetchStatus]}
          </span>
        )
      }
    }
  }

  Fetch.propTypes = {
    data: PropTypes.any,
    fetch: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ])
  }

  return Fetch
}
