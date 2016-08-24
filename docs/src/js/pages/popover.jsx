import Code from '../Code'
import Example from '../Example'
import { Popover, Button, Image } from '../rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Popover</h1>
      </div>

      <div className="content button-docs">
        <Code>
{`<Popover
  placement={string}  // one of 'left|top|right|bootom', default value is 'right'
  background="string" // background color
  border="string"     // border color
>
[                     // children must be an array with 2 ReactElement
  ReactElement,       // first element is handle
  ReactElement        // second element is pop content
]
</Popover>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Popover placement="left">
            <Button>Pop Left</Button>
            <div style={{padding: 10}}>Some text left</div>
          </Popover>

          <Popover placement="top">
            <Button>Pop Top</Button>
            <div style={{padding: '1rem'}}>
              <h4>Title</h4>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Popover>

          <Popover placement="bottom">
            <Button>Pop Bottom</Button>
            <div style={{padding: 6}}>
              <Image type="fill" width={200} height={120} src="./images/image1.jpg" />
            </div>
          </Popover>

          <Popover placement="right">
            <Button>Pop Right</Button>
            <div style={{padding: 10}}>Some text right</div>
          </Popover>
        </Example>

        <h2 className="subhead">BackgroundColor & BorderColor</h2>
        <Example>
          <Popover background="#ddd" border="#f00">
            <Button>Grey background</Button>
            <div style={{padding: '1rem'}}>
              <h4>Title</h4>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Popover>
        </Example>
      </div>
    </div>
  )
}
