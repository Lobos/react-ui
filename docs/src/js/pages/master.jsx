"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import NavList from '../navList.jsx';
const { Icon } = global.uiRequire();

class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      navShow: false
    };
  }

  navToggle (show) {
    this.setState({ navShow: show });
  }

  render () {
    return (
      <div>
        <header>
          <a className="logo" href="#/home">React UI</a>
          <a className="link-github" href="https://github.com/Lobos/react-ui"><Icon icon="github" /> github</a>
        </header>
        <div className='wrapper'>
          <NavList onToggle={this.navToggle.bind(this)} />
          <div className="main">{this.props.children}</div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.any
}

module.exports = Page;
