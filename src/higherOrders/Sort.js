import React from 'react'
import PropTypes from '../utils/proptypes'
import { isEmpty } from '../utils/objects'
import PureRender from '../mixins/PureRender'

const defaultSort = (key, asc) => (a, b) => {
  let x = a[key]
  let y = b[key]
  if (asc === 0) {
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  } else {
    return ((x > y) ? -1 : ((x < y) ? 1 : 0))
  }
}

export default function (Component) {
  class Sort extends React.Component {
    constructor (props) {
      super(props)

      this.state = {}
      this.handleSort = this.handleSort.bind(this)
    }

    handleSort (key, asc, fn) {
      this.setState({ key, asc, fn })
      this.props.onSort && this.props.onSort(key, asc)
    }

    sort (data, { key, asc, fn }) {
      if (!Array.isArray(data)) return data
      return data.sort(typeof fn === 'function' ? fn : defaultSort(key, asc))
    }

    render () {
      const state = this.state
      const { data, ...props } = this.props
      let sortData = isEmpty(state) ? data : this.sort(data, state)

      return (
        <Component {...props}
          onSort={this.handleSort}
          sortStatus={{ key: state.key, asc: state.asc }}
          data={sortData} />
      )
    }
  }

  Sort.propTypes = {
    data: PropTypes.array_element_string,
    onSort: PropTypes.func
  }

  return PureRender()(Sort)
}

