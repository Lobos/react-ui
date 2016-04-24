'use strict';

import React, { PropTypes } from 'react';
import Form from '../Form';
import FormControl from '../FormControl';
import { COMPONENTS } from '../higherOrders/FormItem';
import FormSubmit from '../FormSubmit';
import Checkbox from '../Checkbox';
import Input from '../Input';
import Textarea from '../Textarea';
import '../Select';
import '../Tree';
import '../Datepicker';
import RadioGroup from '../RadioGroup';
import '../CheckboxGroup';
import FetchGroup from './FetchGroup';

const TYPES = Object.keys(COMPONENTS).sort();

class ItemBuilder extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: props.item.type || 'text',
      datatype: props.item.fetch ? 'fetch' : 'data'
    };

    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleType (type) {
    this.setState({ type });
  }

  handleSubmit (item) {
    if (item.grid) {
      item.grid = parseFloat(item.grid);
    }
    if (item.data) {
      item.data = JSON.parse(item.data);
    }
    this.props.onSubmit(item);
  }

  renderGrid () {
    if (['alpha','alphanum','email','integer','number','password','select','text','textarea','url'].indexOf(this.state.type) < 0) {
      return;
    }

    return (
      <FormControl label="宽度" type="radio-group" name="grid" data={[
        { id: 0.25, text: '短' },
        { id: 0.5, text: '中' },
        { id: 1, text: '长' }
      ]} />
    );
  }

  renderDataSource () {
    if (['checkbox-group','radio-group','select','tree'].indexOf(this.state.type) < 0) {
      return;
    }

    let { datatype } = this.state;
    let tip = datatype === 'data' ?
              <span>静态数据为json格式，可以使用array，keyvalue格式object，或者复杂array</span> :
              undefined 
    return (
      <div>
        <FormControl label="数据源" tip={tip}>
          <RadioGroup value={datatype} onChange={(datatype) => this.setState({ datatype })}
            data={[
              { id: 'data', text: '静态数据' },
              { id: 'fetch', text: '服务端获取(fetch)' },
            ]} />

          {
            datatype === 'data' &&
            <Textarea trigger="blur" style={{ marginTop: 10 }} rows={5} name="data"
              validator={{ func: (value) => {
                try {
                  JSON.parse(value);
                  return true;
                } catch (e) {
                  return new Error('数据格式错误');
                }
              }}} />
          }
        </FormControl>

        { datatype === 'fetch' &&
          <FormControl label="fetch参数">
            <FetchGroup ref="fg" name="fetch" />
          </FormControl>
        }
      </div>
    );
  }

  getLenTip (type) {
    if (['checkbox', 'datetime', 'date', 'time'].indexOf(type) >= 0) {
      return null;
    }

    const component = COMPONENTS[type];
    switch (component.valueType) {
      case 'number':
        return ['最小值', '最大值'];
      case 'array':
        return ['最少选择项', '最多选择项'];
      default:
        return ['最少字符数', '最多字符数'];
    }
  }

  render () {
    let { item } = this.props;
    item.type = this.state.type;
    if (item.data) {
      item.data = JSON.stringify(item.data);
    }
    let lenTip = this.getLenTip(item.type);

    return (
      <Form data={item} style={{ marginRight: 40 }} onSubmit={this.handleSubmit}>
        <FormControl
          onChange={this.handleType}
          grid={1/2}
          required
          name="type"
          label="类型"
          type="select"
          data={TYPES} />

        <FormControl grid={1/2} name="label" label="label文字" />
        <FormControl grid={1/2} required name="name" label="name" />
        <FormControl grid={1/2} name="placeholder" label="placeholder" />
        <FormControl>
          <Checkbox name="required" text="必填" />
          <Checkbox name="readOnly" text="只读" />
        </FormControl>

        { 
          lenTip &&
          <FormControl>
            <span>{lenTip[0]}</span><Input grid={1/8} type="integer" name="min" />
            {' '}
            <span>{lenTip[1]}</span><Input grid={1/8} type="integer" name="max" />
          </FormControl>
        }

        { this.renderGrid() }
        { this.renderDataSource() }

        <FormControl type="textarea"
          trigger="blur"
          rows={2}
          autoHeight
          name="style"
          label="style"
          tip="使用css格式，例：width:100px; margin-left: 10px;" />

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

