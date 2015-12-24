"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import NavList from '../nav-list.jsx';

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
      <div className={classnames({ 'nav-show': this.state.navShow })}>
        <NavList onToggle={this.navToggle.bind(this)} />
        <div className="main">{this.props.children}</div>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.any
}

module.exports = Page;
