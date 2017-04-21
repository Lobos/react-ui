import React, { Component, isValidElement } from 'react'
import PropTypes from '../utils/proptypes'
import Refetch from 'refetch'
import classnames from 'classnames'
import curry from 'curry'
import { deepEqual, shallowEqual } from '../utils/objects'
import clone from '../utils/clone'

import { getLang } from '../lang'

import FormStyles from '../styles/_form.scss'

export const FETCH_PENDING = 'pending'
export const FETCH_SUCCESS = 'success'
export const FETCH_FAILURE = 'failure'

export default curry((handleError, ComposedComponent) => {
  class Fetch extends Component {
    constructor (props) {
      super(props)

      this.state = {
        data: undefined,
        fetchStatus: FETCH_SUCCESS,
        error: ''
      }

      this.getSelected = this.getSelected.bind(this)
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

    shouldComponentUpdate (nextProps, nextState) {
      if (!deepEqual(this.props.fetch, nextProps.fetch)) return true

      if (!shallowEqual(this.props.data, nextProps.data) ||
          !shallowEqual(nextState.data, this.state.data)) return true

      return !shallowEqual(this.props, nextProps) || !shallowEqual(nextState, this.state)
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
      } else if (isValidElement(data)) {
        this.setState({ data, fetchStatus: FETCH_SUCCESS })
      } else {
        this.setState({ data: clone(data), fetchStatus: FETCH_SUCCESS })
      }
    }

    getSelected () {
      return this.component.getSelected(...arguments)
    }

    fetchData (fetch) {
      if (!fetch) {
        return
      }

      this.setState({ fetchStatus: FETCH_PENDING })

      if (typeof fetch === 'function') {
        fetch.then((res) => {
          this.setData(res)
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
      request.then((res) => {
        this.setData(res)
      })
      .catch((err) => {
        console.warn(fetch, err)
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

    render () {
      const { fetchStatus, error, data } = this.state
      if (fetchStatus === FETCH_SUCCESS || handleError) {
        return (
          <ComposedComponent {...this.props} data={data} fetchStatus={fetchStatus} />
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
})
