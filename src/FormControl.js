'use strict';

import React, { Component, PropTypes, cloneElement, Children } from 'react';
import classnames from 'classnames';
import objectAssign from 'object-assign';
import { COMPONENTS, getValueType } from './higherOrders/FormItem';
import merge from './utils/merge';
import { getGrid } from './utils/grids';
import { format } from './utils/strings';
import { forEach, shallowEqual } from './utils/objects';

import { getLang, setLang } from './lang';
setLang('validation');

import FormStyles from './styles/_form.scss';
import InputStyles from './styles/_input.scss';

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
    this.items[props.id] = props;

    if (this.props.itemBind) {
      this.props.itemBind(props);
    }
  }

  itemUnbind (id) {
    delete this.items[id];

    if (this.props.itemUnbind) {
      this.props.itemUnbind(...arguments);
    }
  }

  itemChange (id, value, result) {
    this.items[id].$value = value;

    this.handleValidate(id, result);

    if (this.props.itemChange) {
      this.props.itemChange(...arguments);
    }
  }

  handleValidate (id, result) {
    this.items[id].$validation = result;

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
    if (props.required) {
      this.required = true;
    }

    // allow empty string
    if (props.tip || props.tip === '') {
      return '';
    }

    let valueType = getValueType(props.type);
    let hints = [];

    setHint(hints, props.type);
    if (props.min) { setHint(hints, `min.${valueType}`, props.min); }
    if (props.max) { setHint(hints, `max.${valueType}`, props.max); }

    return hints.join(', ');
  }

  setChildrenHint (hints, children) {
    Children.toArray(children).forEach((child) => {
      if (child.type && child.type.isFormItem) {
        let hint = this.getHint(child.props);
        if (hint) {
          hints.push(hint);
        }
      } else if (child.children) {
        this.setChildrenHint(hints, children);
      }
    });
  }

  setItems (props) {
    let { label, layout, items, children, ...otherProps} = props;
    let hints = [];

    this.required = false;
    if (children) {
      this.setChildrenHint(hints, children);
    } else {
      if (!items) {
        items = [objectAssign({}, otherProps, {label})];
      }
    }

    if (items) {
      items.forEach((control) => {
        let hint = this.getHint(control);
        if (hint) {
          hints.push(hint);
        }
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
      return <span key="tip" className={FormStyles.dangerText}>{validations}</span>;
    }

    if (hints) {
      return <span key="tip" className={FormStyles.hintText}>{hints}</span>;
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
    props.readOnly = props.readOnly || this.props.readOnly;
  }

  renderChildren (children) {
    let newChildren = Children.toArray(children).map((child, i) => {
      if (typeof child === 'string') {
        return <span key={i}>{child}</span>;
      }

      let props = {};
      if (child.type.isFormItem) {
        this.propsExtend(props);
      } else if (child.props && child.props.children === 'object') {
        props.children = this.renderChildren(child.props.children);
      }
      
      child = cloneElement(child, props);
      return child;
    });
    return newChildren;
  }

  renderItems (grid) {
    const { children } = this.props;

    let items = (this.state.items || []).map((props, i) => {
      i += length;
      if (typeof props === 'string') {
        return <span key={i} dangerouslySetInnerHTML={{__html: props}} />;
      }
      let component = COMPONENTS[props.type];
      if (component) {
        this.propsExtend(props);
        props.key = `${props.label}|${props.name}`;
        props.$controlId = this.id;
        props = merge({}, props, grid);
        return component.render(props);
      }
    });

    if (children) {
      items = items.concat(this.renderChildren(children));
    }

    items.push(this.renderTip());
    
    return items;
  }

  render () {
    let { hintType, layout, label, grid, labelWidth, className, required, style } = this.props;
    let isInline = layout === 'inline';

    if (!hintType) {
      hintType = isInline ? 'pop' : 'block';
    }

    className = classnames(
      className,
      FormStyles.group,
      this.state.validations.length > 0 && FormStyles.hasError
    );

    if (isInline) {
      className += ' ' + getGrid(grid);
      grid = undefined;
    }

    let labelClass = classnames(
      FormStyles.label,
      (required || this.required) && FormStyles.required
    );

    if (labelWidth) {
      if (typeof labelWidth === 'number' && labelWidth < 1) {
        labelWidth += '%';
      }
    }
   
    if (layout === 'aligned') {
      labelWidth = labelWidth || '10rem';
      style = objectAssign({}, style, { paddingLeft: labelWidth });
    }

    return (
      <div style={style} className={className}>
        { 
          (label || !isInline) &&
          <label style={{ width: labelWidth }} className={labelClass}>
            {label}
          </label>
        }
        <div className={FormStyles.control}>
          { this.renderItems({ grid }) }
        </div>
      </div>

    );
  }
}

FormControl.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.any,
  errorText: PropTypes.string,
  formData: PropTypes.object,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  itemBind: PropTypes.func,
  itemChange: PropTypes.func,
  itemUnbind: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  labelWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
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

export default FormControl;

