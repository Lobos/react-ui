'use strict'

import React, { Component, PropTypes } from 'react'
import { objectAssign } from './utils/objects'
import ClickAway from './higherOrders/ClickAway'
import classnames from 'classnames'

// import { requireCss } from './themes'
// requireCss('tip')

class Tip extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: props.position
    }
    this.showTip = this.showTip.bind(this)
    this.bindElement = this.bindElement.bind(this)
  }

  /*
  componentDidMount () {
    if (this.props.trigger === 'click') {
      this.registerTarget(this.root);
    }
  }
  */

  showTip () {
    this.onOpen()
  }

  bindElement (ref) {
    this.root = ref
  }

  render () {
    let props = this.props
    let event = {}
    let pos = this.state.position
    let clsShow = 'pos-' + pos
    let clsName = classnames('tip-block', pos + '-origin', {[clsShow]: props.open})

    event[props.trigger === 'hover' ? 'onMouseEnter' : 'onClick'] = this.showTip
    props.trigger === 'hover' && (event['onMouseLeave'] = this.props.onClose)

    return (
      <div ref={this.bindElement} className="component-tip" {...event}>
        { props.children[0]}
        <div ref="content" className={clsName}>
          <div className="tip-border">
            <span className="arrow"></span>
            {props.children[1]}
          </div>
        </div>
      </div>
    )
  }
};

Tip.defaultProps = {
  position: 'bottom',
  trigger: 'hover'
}

Tip.propTypes = objectAssign({
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover'])
}, ClickAway.propTypes)

module.exports = ClickAway(Tip)
