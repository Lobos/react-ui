import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { Cn, En } from '../Language'
import { Button, Modal, Form, FormControl } from 'rctui'

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
      ps.push(<p key={i}>{`${i} level`}</p>)
    }

    let options = {
      header: `${index} level`,
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
          <Cn tag="h2">对话框</Cn>
        </div>

        <div className="content">
          <Cn>
            <Code>
{`<Modal
  clickaway={bool}         // 为 true 时，点击页面空白部分关闭Modal，默认值为 false
  width={int|string}       // 默认值 '35rem'
  padding={string}         // content padding，默认值'1rem'
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
          </Cn>
          <En>
            <Code>
{`<Modal
  clickaway={bool}           // if clickaway is true, click outside the modal close the modal, default is false
  width={int|string}         // default is '35rem'
  padding={string}           // content padding, default is '1rem'
  header={string|element}    // optional, string or ReactElement
  isOpen={bool}
  onClose={function}
  buttons: {
    [text]: bool|func|string // text is button value
                             // if button value is true or a function return true, close the modal
                             // if button value is the string 'submit', trigger submit event of the form in the modal, there is only one from in the modal
  }
>
  {children}
</Modal>
`}
            </Code>
          </En>

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
    <Form data={{}} onSubmit={
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

          <Cn><em>Modal</em> 提供了一组静态方法，供任意位置调用。open会返回一个id，供close调用</Cn>
          <En>There are some static methods in the Modal, for use Modal anywhere without write component.</En>
          <Cn>
            <Code>
{`options = {
  clickaway: {bool},
  header: {string|element},
  content: {string|element},
  width: {int|string},
  padding: {int|string},
  onClose: function,
  buttons: {
    {text}: bool|func|string
  }
}
var id = Modal.open(options);
Modal.close(id);
`}
            </Code>
          </Cn>
          <En>
            <Code>
{`options = {
  clickaway: {bool},
  header: {string|element},
  content: {string|element},
  width: {int|string},
  padding: {int|string},
  onClose: function,
  buttons: {
    {text}: bool|func|string,
  }
}
var id = Modal.open(options)
Modal.close(id)
`}
            </Code>
          </En>

          <h2 className="subhead">Modal.open(options)</h2>
          <En>Modal.open return the Modal's id, for Modal.close.</En>
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
        <FormControl name="name" grid={7 / 8} required label="Name" type="text" />
        <FormControl name="birthday" required label="Birthday" type="date" />
        <FormControl name="description" grid={7 / 8} label="Desc" type="textarea" rows={6} />
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

          <h2 className="subhead">Modal.confirm(content, callback, header)</h2>
          <Cn>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em>。 <em>callback</em> 为 <em>function </em>，点击确定后回调。</Cn>
          <Example>
<Button status="primary" onClick={() => Modal.confirm(
  <div>
    <p>Some text.</p>
  </div>,
  () => { setTimeout(() => Modal.alert('Clicked the ok button.'), 0) },
  'Warning'
)}
>confirm example</Button>
          </Example>

          <h2 className="subhead">Modal.close(id)</h2>
          <Cn>关闭指定的Modal，id为open方法返回，不填时关闭最上层Modal</Cn>
          <En>Close Modal by id, if id is undefined, will close the top level Modal. </En>

          <h2 className="subhead">Nested Modal</h2>
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
