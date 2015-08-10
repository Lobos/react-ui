'use strict'

import React from 'react'
import prettify from '../prettify'
const {Modal, Form, FormControl} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Modal'

  render () {
    let openOptions = {
      header: '一个弹出表单',
      content: (
        <div>
          <Form layout="aligned" ref="form">
            <FormControl name="name" required={true} label="姓名" type="text" />
            <FormControl name="birthday" required={true} label="生日" type="date" />
            <FormControl name="description" label="简介" type="textarea" width={20} rows={6} />
          </Form>
        </div>
      ),
      width: 700,
      buttons: {
        '取消': true,
        '重置': () => {
          let form = this.refs.form
          form.setData({})
        },
        '确定': () => {
          let form = this.refs.form
          let suc = form.validate()
          if (suc) {
            alert(JSON.stringify(form.getValue()))
            return true
          }
        }
      }
    }

    return (
      <div>
        <div className="header">
          <h1>Modal</h1>
          <h2>对话框</h2>
        </div>

        <div className="content">
          <div><em>Modal</em> 为全局对象，所有的方法都为静态方法。</div>
          <h2 className="subhead">Modal.open(options)</h2>
          <pre className="prettyprint">
{`options = {
  clickaway: {bool},         // 为 true 时，点击页面空白部分关闭Modal，默认值为 false
  header: {string|element},  // 标题，值为 string 或者 ReactElement，可为空
  content: {string|element}, // 内容，值为 string 或者 ReactElement，必填
  width: {int|string},       // 宽度，默认值为 500
  buttons: {
    {text}: function         // text 为按钮文字，function 返回 true 关闭 Modal
  }
}`}
          </pre>
          <div>
            <a onClick={() => Modal.open(openOptions)}>open a form</a>
          </div>
          <pre className="prettyprint">
{`Modal.open(
  header: '一个弹出表单',
  content: (
    <div>
      <Form layout="aligned" ref="form">
        <FormControl name="name" required={true} label="姓名" type="text" />
        <FormControl name="birthday" required={true} label="生日" type="date" />
        <FormControl name="description" label="简介" type="textarea" width={20} rows={6} />
      </Form>
    </div>
  ),
  width: 700,
  buttons: {
    '取消': true,
    '重置': () => {
      let form = this.refs.form
      form.setData({})
    },
    '确定': () => {
      let form = this.refs.form
      let suc = form.validate()
      if (suc) {
        alert(JSON.stringify(form.getValue()))
        return true
      }
    }
  }
)`}
          </pre>

          <h2 className="subhead">Modal.alert(content)</h2>
          <div>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em></div>
          <div>
            <a onClick={() => Modal.alert('这是一个alert')}>alert example</a>
          </div>
          <pre className="prettyprint">{`Modal.alert('这是一个alert')`}</pre>

          <h2 className="subhead">Modal.confirm(content, onOk)</h2>
          <div>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em>。 <em>onOk</em> 为 <em>function </em>，点击确定后回调。</div>
          <div>
            <a onClick={() => Modal.confirm(
              <div>
                <p>如果你知道要做什么，请点确定。</p>
                <p>如果你不知道，点取消吧。</p>
              </div>,
              () => { alert('点击了确定') })}>confirm example</a>
          </div>
          <pre className="prettyprint">
{`Modal.confirm(
  <div>
    <p>如果你知道要做什么，请点确定。</p>
    <p>如果你不知道，点取消吧。</p>
  </div>,
  () => { alert('点击了确定') }
)`}
          </pre>
        </div>
      </div>
    )
  }
}
