'use strict';

import { Children, Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { forEach, deepEqual } from './utils/objects';
import clone from './utils/clone';
import FormControl from './FormControl';
import FormSubmit from './FormSubmit';
import { fetchEnhance, FETCH_SUCCESS } from './higherOrders/Fetch';
import { getLang } from './lang';

import { requireCss } from './themes';
requireCss('form');

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: this.props.data
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);

    // don't need state
    this.items = {};
    this.validationPools = {};

    this.itemBind = (item) => {
      this.items[item.name] =item;

      // bind triger item
      if (item.valiBind) {
        item.valiBind.forEach((vb) => {
          this.validationPools[vb] = (this.validationPools[vb] || []).concat(item.validate);
        });
      }
    };

    this.itemUnbind = (name) => {
      delete this.items[name];
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

      let valiBind = this.validationPools[name];
      if (valiBind) {
        valiBind.forEach((validate) => {
          validate();
        });
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

  renderChildren () {
    let { data } = this.state;
    let { fetchStatus, disabled } = this.props;

    return Children.map(this.props.children, (child) => {
      if (!child) { return null };
      let { hintType, readOnly } = child.props;
      let props = {
        hintType: hintType || this.props.hintType,
        readOnly: readOnly || disabled,
        layout: this.props.layout
      };
      if (child.type === FormControl) {
        props.itemBind = this.itemBind;
        props.itemUnbind = this.itemUnbind;
        props.itemChange = this.itemChange;
        props.formData = data;
      } else if (child.type === FormSubmit) {
        props.disabled = disabled;
        if (fetchStatus !== FETCH_SUCCESS) {
          props.children = getLang('fetch.status')[fetchStatus];
        }
      }

      return cloneElement(child, props);
    });
  }

  render () {
    let { fetchStatus } = this.props;

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
        {fetchStatus !== FETCH_SUCCESS && <div className="rct-form-mask" />}
      </form>
    );
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  onSubmit: PropTypes.func,
  style: PropTypes.object
};

Form.defaultProps = {
  data: {},
  layout: 'inline',
  disabled: false
};

module.exports = fetchEnhance(Form);
