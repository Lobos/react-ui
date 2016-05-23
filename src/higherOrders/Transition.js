'use strict';

import React, { PropTypes } from 'react';

function childrenToItems (children) {
  if (!children) {
    return {};
  }

  let items = {};
  if (!Array.isArray(children)) {
    children = [children];
  }

  children.forEach((child) => {
    items[child.key] = child;
  });

  return items;
}

function itemsToChildren (items) {
  return Object.keys(items).map((key) => {
    return items[key];
  });
}

export function transitionEnhance (Component) {
  class Transition extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        items: childrenToItems(props.children)
      };
    }

    render () {
      return <Component {...this.props}>{itemsToChildren(this.state.items)}</Component>;
    }
  }
}
