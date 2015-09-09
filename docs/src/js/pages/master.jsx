"use strict"

import React from 'react'
import classnames from 'classnames'
import NavList from '../nav-list.jsx'

export default class Page extends React.Component {
  static displayName = 'Master'

  static propTypes = {
    children: React.PropTypes.any
  }

  state = {
    navShow: false
  }

  navToggle (show) {
    this.setState({ navShow: show })
  }

  render () {
    return (
      <div className={classnames({ 'nav-show': this.state.navShow })}>
        <NavList onToggle={this.navToggle.bind(this)} />
        <div className="main">{this.props.children}</div>
      </div>
    )
  }
}
