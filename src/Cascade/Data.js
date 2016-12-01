import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import Refetch from 'refetch'
import curry from 'curry'
import clone from '../utils/clone'
import { hashcode, deepEqual } from '../utils/objects'
import { substitute } from '../utils/strings'
import { objectAssign } from '../utils/objects'

export default curry((mult, ComposedComponent) => {
  class Data extends Component {
    constructor (props) {
      super(props)
      this.state = {
        data: props.data ? this.format(clone(props.data), [], props) : []
      }

      this.handleLazyFetch = this.handleLazyFetch.bind(this)
    }

    componentWillMount () {
      this.props.fetch && this.fetchData(this.props.fetch)

      if (this.props.lazyFetch) {
        this.props.value && !mult
          ? this.initLazyData([...this.props.value])
          : this.handleLazyFetch()
      }
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.lazyFetch &&
        this.props.value === undefined &&
        !mult &&
        Array.isArray(nextProps.value)) {
          this.initLazyData([...nextProps.value])
        }

      if (!deepEqual(nextProps.data, this.props.data)) {
        this.format(clone(nextProps.data), [], nextProps)
      }
    }

    format (data, path = [], props = this.props) {
      const { valueTpl, optionTpl, resultTpl } = props
      const noResultTpl = !resultTpl
      return data.map((d, i) => {
        let val = substitute(valueTpl, d)
        d.$html = substitute(optionTpl, d)
        d.$result = noResultTpl ? d.$html : substitute(resultTpl, d)
        d.$value = val
        d.$key = d.id ? d.id : hashcode(val + d.$html)
        d.$path = [...path, i]
        d.children && this.format(d.children, [...path, i], props)

        return d
      })
    }

    initLazyData (value, path = [], root) {
      if (!value) return
      const { lazyFetch } = this.props

      let node = root
        ? path.reduce((d, i) => {
            return d.children[i]
          }, root)
        : undefined

      lazyFetch(node).then(list => {
        list = this.format(clone(list), path)

        if (!root) root = { children: list }
        else node.children = list

        const v = value.shift()
        list.forEach((d, i) => {
          if (d.$value === v) path.push(i)
        })

        if (value.length > 0) {
          this.initLazyData(value, path, root)
        } else {
          this.setState({ data: root.children })
        }
      })
    }

    handleData (data, node) {
      if (!data) return []

      data = this.format(clone(data), node && node.$path)

      if (node) {
        const parent = node.$path.slice(0, -1).reduce((s, p) => {
          return s.children[p]
        }, { children: this.state.data })

        const index = node.$path[node.$path.length - 1]
        parent.children = [
          ...parent.children.slice(0, index),
          objectAssign({}, parent.children[index], { children: data, $pending: false }),
          ...parent.children.slice(index + 1)
        ]

        if (node.$path.length === 1) {
          this.setState({ data: parent.children })
        } else {
          this.forceUpdate()
        }
      } else {
        this.setState({ data })
      }
    }

    handleLazyFetch (node, callback) {
      const { lazyFetch } = this.props
      if (!lazyFetch) return

      if (node) node.$pending = true
      lazyFetch(node).then(data => {
        this.handleData(data, node)
        callback(data)
      })
    }

    fetchData (fetch) {
      if (!fetch) return

      if (typeof fetch === 'function') {
        fetch.then((res) => {
          this.handleData(res)
        })
        return
      }

      if (typeof fetch === 'string') {
        fetch = { url: fetch }
      }

      let { method = 'get', url, data, then, request, ...options } = fetch
      if (!request) request = Refetch

      request = request[method](url, data, options)

      // handle response
      if (then) request = request.then(then)
      request.then((res) => {
        this.handleData(res)
      })
      .catch((err) => {
        console.warn(fetch, err)
        this.setData(new Error())
      })
    }

    render () {
      return (
        <ComposedComponent
          {...this.props}
          onLazyClick={this.props.lazyFetch ? this.handleLazyFetch : undefined}
          data={this.state.data} />
      )
    }
  }

  Data.propTypes = {
    data: PropTypes.array,
    fetch: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ]),
    lazyFetch: PropTypes.func,
    optionTpl: PropTypes.tpl,
    resultTpl: PropTypes.tpl,
    value: PropTypes.array,
    valueTpl: PropTypes.tpl
  }

  Data.defaultProps = {
    optionTpl: '{text}',
    valueTpl: '{id}'
  }

  return Data
})
