'use strict';

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const { Form, FormControl, FormItem } = global.uiRequire();

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>FormItem</h1>
        <h2>表单元素</h2>
      </div>

      <div className="content pure-form">
        <p>
          一系列表单控件的higherorder component，统一封装用来实现表单数据验证，输入提示等功能。<br />
          ReactUI的所有表单组件都是FormItem组件，一般情况下，不需要直接使用FormItem。<br />
          自己定义的组件如果想要加入Form，实现自动化校验和整体提交数据，有两个方式实现。
        </p>

        <h2 className="subhead">Component</h2>
        <div>可以直接当作Component，把自定义组件当作children传入。一个FormItem只能接受一个自定义组件，并且这个组件必须实现一个<em>onChange(value)</em>事件返回值，接受<em>value</em>作为props传入值</div>
        <Code>
{`<FormItem
  className="string",     // 需要额外添加的 className
  name={string}           // 数据key名称，唯一
  type={string}           // 自动验证以下type: email,integer,number,alpha,alphanum,tel,url
  min={int}               // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
  max={int}               // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
  required={bool}         // 是否必填，默认为 false
  tip={string}            // 额外提示信息，如果设置，会替换自动生成提示信息
  validator={             // 自定义校验
    func: (value, form), // 指定一个方法校验。value为当前选中值，form为整个form表单数据
    reg: {string},       // 指定一个正则表达式，和func 二选一
    bind: [string]       // 当form内其他控件数据变化时，触发校验，参数为控件name
  }
>
  {element}               // 只能接受一个element
</FormItem>`}
        </Code>
        <Example>
<Form layout="aligned" data={{input: 'init value'}}>
  <FormControl label="label文字">
    <FormItem required min={4} max={12} name="input">
      <input className="rct-form-control" />
    </FormItem>
  </FormControl>
</Form>
        </Example>

        <h2 className="subhead">register</h2>
        <div>将自定义组件注册到FormItem，可以通过FormControl的快捷方式调用</div>
        <Code>
{`import { register } from 'rctui/higherOrders/FormItem';
register(
  Component,    // 自定义组件
  types,        // 注册到FormControl的type，字符串或数组
  options:{
    valueType,  // 数据类型，用来进行数据校验，值为'number|string|array'，默认值为'string'
    render      // 处理特殊的render，一般不需要
  }
);

// example
class Input extends React.Component { ... }
register(Input, ['text'], {
  valueType: 'string',
  render: function (props) {
    return <Input someProps="xxx" {...props} />;
  }
})`}
        </Code>
      </div>
    </div>
  );
};
