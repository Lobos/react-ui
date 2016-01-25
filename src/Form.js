'use strict';

import { Children, Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { forEach, deepEqual } from './utils/objects';
import clone from './utils/clone';
import FormControl from './FormControl';
import FormSubmit from './FormSubmit';
import { fetchEnhance } from './higherOrders/Fetch';

import { requireCss } from './themes';
requireCss('form');

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: this.props.data
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    // don't need state
    this.items = {};

    this.itemBind = (props) => {
      this.items[props.name] = props;
      console.log('bind', props.name);
    };

    this.itemUnbind = (name) => {
      delete this.items[name];
      console.log('unbind', name);
    };

    this.itemChange = (name, value, err) => {
      let data = this.state.data;

      // don't use merge or immutablejs
      //data = merge({}, data, {[name]: value});

      if (data[name] !== value) {
        data[name] = value;
        // setState only triger render, data was changed
        this.setState({ data });
      }

      this.items[name].$validation = err;
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.setState({ data: nextProps.data });

      // if data changed, clear validation
      forEach(this.items, (item) => {
        delete item.$validation;
      });
    }
  }

  validate () {
    let success = true;
    forEach(this.items, (item) => {
      let suc = item.$validation;
      if (suc === undefined) {
        suc = item.validate();
        this.items[item.name].$validation = suc;
      }
      success = success && (suc === true);
    });
    return success;
  }

  handleSubmit (event) {
    if (this.props.disabled) {
      return;
    }

    event.preventDefault();
    this.submit();
  }

  submit () {
    let success = this.validate();
    if (success && this.props.beforeSubmit) {
      success = this.props.beforeSubmit();
    }

    if (!success) {
      return;
    }

    if (this.props.onSubmit) {
      // send clone data
      let data = clone(this.state.data);
      this.props.onSubmit(data);
    }
  }

  renderChildren () {
    let { data } = this.state;
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    return Children.map(this.props.children, (child) => {
      if (!child) { return null };
      let { hintType, readOnly } = child.props;
      let props = {
        hintType: hintType || this.props.hintType,
        readOnly: readOnly || this.props.disabled,
        layout: this.props.layout
      };
      if (child.type === FormControl) {
        props.itemBind = this.itemBind;
        props.itemUnbind = this.itemUnbind;
        props.itemChange = this.itemChange;
        props.formData = data;
      } else if (child.type === FormSubmit) {
        props.disabled = this.props.disabled;
      }

      return cloneElement(child, props);
    });
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-form',
      {
        'rct-form-aligned': this.props.layout === 'aligned',
        'rct-form-inline': this.props.layout === 'inline',
        'rct-form-stacked': this.props.layout === 'stacked'
      }
    );

    return (
      <form onSubmit={this.handleSubmit} style={this.props.style} className={className}>
        {this.renderChildren()}
      </form>
    );
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.object,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  style: PropTypes.object
};

Form.defaultProps = {
  data: {},
  layout: 'inline',
  disabled: false
};

module.exports = fetchEnhance(Form);
