import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Form, FormControl, FormItem, Select, Input } from 'rctui'
import { Cn, En } from '../Language'

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      position: ''
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>FormItem</h1>
          <Cn tag="h2">表单元素</Cn>
        </div>

        <div className="content pure-form">
          <Cn>
            一系列表单控件的higherorder component，统一封装用来实现表单数据验证，输入提示等功能。<br />
            ReactUI的所有表单组件都是FormItem组件，一般情况下，不需要直接使用FormItem。<br />
            自己定义的组件如果想要加入Form，实现自动化校验和整体提交数据，有两个方式实现。
          </Cn>
          <En>
            FormItem is a higherorder component, help for validate input value, show tip text or error text. <br />
            Under normal circumstances, you don't need to use this Component because all form components were registered in FromItem, include Input, Select, Checkbox, CheckboxGroup, Radio, RadioGroup..
          </En>

          <h2 className="subhead">Component</h2>
          <Cn>可以直接当作Component，把自定义组件当作children传入。一个FormItem只能接受一个自定义组件，并且这个组件必须实现一个<em>onChange(value)</em>事件返回值，接受<em>value</em>作为props传入值</Cn>
          <En>FormItem can use as a Component, only accept an element as child. the element must has onChange and value props like 'input'.</En>
          <Cn>
            <Code>{`
              <FormItem
                className="string"
                name={string}           // 字段名，表单内唯一
                type={string}           // 'email|integer|number|alpha|alphanum|tel|url'
                min={int}               // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
                max={int}               // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
                required={bool}         // 是否必填，默认为 false
                dispatch={[name]}       // 联动校验，当前FormItem改变会触发指定name的组件校验
                popover={string}        // 'top-left|top|top-right|left|right|bootom-left|bootom|bootom-right', 默认为undefined
                tip={string}            // 额外提示信息，如果设置，会替换自动生成提示信息
                validator={             // 自定义校验
                  func: (value, form), // 指定一个方法校验。value为当前选中值，form为整个form表单数据
                  reg: {string},       // 指定一个正则表达式，和func 二选一
                  async: (value, formData, callback) // 异步校验，callback 返回结果
                }
              >
                {element}               // 只能接受一个element
              </FormItem>`}
            </Code>
          </Cn>
          <En>
            <Code>{`
              <FormItem
                className="string"
                name={string}           // filed name, unique in the form
                type={string}           // 'email|integer|number|alpha|alphanum|tel|url'
                min={int}               // if value type is 'string' or 'array', value length must great than min; if value type if 'number', value must great than min;
                max={int}               // if value type is 'string' or 'array', value length must less than max; if value type if 'number', value must less than max;
                required={bool}         // default is false
                dispatch={[name]}       // when this value change, dispatch other item (form[name]) validate
                tip={string}            // tip text, overwrite generated tip text
                popover={string}        // one of 'top-left|top|top-right|left|right|bootom-left|bootom|bootom-right', default value is undefined
                validator={             // custom validation
                  func: (value, form),  // first argument is the filed value, second is the form data
                  reg: {string},        // regular expressions, if func was set, reg will ignore
                  async: (value, formData, callback) //
                }
              >
                {element}               // only one element accept
              </FormItem>`}
            </Code>
          </En>
          <Example>
            <Form layout="aligned" data={{input: 'init value'}}>
              <FormControl label="label text">
                <FormItem required min={4} max={12} name="input">
                  <input />
                </FormItem>
              </FormControl>
            </Form>
          </Example>

          <h2 className="subhead">popover</h2>
          <Cn>如果FormItem不在一个FormControl内，又需要显示errorText，可以使用popover属性</Cn>
          <En>If the FormItem not in a FormControl, you can use popover show the error text.</En>
          <Example>
            <Select value={this.state.position}
              style={{width: 180}}
              popover={this.state.position}
              onChange={v => this.setState({ position: v })}
              data={[
                'top-left',
                'top',
                'top-right',
                'left',
                'right',
                'bottom-left',
                'bottom',
                'bottom-right'
              ]}
              validator={() => { return new Error('popover test') }}
            />
            {' '}
            <Input min={4} max={5} popover="top-left" />
          </Example>

          <h2 className="subhead">register</h2>
          <Cn>将自定义组件注册到FormItem，可以通过FormControl的快捷方式调用</Cn>
          <En>You can registered you component to FormItem, then use FormControl.</En>
          <Code>{`
            import { register } from 'rctui/higherOrders/FormItem';
            register(
              types,        // string or array[string], unique
              options:{
                valueType,  // 'number|string|array'，default is 'string'
                render      // special render function, not required
              },
              Component     // custom component
            );

            // example
            class MyInput extends React.Component { ... }

            register(
              ['my-text'],
              {
                valueType: 'string',
                render: function (props) {
                  return <Input someProps="xxx" {...props} />;
                }
              },
              MyInput
            )

            <FormControl type="my-text" {...props} />
          `}
          </Code>
        </div>
      </div>
    )
  }
}
