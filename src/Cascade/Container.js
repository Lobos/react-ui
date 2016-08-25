import { Component, PropTypes } from 'react'
import List from './List'

export default class Container extends Component {
  getResult () {
    return ''
  }

  getListData (val, data) {
    return data
  }

  render () {
    const { className, data, value } = this.props

    return (
      <div className={className}>
        <div>{this.getResult()}</div>
        <div>
        {
          value.map(v => (
            <List key={v} data={data} />
          ))
        }
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.string)
}
