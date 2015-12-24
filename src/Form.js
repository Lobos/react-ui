'use strict';

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import { forEach } from './utils/objects';
import FormControl from './FormControl';
import FormSubmit from './FormSubmit';

import { requireCss } from './themes';
requireCss('form');

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  
  componentWillMount () {
    this.fetchData(this.props.data);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== this.props.data) {
      this.fetchData(nextProps.data);
    }
  }

  fetchData (data) {
    if (typeof data === 'function') {
      data.then((res) => {
        this.fetchData(res);
      })();
      return;
    }
    this.setState({ data });
    this.setData(data);
  }

  getValue () {
    let data = this.state.data;
    forEach(this.refs, (ref, k) => {
      if (!ref.props.ignore) {
        data[k] = ref.getValue();
      }
    });
    return data;
  }

  setValue (key, value) {
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  }

  setData (data) {
    forEach(this.refs, (ref, k) => {
      ref.setValue(data[k]);
    });
  }

  equalValidate (targetRef, equalRef) {
    let self = this;
    return function () {
      let target = self.refs[targetRef];
      if (!target) {
        console.warn(`equal target '${targetRef}' not existed`);
        return false;
      }
      let equal = self.refs[equalRef];
      return target.getValue() === equal.getValue();
    };
  }

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      let props = {
        hintType: child.props.hintType || this.props.hintType,
        readOnly: child.props.readOnly || this.props.locked,
        layout: this.props.layout
      };
      if (child.type === FormControl) {
        if (!child.props.name) {
          console.warn('FormControl must have a name!');
          return null;
        }
        props.ref = child.props.name;
        if (this.state.data[child.props.name] !== undefined) {
          props.value = this.state.data[child.props.name];
        }
        if (child.props.equal) {
          props.onValidate = this.equalValidate(child.props.equal, child.props.name);
        }
      } else if (child.type === FormSubmit) {
        props.locked = this.props.locked;
      }

      child = React.cloneElement(child, props);
      return child;
    });
  }

  getReference (name) {
    return this.refs[name];
  }

  validate () {
    let success = true;
    forEach(this.refs, function (child) {
      if (child.props.ignore) {
        return;
      }
      let suc = child.validate();
      success = success && suc;
    });
    return success;
  }

  handleSubmit (event) {
    if (this.props.locked) {
      return;
    }

    event.preventDefault();
    this.onSubmit();
  }

  onSubmit () {
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
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.style} className={className}>
        {this.renderChildren()}
      </form>
    );
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]).isRequired,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  locked: PropTypes.bool,
  onSubmit: PropTypes.func,
  style: PropTypes.object
};

Form.defaultProps = {
  data: {},
  layout: 'inline',
  locked: false
};

module.exports = Form;
