import React from 'react'
import { objectAssign } from '../utils/objects'
import PropTypes from '../utils/proptypes'
import PureRender from '../mixins/PureRender'

export default function (Component) {
  class Pagination extends React.Component {
    constructor (props) {
      super(props)

      this.state = { page: 1 }

      this.handleChange = this.handleChange.bind(this)
    }

    getData (pagination) {
      let data = this.props.data

      if (pagination) {
        const { page, size } = pagination
        data = data.slice((page - 1) * size, page * size)
      }

      return data
    }

    handleChange (page) {
      const { onChange } = this.props.pagination
      if (typeof onChange === 'function') {
        onChange(page)
      } else {
        this.setState({ page })
      }
    }

    getPagination (pagination) {
      if (!pagination || !Array.isArray(this.props.data)) return

      let props = objectAssign(
        {
          page: this.state.page,
          size: 20,
          position: 'center',
          total: this.props.data.length
        },
        pagination.props || pagination
      )

      props.onChange = this.handleChange
      return props
    }

    render () {
      const { pagination, ...props } = this.props
      let pagi = this.getPagination(pagination)

      return (
        <Component {...props}
          data={this.getData(pagi)}
          pagination={pagi}
        />
      )
    }
  }

  Pagination.propTypes = {
    data: PropTypes.array_element_string,
    pagination: PropTypes.element_object
  }

  Pagination.defaultProps = {
    data: []
  }

  return PureRender()(Pagination)
}
