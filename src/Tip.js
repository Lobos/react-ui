'use strict';

import React, { Component, PropTypes } from 'react';
import ClickAway from './mixins/ClickAway';
import classnames from 'classnames';

import { requireCss } from './themes';
requireCss('tip');

class Tip extends ClickAway(Component) {

  constructor (props) {
    super(props);
    this.state = {
      show: props.show,
      position: props.position
    };
    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
  }

  componentDidMount() {
    if (this.props.trigger == 'click') {
      this.registerClickAway(this.hideTip, this.root);
    }
  }

  showTip () {
    this.setState({
      show: true
    });
    this.bindClickAway();
  }

  hideTip () {
    this.setState({
      show: false
    });
    this.unbindClickAway();
  }

  render () {
    let props = this.props;
    let event = {};
    let pos = this.state.position;
    let clsShow = 'pos-'+ pos;
    let clsName = classnames('tip-block', pos +'-origin' ,{[clsShow]: this.state.show});

    event[ props.trigger == 'hover' ? 'onMouseEnter':'onClick'] = this.showTip;
    props.trigger == 'hover' && (event['onMouseLeave'] = this.hideTip);

    return (
      <div ref={(el)=>this.root = el} className="component-tip" {...event}>
        { props.children[0]}
        <div ref="content" className={clsName}>
          <div className="tip-border">
            <span className="arrow"></span>
            {props.children[1]}
          </div>
        </div>
      </div>
    );
  }
};

Tip.defaultProps = {
  position: 'bottom',
  trigger: 'hover',
  show: false
};

Tip.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  show: PropTypes.bool,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover'])
};

module.exports = Tip;
