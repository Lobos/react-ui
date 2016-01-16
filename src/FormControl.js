'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { COMPONENTS } from './higherOrders/FormItem';
import merge from './utils/merge';
import { getGrid } from './utils/grids';

class FormControl extends Component {
  constructor (props) {
    super(props);
    this.state = {
      controls: []
    };
  } 

  componentWillMount () {
    // combine 
    //this.setHint(this.props);
    this.setControls();
  }

  componentWillReceiveProps (nextProps) {
    //this.setHint(nextProps);
  }

  setControls () {
    let { label, layout, controls, children, ...props } = this.props;
    if (children) {
      return;
    }

    if (!controls) {
      controls = [props];
    }

    this.setState({ controls });
  }

  renderChildren (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    let newChildren = [];
    children.map((child, i) => {
      let props = { key: i };
      if (child.type.name === 'FormData') {
        props.form = this.props.form;
      } else if (child.props && typeof child.props.children === 'object') {
        props.children = this.renderChildren(child.props.children);
      }
      child = React.cloneElement(child, props);
      newChildren.push(child);
    });
    return newChildren;

  }

  renderControl (grid) {
    const { children } = this.props;
    if (children) {
      return this.renderChildren(children);
    }

    let controls = this.state.controls.map((props, i) => {
      if (typeof props !== 'object') {
        return props;
      }
      let component = COMPONENTS[props.type];
      if (component) {
        props.form = this.props.form;
        props.key = i;
        props = merge({}, props, grid);
        return component.render(props);
      }
    });
    
    return controls;
  }

  renderInline (className) {
    className = classnames(className, getGrid(this.props.grid));
    return (
      <div style={this.props.style} className={className}>
        {this.renderControl({grid: { width: 1 }})}
        {
          this.state.errorText ?
          <span className="error">{this.state.errorText}</span> :
          ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
        }
      </div>
    );
  }

  renderStacked (className) {
    return (
      <div style={this.props.style} className={className}>
        <label className="label">{this.props.label}</label>
        <div>
          {this.renderControl()}
          {
            this.state.errorText ?
            <span className="error">{this.state.errorText}</span> :
            ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
          }
        </div>
      </div>
    );
  }

  render () {
    let { hintType, layout, className } = this.props;
    if (!hintType) {
      hintType = layout === 'inline' ? 'pop' : 'block';
    }

    className = classnames(
      className,
      'rct-control-group',
      `rct-hint-${hintType}`,
      {
        'rct-has-error': this.state.hasError,
        'focused': this.state.focused
      }
    );

    if (layout === 'inline') {
      return this.renderInline(className);
    } else {
      return this.renderStacked(className);
    }
  }
}

FormControl.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.any,
  formItemBind: PropTypes.func,
  grid: PropTypes.object,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  label: PropTypes.string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any
};

FormControl.defaultProps = {
  layout: 'inline',
  type: 'text'
};

FormControl.register = () => {};

module.exports = FormControl;
