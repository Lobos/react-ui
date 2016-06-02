'use strict';

import React, { Children, Component, cloneElement } from 'react';
import classnames from 'classnames';
import { forEach, deepEqual, hashcode } from './utils/objects';
import clone from './utils/clone';
import { getGrid } from './utils/grids';
import FormControl from './FormControl';
import FormSubmit from './FormSubmit';
import Button from './Button';
import PropTypes from './utils/proptypes';

import { fetchable } from './higherOrders/Fetch';

import FormStyles from './styles/_form.scss';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: clone(props.data)
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);

    this.items = {};
    this.validationPools = {};

    this.itemBind = (item) => {
      this.items[item.id] = item;

      let data = this.state.data;
      data[item.name] = item.value;
      this.setState({ data });

      // bind triger item
      if (item.valiBind) {
        item.valiBind.forEach((vb) => {
          this.validationPools[vb] = (this.validationPools[vb] || []).concat(item.validate);
        });
      }
    };

    this.itemUnbind = (id, name) => {
      let data = this.state.data;
      delete this.items[id];
      delete data[name];
      // remove valiBind
      delete this.validationPools[name];
      this.setState({ data });
    };

    this.itemChange = (id, value, err) => {
      let data = this.state.data;
      const name = this.items[id].name;

      // don't use merge or immutablejs
      // data = merge({}, data, {[name]: value});

      if (data[name] !== value) {
        data[name] = value;
        // setState only triger render, data was changed
        this.setState({ data });
      }

      let valiBind = this.validationPools[name];
      if (valiBind) {
        valiBind.forEach((validate) => {
          if (validate) {
            validate();
          }
        });
      }

      this.items[id].$validation = err;
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.setState({ data: clone(nextProps.data) });

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
        this.items[item.id].$validation = suc;
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

  handleReset () {
    const { onReset, data } = this.props;

    this.setState({ data: clone(data) });

    // clear validation
    forEach(this.items, (item) => {
      delete item.$validation;
    });

    onReset && onReset();
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

      // remove ignore value
      forEach(this.items, (item) => {
        if (item.ignore) {
          delete data[item.name];
        }
      });

      this.props.onSubmit(data);
    }

    return true;
  }

  renderControls () {
    const { data } = this.state;
    const { hintType, controls, disabled, layout } = this.props;

    return clone(controls).map((control) => {
      if (typeof control !== 'object') {
        return control;
      } else {
        control.key = control.key || control.name || hashcode(control);
        control.hintType = control.hintType || hintType;
        control.readOnly = control.readOnly || disabled;
        control.layout = layout;
        control.itemBind = this.itemBind;
        control.itemUnbind = this.itemUnbind;
        control.itemChange = this.itemChange;
        control.formData = data;
        return <FormControl { ...control } />;
      }
    });
  }

  renderChildren (children) {
    let { data } = this.state;
    let { disabled } = this.props;

    return Children.map(children, (child) => {
      if (!child) { return null; }
      if (typeof child === 'string') { return child; }
      let { hintType, labelWidth, readOnly } = child.props;
      let props = {
        hintType: hintType || this.props.hintType,
        labelWidth: labelWidth || this.props.labelWidth,
        readOnly: readOnly || disabled,
        layout: this.props.layout
      };
      if (child.type === FormControl || child.type.isFormItem) {
        props.itemBind = this.itemBind;
        props.itemUnbind = this.itemUnbind;
        props.itemChange = this.itemChange;
        props.formData = data;
      } else if (child.type === FormSubmit) {
        props.disabled = disabled;
      } else if (child.props.children) {
        props.children = this.renderChildren(child.props.children);
      }

      return cloneElement(child, props);
    });
  }

  renderButtons (buttons) {
    if (typeof buttons === 'string') {
      buttons = { 'submit': buttons };
    }

    const { submit, reset, cancel } = buttons;

    return (
      <FormControl layout={this.props.layout}>
        { submit && <Button className={FormStyles.button} type="submit" status="primary">{submit}</Button> }
        { reset && <Button onClick={this.handleReset} className={FormStyles.button}>{reset}</Button> }
        { cancel && <Button onClick={this.props.onCancel} className={FormStyles.button}>{cancel}</Button> }
      </FormControl>
    );
  }

  render () {
    let { button, buttons, controls, children, className, grid, layout, ...props } = this.props;

    className = classnames(
      className,
      getGrid(grid),
      FormStyles.form,
      FormStyles[layout]
    );

    let btns = buttons || button;

    return (
      <form {...props} onSubmit={this.handleSubmit} className={className}>
        {controls && this.renderControls()}
        {this.renderChildren(children)}
        {btns && this.renderButtons(btns)}
      </form>
    );
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  button: PropTypes.string,
  buttons: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  controls: PropTypes.array,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  grid: PropTypes.grid,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  labelWidth: PropTypes.number_string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.object
};

Form.defaultProps = {
  data: {},
  layout: 'aligned',
  disabled: false
};

export default fetchable(Form);
