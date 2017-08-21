import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import menuList from './menuList'

class NavList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fixed: false
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 50) {
        if (!this.state.fixed) this.setFixed(true)
      } else {
        if (this.state.fixed) this.setFixed(false)
      }
    })
  }

  setFixed (fixed) {
    this.setState({ fixed })
  }

  getClasses (name, path) {
    return classnames(name, {
    })
  }

  pathChange (path) {
    this.props.onToggle()
  }

  renderRouteList () {
    let list = menuList.map(function (r, i) {
      if (typeof r === 'string') {
        return (
          <li key={i}>
            <span className="menu-group-label">{r}</span>
          </li>
        )
      } else if (r.path) {
        return (
          <li key={i}>
            <NavLink activeClassName="active" to={r.path}>
              {r.path.replace('/', '').replace(/^[a-z]/, (s) => s.toUpperCase())}
            </NavLink>
          </li>
        )
      }
    }, this)

    return <ul className="pure-menu-list">{list}</ul>
  }

  render () {
    let className = classnames(
      'nav',
      {
        active: this.props.navShow,
        fixed: this.state.fixed
      }
    )

    return (
      <div className={className}>
        <div className="nav-inner">
          <div ref="list" className="nav-list">
            <a href="//lobos.github.io/react-ui/0.6/">0.6 docs</a>
            {this.renderRouteList()}
          </div>
        </div>
      </div>
    )
  }
}

NavList.propTypes = {
  navShow: PropTypes.bool,
  onToggle: PropTypes.func
}

module.exports = NavList
