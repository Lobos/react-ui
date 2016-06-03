'use strict'

import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { Cn, En } from '../Language'
const {Button, Modal, Form, FormControl} = global.uiRequire()

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }

    this.multOpen = this.multOpen.bind(this)
  }

  multOpen () {
    let index = this.state.index + 1
    let width = Math.ceil((Math.random() + 1) * 400)
    let ps = []

    for (var i = 1; i <= index; i++) {
      ps.push(<p key={i}>{`第 ${i} 层Modal`}</p>)
    }

    let options = {
      header: `第 ${index} 层Modal`,
      width: width,
      content: (
        <div>
          {ps}
          <a style={{marginRight: 20}} onClick={this.multOpen}>Open new Modal</a>
          <a style={{marginRight: 20}} onClick={() => Modal.alert('alert')}>Alert</a>
          <a onClick={() => Modal.close()}>Close</a>
        </div>
      ),
      onClose: () => {
        this.setState({ index: index - 1 })
      },
      buttons: { Close: true }
    }
    Modal.open(options)
    this.setState({ index })
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Modal</h1>
          <Cn><h2>对话框</h2></Cn>
        </div>

        <div className="content">
          <Code>
{`<Modal
  clickaway={bool}         // 为 true 时，点击页面空白部分关闭Modal，默认值为 false
  width={int|string}       // default is '35rem'
  padding={string}         // content padding, default is '1rem'
  header={string|element}  // 标题，值为 string 或者 ReactElement，可为空
  isOpen={bool}            // 是否打开
  onClose={function}       // 关闭Modal时触发
  buttons: {
    {text}: func|string    // text 为按钮文字，func 返回 true 或者值为 true，关闭 Modal
                           // func 可以设置为string，当func === 'submit' 时，会触发children下的form的submit事件
  }
>
  {children}               // 内容，任意对象
</Modal>
`}
          </Code>

          <Example>
<Modal width={700} header="Form"
  isOpen={this.state.modalIsOpen}
  onClose={() => this.setState({ modalIsOpen: false })}
  clickaway
  buttons={{
    'Submit': 'submit',
    'Cancel': true
  }}>
  <div>
    <Form onSubmit={
      (data) => {
        Modal.alert(JSON.stringify(data))
        this.setState({ modalIsOpen: false })
      }} layout="aligned">
      <FormControl name="name" grid={7 / 8} required label="Name" type="text" />
      <FormControl name="birthday" required label="Birthday" type="date" />
      <FormControl name="description" grid={7 / 8} label="Description" type="textarea" rows={6} />
    </Form>
  </div>
</Modal>
<Button status="primary" onClick={ () => this.setState({ modalIsOpen: true }) }>open form</Button>
          </Example>

          <div><em>Modal</em> Modal提供了一个静态方法，供任意位置调用。open会返回一个id，供close调用</div>
          <h2 className="subhead">Modal.open(options)</h2>
          <Code>
{`options = {
  clickaway: {bool},         // 为 true 时，点击页面空白部分关闭Modal，默认值为 false
  header: {string|element},  // 标题，值为 string 或者 ReactElement，可为空
  content: {string|element}, // 内容，值为 string 或者 ReactElement，必填
  width: {int|string},       // default is '35rem'
  padding: {int|string},     // content padding, default is '1rem'
  onClose: function,         // 当Modal关闭时触发
  buttons: {
    {text}: func|string      // text 为按钮文字，func 返回 true 或者值为 true，关闭 Modal
                             // func 可以设置为string，当func === 'submit' 时，会触发children下的form的submit事件
  }
}
var id = Modal.open(options);
Modal.close(id);
`}
          </Code>

          <h2 className="subhead">Modal.open</h2>
          <Example>
<Button status="primary" onClick={() => {
  let id = Modal.open({
    header: 'New Form',
    width: 700,
    buttons: {
      'Submit': 'submit',
      'Cancel': true
    },
    content: (
      <Form onSubmit={
        (data) => {
          Modal.alert(JSON.stringify(data))
          Modal.close(id)
        }} layout="aligned">
        <FormControl name="name" grid={7 / 8} required label="姓名" type="text" />
        <FormControl name="birthday" required label="生日" type="date" />
        <FormControl name="description" grid={7 / 8} label="简介" type="textarea" rows={6} />
      </Form>
    )
  })
}}>open form</Button>
          </Example>

          <h2 className="subhead">Modal.alert(content, header, callback)</h2>
          <Cn>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em></Cn>
          <Example>
<Button status="primary"
  onClick={() => Modal.alert('Some message.', 'Title')}>
  alert example
</Button>
          </Example>

          <h2 className="subhead">Modal.confirm(content, header, callback)</h2>
          <div>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em>。 <em>callback</em> 为 <em>function </em>，点击确定后回调。</div>
          <Example>
<Button status="primary" onClick={() => Modal.confirm(
  <div>
    <p>如果你知道要做什么，请点确定。</p>
    <p>如果你不知道，点取消吧。</p>
  </div>,
  () => { Modal.alert('点击了确定') },
  'Warning'
)}
>confirm example</Button>
          </Example>

          <h2 className="subhead">Modal.close(id)</h2>
          <Cn>关闭指定的Modal，id为open方法返回，不填时关闭最上层Modal</Cn>
          <En>Close Modal by id, if id is undefined, will close the top level Modal. </En>

          <h2 className="subhead">Open Modals on the other Modal</h2>
          <Example>
<Button status="primary" onClick={this.multOpen}>mult open</Button>
          </Example>
          <Code>
{`multOpen () {
  let index = this.state.index + 1;
  let width = Math.ceil((Math.random() + 1) * 400);
  let ps = [];

  for (var i = 1; i <= index; i++) {
    ps.push(<p key={i}>the {i} Modal</p>);
  }

  let options = {
    header: 'Modal',
    width: width,
    content: (
      <div>
        {ps}
        <a style={{marginRight: 20}} onClick={this.multOpen}>Open new Modal</a>
        <a style={{marginRight: 20}} onClick={() => Modal.alert('alert')}>Alert</a>
        <a onClick={() => Modal.close()}>Close</a>
      </div>
    ),
    onClose: () => {
      this.setState({ index: index - 1 });
    },
    buttons: {'Close': true}
  };
  Modal.open(options);
  this.setState({ index });
}`}
          </Code>
        </div>
      </div>
    )
  }
}
