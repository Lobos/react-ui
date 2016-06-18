'use strict';

import React,{ Component,PropTypes } from 'react'
import classnames from 'classnames';

import { requireCss } from './themes';
requireCss('switch');

class Switch extends Component {
  constructor(props){
    super(props)
    this.state = {
      checked:props.checked
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render(){
    const { status } = this.props
    const className = classnames(
    	'switch',
    	this.props.className
    );
    return(
      <label className={className}>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
        <span className="switch-item"></span>
        <span className="switch-mask"></span>
      </label>
    );
  }

  handleChange(ev){
    this.setState({'checked':!this.state.checked})
    if(this.props.onSwitch){
      this.props.onSwitch(ev.target.checked)
    }
  }
}

Switch.PropTypes = {
  className: PropTypes.string,
  checked:PropTypes.bool,
  onSwitch:PropTypes.func
}

Switch.defaultProps = {
  checked: false
}

module.exports = Switch;
