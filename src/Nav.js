import { Component, Children } from 'react'
import PropTypes from './utils/proptypes'
import classnames from 'classnames'
import { getGrid } from './utils/grids'
import Styles from './styles/_nav.scss'

class Navs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeId: 1
    }
  }

  handleChoose (id) {
    const {onSelect} = this.props

    this.setState({activeId: id}, () => {
      onSelect && onSelect.call(this, id)
    })
  }

  render () {
    const {children, inline, type, grid} = this.props
    const {activeId} = this.state

    const itemGrid = 1 / children.length

    const items = Children.map(children, (e, i) => {
      const wrapperClassName = inline || type === 'tab' ? classnames(Styles.inline, getGrid(itemGrid)) : ''

      const className = classnames(
        Styles[`navItem-${type}`],
        activeId === (i + 1) ? Styles[`active-${type}`] : Styles[`inactive-${type}`]
      )

      const onClick = activeId === (i + 1) ? null : this.handleChoose.bind(this, i + 1)

      return <div className={wrapperClassName} onClick={onClick}>
               <div className={className}>
                 {e}
               </div>
             </div>
    })

    const className = classnames(
      Styles.nav,
      getGrid(grid)
    )

    return (
      <div className={className}>
        <div className={Styles[`wrapper-${type}`]}>
          {items}
        </div>
      </div>
    )
  }
}

Navs.propTypes = {
  onSelect: PropTypes.func,
  inline: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.number,
  grid: PropTypes.grid
}

Navs.defaultProps = {
  type: 'pill'
}

export default Navs
