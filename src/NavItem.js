import { Component } from 'react'
import PropTypes from './utils/proptypes'

class Nav extends Component {
  render () {
    const {onClick, text} = this.props

    return (
      <label>
        {onClick
           ? <a onClick={onClick}>
               {text}
             </a>
           : text}
      </label>
    )
  }
}

Nav.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  grid: PropTypes.grid
}

export default Nav
