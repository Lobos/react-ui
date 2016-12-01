import { Component } from 'react'
import Example from '../Example'
import Code from '../Code'
import { Cn, En } from '../Language'
import Editor from 'rctui/addons/Editor'
import { Modal, Form, FormControl, Icon } from 'rctui'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '<p>init value</p>'
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Editor</h1>
        </div>

        <div className="content">
          <Cn>Editor是在 <a href="https://github.com/quilljs/quill" target="_blank">Quill</a> 基础上进行的封装</Cn>
          <En>Base on <a href="https://github.com/quilljs/quill" target="_blank">Quill</a></En>
          <Code>
          {`
            import Editor from 'rctui/addons/Editor'

            <Editor
              placeholder="string"
              toolbar={object}         // see editor toolbar config
              value="string"           // html string
              style={object}
              readOnly={bool}
              onChange={func(value)}
            />
          `}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
            <Editor placeholder="some text"
              value={this.state.value}
              height={300}
              onChange={(value) => this.setState({ value })}
              toolbar={[
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
              ]} />

            <div style={{border: 'solid 1px #ccc', marginTop: 20, padding: 10}}>
              {this.state.value || <span style={{color: '#999'}}>Result</span>}
            </div>
          </Example>

          <h2 className="subhead">Custom Button</h2>
          <Cn>提供了一个Editor.Button，用来自定义扩展。<a href="http://quilljs.com/guides/cloning-medium-with-parchment/" target="_blank">api见这里</a></Cn>
          <Code>
          {`
            <Editor.Button onClick={(editor instance) => { do something. }>
              {children} // text or reactElement
            </Editor.Button>
          `}
          </Code>

          <Example>
            <Editor toolbar={[
              'bold',
              'italic',
              'underline',
              <Editor.Button key="image-blot" onClick={(editor) => {
                let mid = Modal.open({
                  header: 'Image',
                  content: (
                    <Form onSubmit={(data) => {
                      let range = editor.getSelection(true)
                      editor.insertEmbed(range.index, 'image-blot', {
                        alt: '',
                        url: data.url
                      })
                      Modal.close(mid)
                    }}>
                      <FormControl label="image url" grid={1} name="url" type="url" />
                    </Form>
                  ),
                  buttons: {
                    'sumbit': 'submit'
                  }
                })
                }}><Icon style={{fontSize: 20}} icon="image" /></Editor.Button>
              ]}
            />
          </Example>
          <Code>
          {`
            // Just show the code.
            // Eidtor has registered an internal image-blot.
            let BlockEmbed = Quill.import('blots/block/embed')

            class ImageBlot extends BlockEmbed {
              static create (value) {
                let node = super.create()
                node.setAttribute('alt', value.alt)
                node.setAttribute('src', value.url)
                return node
              }

              static value (node) {
                return {
                  alt: node.getAttribute('alt'),
                  url: node.getAttribute('src')
                }
              }
            }

            ImageBlot.blotName = 'image-blot'
            ImageBlot.tagName = 'img'

            Quill.register(ImageBlot)
          `}
          </Code>
        </div>
      </div>
    )
  }
}

module.exports = Page
