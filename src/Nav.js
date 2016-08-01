import { Component, PropTypes, Children } from 'react'
import classnames from 'classnames'

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
    const {children, inline, type} = this.props
    const {activeId} = this.state

    const suffix = type && inline ? type : 'pill'

    const items = Children.map(children, (e, i) => {
      const className = classnames(
        Styles[`navItem-${suffix}`],
        activeId === (i + 1) ? Styles[`active-${suffix}`] : Styles[`inactive-${suffix}`],
        inline ? Styles.inline : ''
      )

      const onClick = activeId === (i + 1) ? null : this.handleChoose.bind(this, i + 1)

      const props = {className, onClick}

      return <div {...props}>
               {e}
             </div>
    })

    return (
      <div className={Styles.nav}>
        <div className={Styles[`wrapper-${suffix}`]}>
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
  active: PropTypes.number
}

Navs.defaultProps = {
  type: 'pill'
}

export default Navs
