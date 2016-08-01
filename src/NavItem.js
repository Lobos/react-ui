import { Component, PropTypes } from 'react'

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
  onClick: PropTypes.func
}

export default Nav
