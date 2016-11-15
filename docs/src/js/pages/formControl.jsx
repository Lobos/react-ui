import React from 'react'
// import Refetch from 'refetch'
import Code from '../Code'
import Example from '../Example'
import { FormControl, Button, Icon, Datepicker } from 'rctui'
import { Cn, En } from '../Language'

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
          <Cn tag="h2">表单区块</Cn>
        </div>

        <div className="content pure-form">
          <Cn>表单中一个横行的区块，包含label提示，输入提示等等。如果一个区块只有一个FormItem，可以直接传入FormItem的props。</Cn>
          <Cn>
            <Code>
{`<FormControl
  className="string"
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
          </Cn>
          <En>
            <Code>
{`<FormControl
  className="string"
  label={string|element}
  name={string}           // input name, unique
  ignore={bool}           // if ignore is true, form data will ignore this filed, default is false
  type={string}           // FormItem type
  grid={{width, offset, responsive}} // see Grid
  {...validate}
  {...props}
>
  {children}              // FormItem
</FormControl>
  `}
            </Code>
          </En>

          <h2 className="subhead">validate props</h2>
          <Cn><em>FormControl</em> 会根据这些属性自动验证输入，自动生成提示文字和错误信息，文字在 <a href="#/lang">Lang</a> 中设置。</Cn>
          <Cn>
            <Code>
{`<FormControl
  min={int}       // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
  max={int}       // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
  required={bool} // 是否必填，默认为 false
  tip={string}    // 额外提示信息，如果设置，会替换自动生成提示信息
  type={string}   // 自动验证以下type: email,integer,number,alpha,alphanum,tel,url
  validator       // 自定义校验
  dispatch={[name]} // 触发Form内其他组件校验
/>
validator = {
  func: (value, form), // 指定一个方法校验。value为当前选中值，form为整个form表单数据
  reg: {string}        // 指定一个正则表达式，和func 二选一
}`}
            </Code>
          </Cn>
          <En>
            <Code>
{`<FormControl
  min={int}       // if value type is 'string' or 'array', value length must great than min; if value type if 'number', value must great than min;
  max={int}       // if value type is 'string' or 'array', value length must less than max; if value type if 'number', value must less than max;
  required={bool} // default is false
  tip={string}    // if tip is undefined, use generated text
  type={string}   // email,integer,number,alpha,alphanum,tel,url
  validator       // custom validator
  dispatch={[name]} // dispatch other component validate with the name
/>
// =========================
validator = {
  func: (value, formData), // custom validate function
  reg: {string}            // if func set, reg will be ignored
}`}
            </Code>
          </En>

          <h2 className="subhead">registered FormItem</h2>

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
          {this.renderExample('tel')}
          {this.renderExample('integer')}
          {this.renderExample('number')}
          {this.renderExample('password')}

          {this.renderExample('date', 'Datepicker')}
          {this.renderExample('time', 'Datepicker')}
          {this.renderExample('datetime', 'Datepicker')}

          <div>
            <p><em><b>textarea</b></em> => <a href="#/textarea">Textarea</a></p>
            <Example>
              <FormControl type="textarea" rows={5} />
            </Example>
          </div>

          <div>
            <p><em><b>json</b></em> => <a href="#/input">Textarea</a></p>
            <Example>
              <FormControl grid={1 / 2} type="json" rows={5} />
            </Example>
          </div>

          <div>
            <p><em><b>select</b></em> => <a href="#/select">Select</a></p>
            <Example>
              <FormControl
                type="select"
                required
                fetch={{ url: 'json/countries.json', cache: 3600 }}
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
                fetch={{ url: 'json/tree.json', cache: 3600 }}
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
                fetch={{ url: 'json/text-value.json', cache: 3600 }}
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
                fetch={{ url: 'json/text-value.json', cache: 3600 }}
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
                icons={[<Icon key={0} icon="favorite-outline" style={{color: 'red'}} />, <Icon key={1} icon="favorite" style={{color: 'red'}} />]}
               />
            </Example>
          </div>

          <div>
            <p><em><b>upload</b></em> => <a href="#/upload">Upload</a></p>
            <Example>
              <FormControl
                type="upload"
                grid={{ width: 1 }}
                name="test"
                action="/upload"
                accept="image/*"
                limit={3}
                content={<Button><Icon icon="upload" /> Choose a file</Button>} />
            </Example>
          </div>

          <h2 className="subhead">Remote validate</h2>
          <Example>
            <FormControl
              type="text"
              tip="name is 'lobos'"
              validator={{
                async: (value, formData, callback) => {
                  setTimeout(() => {
                    callback(value === 'lobos' ? true : new Error(value + ' already exists'))
                  }, 500)
                  /* ajax example
                  Refetch.get('/validate', { name: value }).then(res => {
                    callback(res.success ? true : new Error(res.msg))
                  })
                  */
                }
              }}
            />
          </Example>

          <h2 className="subhead">Children</h2>
          <Cn>0.6 可以任意使用已注册的表单组件</Cn>
          <Example>
            <FormControl label="two items">
              <Datepicker type="date"
                min="2016-1-22"
                required
                placeholder="startTime" />
              -
              <Datepicker type="date"
                max="2017-1-22"
                placeholder="endTime" />
            </FormControl>
          </Example>
        </div>
      </div>
    )
  }
}
