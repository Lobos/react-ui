import { Component, PropTypes } from 'react'
import classnames from 'classnames'
import SafeHtml from '../SafeHtml'
import PureRender from '../mixins/PureRender'
import { ANGLE_RIGHT } from '../svgs'

import _styles from '../styles/_cascade.scss'

class Item extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.level, this.props.data)
  }

  renderIndicator () {
    const { data } = this.props

    if (data.children && data.children.length > 0) {
      return <div className={_styles.indicator}>{ANGLE_RIGHT}</div>
    }
  }

  render () {
    const { active, data } = this.props

    const className = classnames(
      active && _styles.active
    )

    return (
      <li className={className} onClick={this.handleClick}>
        <SafeHtml>{data.$html}</SafeHtml>
        { this.renderIndicator() }
      </li>
    )
  }
}

Item.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  level: PropTypes.number,
  onClick: PropTypes.func
}

export default PureRender(false)(Item)
