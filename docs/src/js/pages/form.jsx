import React from 'react'
import Code from '../Code'
import Example from '../Example'
import Refetch from 'refetch'
import { Cascade, Form, FormControl, Button, Icon, Input, InputGroup, FormText,
  DatepickerRange, RadioGroup, FormItem, If, Upload, Grid } from 'rctui'
import Editor from 'rctui/addons/Editor'
import { Cn, En } from '../Language'

const HEARTS = [
  <Icon size={2} key={1} icon="favorite-outline" style={{color: 'red'}} />,
  <Icon size={2} key={2} icon="favorite" style={{color: 'red'}} />
]

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      layout: 'inline'
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Form</h1>
          <Cn tag="h2">表单</Cn>
        </div>

        <div className="content">
          <Cn>
            <Code>
{`<Form
  buttons={
    submit: 'string',   // submit 按钮文字
    primary: 'string',  // 和 submit 按钮相同，区别是不会触发 enter 提交
    reset: 'string',    // reset 按钮文字
    cancel: 'string',   // cancel 按钮文字
    others: [Button]    // 其他自定义按钮
  }
  data={object}         // 数据，object
  disabled={bool}       // 如果 form 设置为disabled，所有的表单组件全部变为 readOnly
  fetch={object}        // 获取服务端表单数据，如果传入了data，fetch无效
  hintType={string}     // 信息提示方式，可选值为 "block", "pop", "inline"，"none"
                           layout 为 stacked, aligned 时，默认为 "block"
                           layout 为 inline 时，默认为 "pop"
                           会被 FormControl 的 hintType 覆盖
  initValidate={bool}   // 在Form加载时校验data，默认值为 false
  labelWidth={string}   // label 宽度，默认值为'10rem'
  layout={string}       // 布局，可选值为 "aligned", "stacked", "inline"，默认为 "aligned"
  onSubmit={function(   // 点击提交按钮，数据验证成功后回调函数
    data:object
  )}
  onCancel={function}   // 点击cancel按钮回调函数
  onReset={function}    // 点击reset按钮回调函数
  >
  {children}
</Form>`}
            </Code>
          </Cn>
          <En>
            <Code>
{`<Form
  buttons={
    submit: 'string',   // submit button text
    primary: 'string',  // like submit, prevent 'enter' key submit
    reset: 'string',    // reset button text
    cancel: 'string'    // cancel button text
  }
  data={object}         //
  disabled={bool}       // if form is disabled, all formitem's prop readOnly will be true
  fetch={object}        // if data set, fetch will be ignored
  hintType={string}     // 'block|pop|inline|none'
                           if layout is 'stacked' or 'aligned', default value is 'block'
                           if layout is 'inline', default is 'pop'
  initValidate={bool}   // validate data when Form mount, default value is false
  labelWidth={string}   // default value is '10rem'
  layout={string}       // 'aligned|stacked|inline', default value is 'aligned'
  onSubmit={function(
    data:object
  )}
  onCancel={function}
  onReset={function}
  >
  {children}
</Form>`}
            </Code>
          </En>
          <p><a href="#/fetch">fetch see here</a></p>
          <Cn>
            0.6 版更新，data不再支持dataSource，改用fetch<br />
            0.3 版更新，From 不再提供内置 Ajax 提交功能，需要在onSubmit中进行提交
          </Cn>

          <h2 className="subhead">layout</h2>

          <Example>
<RadioGroup style={{ marginBottom: '2rem', borderBottom: 'solid 1px #ddd' }}
  data={['inline', 'aligned', 'stacked']}
  value={this.state.layout}
  onChange={layout => this.setState({ layout })} />

<Form button="Submit" layout={this.state.layout}>
  <FormControl grid={1 / 4} label="name" name="name" type="text" min={2} max={6} />
  <FormControl grid={1 / 4} name="email" placeholder="email" type="email" />
  <FormControl grid={1 / 3} name="nationality" label="nationality" type="select"
    data={['Chinese', 'American', 'Russian', 'Japanese', 'English', 'Spainish']} />
</Form>
          </Example>

          <h2 className="subhead">fetch / post data</h2>

          <Example>
            <Form onSubmit={formData => console.log(formData)}
              fetch={'json/form.json'}
              buttons={{ primary: 'Submit', reset: 'Reset', others: [<Button key="test">test</Button>] }}>
              <FormControl label="id">
                <FormText>{d => d.id}</FormText>
              </FormControl>

              <FormControl name="text"
                label="text"
                type="text"
                grid={{width: 12 / 24}}
                min={2}
                max={6} />

              <FormControl label="email">
                <InputGroup grid={1 / 2}>
                  <Icon icon="email" />
                  <Input name="email" type="email" />
                </InputGroup>
              </FormControl>

              <FormControl
                label="remote check"
                type="text"
                grid={{ width: 1 / 2 }}
                name="ajax"
                tip="value is 'lobos'"
                validator={{
                  async: (value, formData, callback) => {
                    setTimeout(() => {
                      callback((value === 'lobos' || !value) ? true : new Error(value + ' already exists'))
                    }, 500)
                    /* ajax example
                    Refetch.get('/validate', { name: value }).then(res => {
                      callback(res.success ? true : new Error(res.msg))
                    })
                    */
                  }
                }}
              />

              <Grid width={1 / 2}>
                <FormControl grid={1}
                  name="alpha"
                  label="alpha"
                  required
                  type="alpha" />
              </Grid>

              <Grid width={1 / 2}>
                <FormControl grid={1}
                  name="alphanum"
                  label="alphanum"
                  type="alphanum" />
              </Grid>

              <Grid width={1 / 2}>
                <FormControl grid={1}
                  name="integer"
                  min={120}
                  max={3200}
                  label="integer"
                  defaultValue={123}
                  type="integer" />
              </Grid>

              <Grid width={1 / 2}>
                <FormControl grid={1}
                  name="number"
                  label="number"
                  type="number" />
              </Grid>

              <FormControl label="number - integer">
                <FormText>{(d) => <Input readOnly value={d.number - d.integer} /> }</FormText>
              </FormControl>

              <FormControl grid={{width: 16 / 24}}
                name="password"
                min={6}
                max={20}
                label="password"
                dispatch={['repassword']}
                type="password" />

              <FormControl grid={{width: 16 / 24}}
                name="repassword"
                ignore
                label="repeat password"
                type="password"
                tip=""
                validator={
                  (value, formData) => {
                    let password = formData.password
                    if (!value ? !password : value === password) {
                      return true
                    } else {
                      return new Error('This value should be the same as the password.')
                    }
                  }
                } />

              <FormControl grid={{width: 17 / 24}}
                name="url"
                label="url"
                type="url" />

              <FormControl grid={{width: 17 / 24}}
                name="readonly"
                readOnly
                label="readonly"
                type="text" />

              <FormControl name="checkbox"
                type="checkbox"
                checkValue={1}
                defaultValue={1}
                text="show if" />

              <If predicate={(formData) => formData.checkbox === 1}>
                <FormControl label="if" type="text" name="if" />
              </If>

              <FormControl name="datetime"
                type="datetime"
                label="datetime" />

              <FormControl label="datetime range">
                <DatepickerRange type="date" min="2016-03-03" max="2016-08-21"
                  required name="dateRange" />
              </FormControl>

              <FormControl label="mult input" tip="each field require 5 alphanumeric characters">
                <Input name="mult1" type="alphanum" min={5} max={5} grid={1 / 6} />
                <span>-</span>
                <Input name="mult2" type="alphanum" min={5} max={5} grid={1 / 6} />
                <span>-</span>
                <Input name="mult3" type="alphanum" min={5} max={5} grid={1 / 6} />
                <span>-</span>
                <Input name="mult4" type="alphanum" min={5} max={5} grid={1 / 6} />
              </FormControl>

              <FormControl name="checkboxgroup"
                required
                min={2}
                fetch={{url: 'json/text-value.json', cache: 3600}}
                label="checkbox group"
                type="checkbox-group" />

              <FormControl label="cascade">
                <Cascade name="cascade" grid={1 / 2} fetch={'json/tree.json'} />
              </FormControl>

              <FormControl name="radiogroup"
                required
                fetch={{url: 'json/text-value.json', cache: 3600}}
                label="radio group"
                inline={false}
                type="radio-group" />

              <FormControl name="rating"
                label="rating"
                required
                icons={HEARTS}
                maxValue={10}
                tip=""
                type="rating" />

              <FormControl
                grid={2 / 3}
                name="select"
                label="select"
                type="select"
                fetch={{url: 'json/countries.json', cache: 3600}}
                mult
                filterAble
                optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
                valueTpl="{en}" />

              <FormControl name="tree"
                selectAble
                capture={3}
                label="tree"
                type="tree"
                fetch={ Refetch.get('json/tree.json') }
                textTpl="{text}({id})"
                valueTpl="{id}" />

              <FormControl
                label="json"
                type="json"
                name="json"
                rows={12}
                valueType="object"
              />

              <FormControl label="raw input">
                <FormItem name="formitem" required max={10}>
                  <input value="" style={{ padding: '0.5rem 0.75rem' }} type="text" />
                </FormItem>
              </FormControl>

              <FormControl label="upload file">
                <Upload name="file"
                  type="upload"
                  grid={1 / 2}
                  action="/upload"
                  accept="image/*"
                  fileSize={300}
                  limit={3}
                  onUpload={(res) => {
                    var json = JSON.parse(res)
                    if (json.success) {
                      return json.model
                    } else {
                      return new Error(json.message)
                    }
                  }}>
                  <Button><Icon icon="upload" /> Choose a file</Button>
                </Upload>
              </FormControl>

              <FormControl grid={{width: 18 / 24}}
                name="textarea"
                label="textarea"
                autoHeight
                rows={5}
                max={100}
                type="textarea" />

              <FormControl label="editor">
                <Editor grid={3 / 4} name="editor" />
              </FormControl>
            </Form>
          </Example>
        </div>
      </div>
    )
  }
}
