"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import menulist from './menulist';
const { Icon } = global.uiRequire();

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

  getRoutesList (paths, index) {
    let list = paths.map(function (r, i) {
      if (r.path) {
        return (
          <li key={i} className="pure-menu-item">
            <a onClick={this.pathChange.bind(this, r.path)} className={this.getClasses("pure-menu-link", r.path)}>{r.text}</a>
          </li>
        );
      } else if (r.hr) {
        return (<hr key={i} />);
      } else if (r.text) {
        return (
          <li key={i} className="pure-menu-item">
            <span className="pure-menu-link">{r.text}</span>
          </li>
        );
      }
    }, this);

    return <ul key={index} className="pure-menu-list">{list}</ul>;
  }

  render () {
    let list = menulist.map(function (paths, index) {
      return this.getRoutesList(paths, index);
    }, this);

    return (
      <div className={classnames("nav", {active: this.state.active})}>
        <a className="pure-menu-heading" onClick={this.pathChange.bind(this, '/home')}>React UI</a>
        <a className="link-github" href="https://github.com/Lobos/react-ui"><Icon size={2} icon="github" /></a>
        <div className="nav-inner">
          <div ref="list" className="nav-list">
            {list}
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
