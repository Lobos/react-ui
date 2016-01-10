'use strict';

import ReactDOM from 'react-dom';
import * as Events from '../utils/events';
import { isDescendant } from '../utils/dom';

module.exports = (Component) => class extends Component {
  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    this.unbindClickAway();
  }

  bindClickAway () {
    const fn = this.getClickAwayEvent();
    Events.on(document, 'click', fn);
    Events.on(document, 'touchstart', fn);
  }

  unbindClickAway () {
    const fn = this.getClickAwayEvent();
    Events.off(document, 'click', fn);
    Events.off(document, 'touchstart', fn);
  }

  registerClickAway (onClickAway, target) {
    this.clickAwayTarget = target;
    this.onClickAway = onClickAway;
  }

  getClickAwayEvent () {
    let fn = this._clickAwayEvent;
    if (!fn) {
      fn = (event) => {
        let el = this.clickAwayTarget || ReactDOM.findDOMNode(this);

        // Check if the target is inside the current component
        if (event.target !== el && !isDescendant(el, event.target)) {
          if (this.onClickAway) {
            this.onClickAway();
          }
        }
      }
      this._clickAwayEvent = fn;
    }
    return fn;
  }
};
