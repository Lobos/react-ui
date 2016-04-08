'use strict';

import React, { PropTypes } from 'react';
import { register } from '../higherOrders/FormItem';
import Input from '../Input';
import Textarea from '../Textarea';
import RadioGroup from '../RadioGroup';

class FetchGroup extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fetch: props.value
    };
  }

  handleChange (key, value) {
    if (key === 'data' && value) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        this.props.onChange(new Error('data格式不正确，必须为json格式'));
        return;
      }
    }

    let { fetch } = this.state;
    fetch[key] = value;
    this.setState({ fetch });
    this.props.onChange(fetch);
  }

  render () {
    let { url, data, method='get' } = this.state.fetch;
    if (data) {
      data = JSON.stringify(data);
    }

    return (
      <div>
        <RadioGroup style={{ display: 'inline-block' }}
          value={method} data={['get', 'post', 'jsonp']}
          onChange={this.handleChange.bind(this, 'method')}
          />
        <Input type="text" grid={1/2} value={url} placeholder="url"
          onChange={this.handleChange.bind(this, 'url')} />
        <Textarea onChange={this.handleChange.bind(this, 'data')}
          style={{ marginTop: 10 }}
          placeholder="data, json格式, 可空"
          rows={3} trigger="blur" />
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
