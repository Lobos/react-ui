'use strict';

import React, { PropTypes } from 'react';
import clone from '../utils/clone';
import Form from '../Form';
import FormControl from '../FormControl';
import FormSubmit from '../FormSubmit';
import '../Input';
import '../Textarea';

class ControlBuilder extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (data) {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(data);
    }
  }

  render () {
    return (
      <Form data={this.props.control} onSubmit={this.handleSubmit}>
        <FormControl grid={1/3} name="label" label="label文字" />
        <FormControl grid={4/5} type="textarea" name="tip" label="tip文字" rows={3} />
        <FormSubmit>确定</FormSubmit>
      </Form>
    );
  }
}

ControlBuilder.propTypes = {
  control: PropTypes.object,
  onSubmit: PropTypes.func
};

module.exports = ControlBuilder;
