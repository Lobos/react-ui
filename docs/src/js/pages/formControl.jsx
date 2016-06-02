'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
let {FormControl, Button, Input, Icon, Datepicker, Grid} = global.uiRequire()

module.exports = class extends React.Component {
  renderExample (type, component) {
    component = component || 'Input'
    return (
      <div>
        <p><em><b>{type}</b></em> => <a href={'#/' + component.toLowerCase()}>{component}</a></p>
        <div>
          <FormControl grid={{width: 1 / 4}} type={type} />
        </div>
        <Code>
          {`<FormControl grid={{width: 1/4}} type="${type}" />`}
        </Code>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>FormControl</h1>
          <h2>表单区块</h2>
        </div>

        <div className="content pure-form">
          <p>表单中一个横行的区块，包含label提示，输入提示等等。如果一个区块只有一个FormItem，可以直接传入FormItem的props。</p>
          <Code>
{`<FormControl
  className="string",     // 需要额外添加的 className
  label={string|element}  // 提示文字
  name={string}           // 数据key名称，唯一
  ignore={bool}           // 为true时，不提交该项数据，默认为 false
  type={string}           // 控件注册名
  grid={{width, offset, responsive}} // 宽度，详见Grid
  {...validate}           // 数据验证
  {...props}              // 控件属性
>
  {children}              // 表单组件
</FormControl>
  `}
          </Code>

          <h2 className="subhead">数据验证属性</h2>
          <p><em>FormControl</em> 会根据这些属性自动验证输入，自动生成提示文字和错误信息，文字在 <a href="#/lang">Lang</a> 中设置。</p>
          <Code>
{`<FormControl
  min={int}       // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
  max={int}       // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
  required={bool} // 是否必填，默认为 false
  tip={string}    // 额外提示信息，如果设置，会替换自动生成提示信息
  type={string}   // 自动验证以下type: email,integer,number,alpha,alphanum,tel,url
  validator       // 自定义校验
/>
validator = {
  func: (value, form), // 指定一个方法校验。value为当前选中值，form为整个form表单数据
  reg: {string},       // 指定一个正则表达式，和func 二选一
  bind: [string]       // 当form内其他控件数据变化时，触发校验，参数为控件name
}`}
          </Code>

          <h2 className="subhead">已注册控件</h2>

          <div>
            <p><em><b>text</b></em> => <a href="#/input">Input</a></p>
            <Example>
<FormControl required grid={{width: 1 / 4}} type="text" min={2} max={10} />
            </Example>
          </div>

          {this.renderExample('email')}
          {this.renderExample('alpha')}
          {this.renderExample('alphanum')}
          {this.renderExample('url')}
          {this.renderExample('integer')}
          {this.renderExample('number')}
          {this.renderExample('password')}

          {this.renderExample('date', 'Datepicker')}
          {this.renderExample('time', 'Datepicker')}
          {this.renderExample('datetime', 'Datepicker')}

          <div>
            <p><em><b>textarea</b></em> => <a href="#/input">Input</a></p>
            <Example>
<FormControl type="textarea" rows={5} />
            </Example>
          </div>

          <div>
            <p><em><b>select</b></em> => <a href="#/select">Select</a></p>
            <Example>
<FormControl
  type="select"
  required
  fetch={{url:'json/countries.json', cache: 3600}}
  filterAble
  optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  mult
  min={2}
  max={6}
 />
             </Example>
          </div>

          <div>
            <p><em><b>tree</b></em> => <a href="#/tree">Tree</a></p>
            <Example>
<FormControl
  type="tree"
  checkAble
  fetch={{url:'json/tree.json', cache:3600}}
  textTpl="{text}({id})"
  valueTpl="{id}"
 />
            </Example>
          </div>

          <div>
            <p><em><b>checkbox</b></em> => <a href="#/checkbox">Checkbox</a></p>
            <Example>
<FormControl type="checkbox" text="I'm a checkbox" />
            </Example>
          </div>

          <div>
            <p><em><b>checkbox-group</b></em> => <a href="#/checkbox-group">CheckboxGroup</a></p>
            <Example>
<FormControl
  type="checkbox-group"
  fetch={{url:'json/text-value.json', cache:3600}}
  textTpl="{text}"
  valueTpl="{id}"
  min={2}
  max={4}
 />
            </Example>
          </div>

          <div>
            <p><em><b>radio-group</b></em> => <a href="#/radio-group">RadioGroup</a></p>
            <Example>
<FormControl
  type="radio-group"
  fetch={{url:'json/text-value.json', cache:3600}}
  textTpl="{text}"
  valueTpl="{id}"
 />
            </Example>
          </div>

          <div>
            <p><em><b>rating</b></em> => <a href="#/rating">Rating</a></p>
            <Example>
<FormControl
  type="rating"
  maxValue={10}
  tip="亲，给个好评吧"
  required
  icons={[<Icon icon="favorite-outline" style={{color: 'red'}} />, <Icon icon="favorite" style={{color: 'red'}} />]}
 />
            </Example>
          </div>

          <div>
            <p><em><b>upload</b></em> => <a href="#/upload">Upload</a></p>
            <Example>
<FormControl
  type="upload"
  autoUpload
  grid={{width:1}}
  name="test"
  action="http://216.189.159.94:8080/upload"
  accept="image/*"
  limit={3}
  content={<Button><Icon icon="upload" /> 选择文件</Button>} />
            </Example>
          </div>

          <h2 className="subhead">Children</h2>
          <p>0.6 可以任意使用已注册的表单组件</p>
          <Example>
<FormControl label="two items">
  <Datepicker type="date"
    min="2016-1-22"
    required
    placeholder="startTime" />
  至
  <Datepicker type="date"
    max="2017-1-22"
    placeholder="endTime" />
</FormControl>
          </Example>

          <h2 className="subhead">注册自定义组件</h2>
          <div>见<a href="#/formitem">FormItem</a></div>

        </div>
      </div>
    )
  }
}
