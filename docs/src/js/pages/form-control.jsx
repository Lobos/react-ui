'use strict'

let React = require('react')
let Prettify = require('../mixins/prettify')
import {FormControl, Icon} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/FormControl',

  mixins: [Prettify],

  renderExample: function (type, component) {
    component = component || 'Input'
    return (
      <div>
        <p><em><b>{type}</b></em> => <a href={"#/" + component.toLowerCase()}>{component}</a></p>
        <div className="split">
          <div className="pure-u-1 pure-u-lg-1-2">
            <FormControl width={24} type={type} />
          </div>

          <div className="pure-u-1 pure-u-lg-1-2">
            <pre className="prettyprint">
              {`<FormControl type="${type}" />`}
            </pre>
          </div>
        </div>
      </div>
    )
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>FormControl</h1>
          <h2>表单元素</h2>
        </div>

        <div className="content pure-form">
          <p>一系列表单控件的马甲，统一封装用来实现表单数据验证，输入提示，动态创建表单等功能。</p>
          <pre className="prettyprint">
{`<FormControl
  className="string",     // 需要额外添加的 className
  label={string|element}  // 提示文字
  name={string}           // 数据key名称，唯一
  ignore={bool}           // 为true时，不提交该项数据，默认为 false
  type={string}           // 控件注册名称
  width={int}             // grid 宽度，1-24
  {...validate}           // 数据验证
  {...props}              // 控件属性
/>`}
          </pre>

          <h2 className="subhead">数据验证属性</h2>
          <p><em>FormControl</em> 会根据这些属性自动验证输入，自动生成提示文字和错误信息，文字在 <a href="#/lang">Lang</a> 中设置。</p>
          <pre className="prettyprint">
{`<FormControl
  equal={string}  // 判断值是否与另一个 FormControl 相等，string 为另一个 FormControl name
  min={int}       // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
  max={int}       // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
  required={bool} // 是否必填，默认为 false
  tip={string}    // 额外提示信息
  type={string}   // 会自动判断某些类型 type，如 email, integer, url 等
/>`}
          </pre>

          <h2 className="subhead">已注册控件</h2>

          <p><em><b>text</b></em> => <a href="#/input">Input</a></p>
          <div className="split">
            <div className="pure-u-1 pure-u-lg-1-2">
              <FormControl width={24} required={true} type="text" min={2} max={10} />
            </div>

            <div className="pure-u-1 pure-u-lg-1-2">
              <pre className="prettyprint">
{`<FormControl
  required={true}
  type="text"
  min={2}
  max={10} />`}
              </pre>
            </div>
          </div>

          {this.renderExample('email')}
          {this.renderExample('alpha')}
          {this.renderExample('alphanum')}
          {this.renderExample('url')}
          {this.renderExample('integer')}
          {this.renderExample('number')}
          {this.renderExample('password')}

          {this.renderExample('date', 'Datetime')}
          {this.renderExample('time', 'Datetime')}
          {this.renderExample('datetime', 'Datetime')}

          <div>
            <p><em><b>textarea</b></em> => <a href="#/input">Input</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl width={24} type="textarea" rows={5} />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
                  {`<FormControl width={24} type="textarea" rows={5} />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <p><em><b>select</b></em> => <a href="#/select">Select</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl width={24}
                  type="select"
                  required={true}
                  src="json/countries.json"
                  filterAble={true}
                  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
                  valueTpl="{country}-{en}"
                  mult={true}
                  min={2}
                  max={6}
                 />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
{`<FormControl width={24}
  type="select"
  required={true}
  src="json/countries.json"
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  mult={true}
  min={2}
  max={6}
 />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <p><em><b>tree</b></em> => <a href="#/tree">Tree</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl
                  type="tree"
                  checkAble={true}
                  src="json/tree.json"
                  textTpl="{text}({id})"
                  valueTpl="{id}"
                 />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
{`<FormControl
  type="tree"
  checkAble={true}
  src="json/tree.json"
  textTpl="{text}({id})"
  valueTpl="{id}"
 />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <p><em><b>checkbox</b></em> => <a href="#/checkbox">Checkbox</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl type="checkbox" text="I'm a checkbox" />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
                  {`<FormControl type="checkbox" text="I'm a checkbox" />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <p><em><b>checkbox-group</b></em> => <a href="#/checkbox-group">CheckboxGroup</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl
                  type="checkbox-group"
                  src="json/text-value.json"
                  textTpl="{text}"
                  valueTpl="{id}"
                  min={2}
                  max={4}
                 />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
{`<FormControl
  type="checkbox-group"
  src="json/text-value.json"
  textTpl="{text}"
  valueTpl="{id}"
  min={2}
  max={4}
 />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <p><em><b>radio-group</b></em> => <a href="#/radio-group">RadioGroup</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl
                  type="radio-group"
                  src="json/text-value.json"
                  textTpl="{text}"
                  valueTpl="{id}"
                 />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
{`<FormControl
  type="radio-group"
  src="json/text-value.json"
  textTpl="{text}"
  valueTpl="{id}"
 />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <p><em><b>rating</b></em> => <a href="#/rating">RadioGroup</a></p>
            <div className="split">
              <div className="pure-u-1 pure-u-lg-1-2">
                <FormControl
                  type="rating"
                  maxValue={10}
                  tip="亲，给个好评吧"
                  required={true}
                  icons={[<Icon icon="favorite-outline" style={{color: 'red'}} />, <Icon icon="favorite" style={{color: 'red'}} />]}
                 />
              </div>

              <div className="pure-u-1 pure-u-lg-1-2">
                <pre className="prettyprint">
{`<FormControl
  required={true}
  maxValue={10}
  tip="亲，给个好评吧"
  type="rating"
  icons={[<Icon icon="favorite-outline" style={{color: 'red'}} />, <Icon icon="favorite" style={{color: 'red'}} />]}
 />`}
                </pre>
              </div>
            </div>
          </div>

          <h2 className="subhead">自定义 FormControl</h2>
          <p>
            <em>FormControl</em> 提供一个静态方法 <em>register</em>，将一个 <em>Component</em> 注册为 <em>FormControl</em> 成员。<br />
            每个注册为 <em>FormControl</em> 的控件必须实现 <em>getValue()</em> , <em>setValue(data)</em> 这两个接口。
          </p>
          <pre className="prettyprint">
{`FormControl.register(
  type,       // string，控件类型，唯一。如果同名，后注册的将会覆盖先注册的控件
  render,     // function，匹配到类型时，调用render方法返回相应控件
  valueType,  // 'string|array|number'，控件值类型，三选一，数据验证时调用
)`}
          </pre>
        </div>
      </div>
    )
  }
})
