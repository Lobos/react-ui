'use strict';

import { Component, PropTypes } from 'react';
import Button from './Button';

class FormSubmit extends Component {
  render () {
    let children = this.props.children;
    let content;
    if (Array.isArray(children)) {
      content = this.props.locked ? children[1] : children[0];
    } else {
      content = children;
    }

    return (
      <div style={this.props.style} className="rct-control-group">
        <Button type="submit"
          status='primary'
          onClick={this.props.onClick}
          disabled={this.props.locked}>
          {content}
        </Button>
      </div>
    );
  }
}

FormSubmit.propTypes = {
  children: PropTypes.any,
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object
};

module.exports = FormSubmit;
