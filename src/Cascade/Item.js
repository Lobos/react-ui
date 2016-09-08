import { Component, PropTypes } from 'react'
import classnames from 'classnames'
import SafeHtml from '../SafeHtml'
import PureRender from '../mixins/PureRender'
import { ANGLE_RIGHT } from '../svgs'
import SimpleCircle from '../Spin/SimpleCircle'

import _styles from '../styles/_cascade.scss'

class Item extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { level, data, onClick } = this.props
    onClick(level, data)
  }

  renderIndicator () {
    const { data, lazy } = this.props

    if (lazy) {
      if (data.$pending) {
        return <div className={_styles.indicator}><SimpleCircle size="1rem" color="#ccc" /></div>
      } else if (!data.children) {
        return <div className={_styles.indicator}><span>...</span></div>
      } else if (data.children.length > 0) {
        return <div className={_styles.indicator}>{ANGLE_RIGHT}</div>
      }
    } else {
      if (data.children && data.children.length > 0) {
        return <div className={_styles.indicator}>{ANGLE_RIGHT}</div>
      }
    }
  }

  render () {
    const { active, data, maxLevel, level } = this.props

    const className = classnames(
      active && _styles.active
    )

    return (
      <li className={className} onClick={this.handleClick}>
        <SafeHtml>{data.$html}</SafeHtml>
        { !data.isEnd && (maxLevel - 1) > level && this.renderIndicator() }
      </li>
    )
  }
}

Item.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  lazy: PropTypes.bool,
  level: PropTypes.number,
  maxLevel: PropTypes.number,
  onClick: PropTypes.func
}

export default PureRender(false)(Item)
