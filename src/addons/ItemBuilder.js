'use strict';

import React, { PropTypes } from 'react';
import Form from '../Form';
import FormControl from '../FormControl';
import FormSubmit from '../FormSubmit';
import Input from '../Input';
import Select from '../Select';
import Checkbox from '../Checkbox';

class ItemBuilder extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderTypeControls () {
  }

  handleSubmit (data) {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(data);
    }
  }

  render () {
    let { item } = this.props;
    item.type = item.type || 'text';

    return (
      <Form data={this.props.item} onSubmit={this.handleSubmit}>
        <FormControl grid={1/3} required name="type" label="类型" type="select"
          data={['text', 'integer', 'number', 'url', 'email', 'textarea', 'tree', 'select', 'checkbox', 'checkbox-group', 'radio-group', 'datetime', 'date', 'time']}
        />
        <FormControl grid={1/3} name="label" label="label文字" />
        <FormControl grid={1/3} required name="name" label="name" />
        <FormControl>
          <Checkbox name="required" text="必填" />
        </FormControl>

        <FormControl type="textarea" rows={2} autoHeight name="style" label="style" />

        <FormSubmit>确定</FormSubmit>
      </Form>
    );
  }
}

ItemBuilder.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func
};

ItemBuilder.defaultProps = {
  item: {}
}

module.exports = ItemBuilder;

