'use strict';

import { shallowEqual } from '../utils/objects';

export default function(component) {
  component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  return component;
}
