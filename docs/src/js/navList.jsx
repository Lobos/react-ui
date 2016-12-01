import { Component, PropTypes } from 'react'
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
      active: this.context.history.isActive(path)
    })
  }

  pathChange (path) {
    this.props.onToggle()
    if (!this.context.history.isActive(path)) {
      this.context.history.pushState(null, path)
    }
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
            <a onClick={this.pathChange.bind(this, r.path)}
              className={this.getClasses('', r.path)}>
              {r.path.replace('/', '').replace(/^[a-z]/, (s) => s.toUpperCase())}
            </a>
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

NavList.contextTypes = {
  history: PropTypes.object.isRequired
}

module.exports = NavList
