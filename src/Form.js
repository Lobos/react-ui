'use strict';

import { Children, Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { forEach, isEqual } from './utils/objects';
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
    };

    this.itemUnbind = (name) => {
      delete this.items[name];
    };

    this.itemChange = (name, value, err) => {
      let data = this.state.data;
      //data = merge({}, data, {[name]: value});
      if (data[name] !== value) {
        data[name] = value;
        this.setState({ data });
      }

      this.items[name].$validation = err;
    };
  }
  
  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setState({ data: nextProps.data });
    }
  }

  validate () {
    let success = true;
    forEach(this.items, function (item) {
      let suc = item.$validation;
      if (suc === undefined) {
        suc = item.validate();
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
      this.props.onSubmit(this.getValue());
    }
  }

  renderChildren () {
    let { data } = this.state;
    return Children.map(this.props.children, (child) => {
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
