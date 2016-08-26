import { Component } from 'react'
import PropTypes from '../utils/proptypes'
import Refetch from 'refetch'
import curry from 'curry'
import clone from '../utils/clone'
import { hashcode } from '../utils/objects'
import { substitute } from '../utils/strings'

export default curry((ComposedComponent) => {
  class Data extends Component {
    constructor (props) {
      super(props)
      this.state = {
        data: this.handleData(props.data)
      }
    }

    componentWillMount () {
      this.fetchData(this.props.fetch)
    }

    format (data) {
      const { valueTpl, optionTpl, resultTpl } = this.props
      const noResultTpl = !resultTpl
      return data.map(d => {
        let val = substitute(valueTpl, d)
        d.$html = substitute(optionTpl, d)
        d.$result = noResultTpl ? d.$html : substitute(resultTpl, d)
        d.$value = val
        d.$key = d.id ? d.id : hashcode(val + d.$html)
        d.children && this.format(d.children)
        return d
      })
    }

    handleData (data, node) {
      if (!data) return []

      data = this.format(clone(data))

      if (node) {
        node.children = data
        this.setState({})
      } else {
        this.setState({ data })
      }
    }

    fetchData (fetch, node) {
      if (!fetch) return

      if (typeof fetch === 'function') {
        fetch.then((res) => {
          this.handleData(res, node)
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
        this.handleData(res, node)
      })
      .catch((err) => {
        console.warn(fetch, err)
        this.setData(new Error(), node)
      })
    }

    render () {
      return <ComposedComponent {...this.props} data={this.state.data} />
    }
  }

  Data.propTypes = {
    data: PropTypes.array,
    fetch: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ]),
    optionTpl: PropTypes.tpl,
    resultTpl: PropTypes.tpl,
    valueTpl: PropTypes.tpl
  }

  Data.defaultProps = {
    optionTpl: '{text}',
    valueTpl: '{id}'
  }

  return Data
})
