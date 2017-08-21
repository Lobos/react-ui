import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HashRouter as Router, Route } from 'react-router-dom'
import NavList from './navList.jsx'
import { Icon } from 'rctui'
import * as Language from './Language'
import Home from './pages/home.jsx'

let menulist = []

require('./menuList').forEach(function (menu, index) {
  if (typeof menu === 'object' && menu.component) {
    menulist.push(
      <Route key={index}
        path={menu.path}
        component={menu.component} />
    )
  }
})

function scrollTop () {
  window.scrollTo(0, 0)
}

class Master extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navShow: false,
      lang: Language.get().toLowerCase()
    }
    this.langToggle = this.langToggle.bind(this)
    this.navToggle = this.navToggle.bind(this)
  }

  navToggle () {
    this.setState({ navShow: !this.state.navShow })
  }

  langToggle () {
    let lang = this.state.lang === 'zh-cn' ? 'en' : 'zh-cn'
    Language.set(lang)
    window.location.reload()
  }

  render () {
    return (
      <Router onUpdate={scrollTop}>
        <div style={{height: '100vh'}}>
          <header>
            <a className="menu" href="javascript:;" onClick={this.navToggle}>
              <Icon icon="menu" style={{fontSize: '1.5rem'}} />
            </a>
            <a className="logo" href="#/">React UI</a>
            <a className="link-github" href="https://github.com/Lobos/react-ui"><Icon icon="github" /> github</a>
            <a href="javascript:;" onClick={this.langToggle} className="link-lang">{this.state.lang === 'zh-cn' ? 'English' : '中文'}</a>
          </header>
          <NavList onToggle={this.navToggle} navShow={this.state.navShow} />
          <div className="main">
            <Route path="/" exact component={Home} />
            {menulist}
          </div>
        </div>
      </Router>
    )
  }
}

Master.propTypes = {
  children: PropTypes.any
}

module.exports = Master
