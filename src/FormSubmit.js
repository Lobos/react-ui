'use strict';

import { Component, PropTypes } from 'react';
import Button from './Button';

class FormSubmit extends Component {
  render () {
    let children = this.props.children;
    let content;
    if (Array.isArray(children)) {
      content = this.props.disabled ? children[1] : children[0];
    } else {
      content = children;
    }

    return (
      <div style={this.props.style} className="rct-control-group">
        <Button type="submit"
          status='primary'
          onClick={this.props.onClick}
          disabled={this.props.disabled}>
          {content}
        </Button>
      </div>
    );
  }
}

FormSubmit.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object
};

module.exports = FormSubmit;
