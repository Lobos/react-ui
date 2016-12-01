import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { getGrid } from './utils/grids'
import Nav from './Nav'
import NavItem from './NavItem'

import _styles from './styles/_card.scss'

export default function Card (props) {
  const { block, children, grid, outline, style, type } = props

  const className = classnames(
    props.className,
    _styles.card,
    getGrid(grid),
    block && _styles['card-block'],
    type && !outline && _styles['card-inverse'],
    type && (outline ? _styles[`card-outline-${type}`] : _styles[`card-${type}`])
  )

  return (
    <div className={className} style={style}>
      <div className={_styles['card-blockquote']}>
        {children}
      </div>
    </div>
  )
}

Card.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  grid: PropTypes.grid,
  outline: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string
}

Card.Header = (props) =>
  <div {...props} className={_styles['card-header']} />

Card.Nav = (props) => (
  <div className={_styles[`card-header-${props.type}s`]}>
    <Nav {...props} />
  </div>
)

Card.Nav.propTypes = {
  type: PropTypes.string
}

Card.NavItem = NavItem
