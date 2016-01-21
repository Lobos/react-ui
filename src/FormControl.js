'use strict';

import { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { COMPONENTS, getValueType } from './higherOrders/FormItem';
import merge from './utils/merge';
import { getGrid } from './utils/grids';
import { format } from './utils/strings';
import { forEach, shallowEqual } from './utils/objects';

import { getLang, setLang } from './lang';
setLang('validation');

function setHint(hints, key, value) {
  let text = getLang('validation.hints.' + key, null);
  if (text) {
    hints.push(format(text, value));
  }
}

class FormControl extends Component {
  constructor (props) {
    super(props);
    this.state = {
      validations: ''
    };

    // for check props
    this.items = {};
    this.itemBind = this.itemBind.bind(this);
    this.itemUnbind = this.itemUnbind.bind(this);
    this.itemChange = this.itemChange.bind(this);
  }

  componentWillMount () {
    this.setControls(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (!shallowEqual(this.props, nextProps)) {
      this.setControls(nextProps);
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!shallowEqual(this.props, nextProps)) {
      return true;
    }

    if (nextProps.formData) {
      let keys = Object.keys(this.items);
      for (let i=0, key; i<keys.length; i++) {
        key = keys[i];
        if (nextProps.formData[key] !== this.items[key].$value) {
          return true;
        }
      }
    }

    return !shallowEqual(this.state, nextState);
  }

  itemBind (props) {
    this.items[props.name] = props;

    if (this.props.itemBind) {
      this.props.itemBind(props);
    }
  }

  itemUnbind (name) {
    delete this.items[name];

    if (this.props.itemBind) {
      this.props.itemBind(...arguments);
    }
  }

  itemChange (name, value, result) {
    this.items[name].$value = value;
    this.items[name].$validation = result;

    let validations = [];
    forEach(this.items, (item) => {
      if (item.$validation instanceof Error) {
        validations.push(item.$validation.message);
      }
    });
    validations = validations.join(', ');
    if (validations !== this.state.validations) {
      this.setState({ validations });
    }

    if (this.props.itemChange) {
      this.props.itemChange(...arguments);
    }
  }

  getHint (props) {
    if (props.tip) {
      return '';
    }

    let valueType = getValueType(props.type);
    let hints = [];

    if (props.required) { setHint(hints, 'required'); }
    setHint(hints, this.props.type);
    if (props.min) { setHint(hints, `min.${valueType}`, props.min); }
    if (props.max) { setHint(hints, `max.${valueType}`, props.max); }

    return (props.label || '') + hints.join(', ');
  }

  setChildrenHint (hints, children) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach((child) => {
      if (child.type === 'FormItem') {
        hints.push(this.getHint(child.props));
      } else if (child.children) {
        this.getChildrenHint(hints, children);
      }
    });
  }

  setControls (props) {
    let { label, layout, controls, children, ...props } = props;
    let hints = [];

    if (children) {
      this.setChildrenHint(hints, children);
    } else {
      if (!controls) {
        controls = [props];
      }
      controls.forEach((control) => {
        hints.push(this.getHint(control));
      });
    }

    this.setState({ controls, hints: hints.join(', ') });
  }

  renderTip () {
    let { validations, hints } = this.state;
    let tip = this.props.tip;

    // error first 
      console.log('tip', validations);
    if (validations) {
      return <span key="tip" className="error">{validations}</span>;
    }

    return <span key="tip" className="hint">{tip || hints}</span>;
  }

  renderChildren (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    let newChildren = [];
    children.map((child, i) => {
      let props = { key: i };
      if (child.type.name === 'FormItem') {
        props.itemBind = this.itemBind;
        props.itemUnbind = this.itemUnbind;
        props.itemChange = this.itemChange;
        props.formData = this.props.formData;
      } else if (child.props && typeof child.props.children === 'object') {
        props.children = this.renderChildren(child.props.children);
      }
      child = cloneElement(child, props);
      newChildren.push(child);
    });
    return newChildren;
  }

  renderControl (grid) {
    const { children } = this.props;
    let controls;
    if (children) {
      controls = this.renderChildren(children);
    } else {
      controls = this.state.controls.map((props, i) => {
        if (typeof props !== 'object') {
          return props;
        }
        let component = COMPONENTS[props.type];
        if (component) {
          props.itemBind = this.itemBind;
          props.itemUnbind = this.itemUnbind;
          props.itemChange = this.itemChange;
          props.key = i;
          props.$controlId = this.id;
          props.formData = this.props.formData;
          props = merge({}, props, grid);
          return component.render(props);
        }
      });
    }

    controls.push(this.renderTip());
    
    return controls;
  }

  renderInline (className) {
    className = classnames(className, getGrid(this.props.grid));
    return (
      <div style={this.props.style} className={className}>
        {this.renderControl({grid: { width: 1 }})}
      </div>
    );
  }

  renderStacked (className) {
    return (
      <div style={this.props.style} className={className}>
        <label className="label">{this.props.label}</label>
        <div>
          {this.renderControl()}
        </div>
      </div>
    );
  }

  render () {
    console.log(1111);
    let { hintType, layout, className } = this.props;
    if (!hintType) {
      hintType = layout === 'inline' ? 'pop' : 'block';
    }

    className = classnames(
      className,
      'rct-control-group',
      `rct-hint-${hintType}`,
      {
        'rct-has-error': this.state.hasError
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
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  tip: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  type: PropTypes.string,
  value: PropTypes.any
};

FormControl.defaultProps = {
  layout: 'inline',
  type: 'text'
};

module.exports = FormControl;
