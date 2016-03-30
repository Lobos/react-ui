'use strict';

import React, { PropTypes } from 'react';
import { register } from '../higherOrders/FormItem';
import Input from '../Input';
import RadioGroup from '../RadioGroup';

class FetchGroup extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fetch: props.value
    };
  }

  handleChange (key, value) {
    let { fetch } = this.state;
    fetch[key] = value;
    this.setState({ fetch });
    this.props.onChange(fetch);
  }

  render () {
    let { url, method='get' } = this.state.fetch;

    return (
      <div>
        <RadioGroup style={{ display: 'inline-block' }}
          value={method} data={['get', 'post']}
          onChange={this.handleChange.bind(this, 'method')}
          />
        <Input type="text" grid={1/2} value={url} placeholder="url"
          onChange={this.handleChange.bind(this, 'url')} />
      </div>
    );
  }
}

FetchGroup.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object
}

FetchGroup.defaultProps = {
  value: {}
}

module.exports = register(FetchGroup);
