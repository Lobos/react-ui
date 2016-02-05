"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import menuList from './menuList';

class NavList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: true
    };
  }

  getClasses (name, path) {
    return classnames(name, {
      active: this.context.history.isActive(path)
    });
  }

  pathChange (path) {
    if (!this.context.history.isActive(path)) {
      this.context.history.pushState(null, path);
    }
  }

  renderRouteList () {
    let list = menuList.map(function (r, i) {
      if (typeof r === 'string') {
        return (
          <li key={i} className="pure-menu-item">
            <span className="menu-group-label">{r}</span>
          </li>
        );
      } else if (r.path) {
        return (
          <li key={i} className="pure-menu-item">
            <a onClick={this.pathChange.bind(this, r.path)} className={this.getClasses("pure-menu-link", r.path)}>{r.text}</a>
          </li>
        ); 
      }
    }, this);

    return <ul className="pure-menu-list">{list}</ul>;
  }

  render () {
    return (
      <div className={classnames("nav", {active: this.state.active})}>
        <div className="nav-inner">
          <div ref="list" className="nav-list">
            {this.renderRouteList()}
          </div>
        </div>
      </div>
    );
  }
}

NavList.propTypes = {
  onToggle: PropTypes.func
};

NavList.contextTypes = {
  history: PropTypes.object.isRequired
};

module.exports = NavList;
