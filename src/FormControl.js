'use strict';

import { Component, PropTypes, cloneElement, Children } from 'react';
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
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentWillMount () {
    this.setItems(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (!shallowEqual(this.props, nextProps)) {
      this.setItems(nextProps);
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

    if (this.props.itemUnbind) {
      this.props.itemUnbind(...arguments);
    }
  }

  itemChange (name, value, result) {
    this.items[name].$value = value;

    this.handleValidate(name, result);

    if (this.props.itemChange) {
      this.props.itemChange(...arguments);
    }
  }

  handleValidate (name, result) {
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

  setItems (props) {
    let { label, layout, items, children, ...props } = props;
    let hints = [];

    if (children) {
      this.setChildrenHint(hints, children);
    } else {
      if (!items) {
        items = [props];
      }
      items.forEach((control) => {
        hints.push(this.getHint(control));
      });
    }

    this.setState({ items, hints: hints.join(', ') });
  }

  renderTip () {
    let { tip, errorText } = this.props;
    let { validations, hints } = this.state;
    hints = tip || hints;

    if (validations) {
      // if has tip，use tip
      if (errorText) { validations = errorText; }
      return <span key="tip" className="error">{validations}</span>;
    }

    if (hints) {
      return <span key="tip" className="hint">{hints}</span>;
    } else {
      return;
    }
  }

  propsExtend (props) {
    props.itemBind = this.itemBind;
    props.itemUnbind = this.itemUnbind;
    props.itemChange = this.itemChange;
    props.formData = this.props.formData;
    props.onValidate = this.handleValidate;
  }

  renderChildren (children) {
    let newChildren = Children.toArray(children).map((child, i) => {
      if (typeof child === 'string') {
        return <span key={i}>{child}</span>;
      }

      let props = { key: i };
      if (child.type.name === 'FormItem') {
        this.propsExtend(props);
      } else if (child.props && typeof child.props.children === 'object') {
        props.children = this.renderChildren(child.props.children);
      }
      
      child = cloneElement(child, props);
      return child;
    });
    return newChildren;
  }

  renderItems (grid) {
    const { children } = this.props;
    let items;
    if (children) {
      items = this.renderChildren(children);
    } else {
      items = this.state.items.map((props, i) => {
        if (typeof props === 'string') {
          return <span key={i} dangerouslySetInnerHTML={{__html: props}} />;
        }
        let component = COMPONENTS[props.type];
        if (component) {
          this.propsExtend(props);
          props.key = i;
          props.$controlId = this.id;
          props = merge({}, props, grid);
          return component.render(props);
        }
      });
    }

    items.push(this.renderTip());
    
    return items;
  }

  renderInline (className) {
    className = classnames(className, getGrid(this.props.grid));
    return (
      <div style={this.props.style} className={className}>
        {this.renderItems({grid: { width: 1 }, placeholder: this.props.placeholder || this.props.label})}
      </div>
    );
  }

  renderStacked (className) {
    return (
      <div style={this.props.style} className={className}>
        <label className="label">{this.props.label}</label>
        <div>
          {this.renderItems()}
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
        'rct-has-error': this.state.validations.length > 0
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
  errorText: PropTypes.string,
  formData: PropTypes.object,
  grid: PropTypes.object,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  itemBind: PropTypes.func,
  itemChange: PropTypes.func,
  itemUnbind: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
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
