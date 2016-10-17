import Code from '../Code'
import Example from '../Example'
import { Popover, Button, Image } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Popover</h1>
      </div>

      <div className="content button-docs">
        <Code>
{`<Popover
  position={string}   // one of 'top-left|top|top-right|left|right|bootom-left|bootom|bootom-right', default value is 'top'
  background="string" // background color
  border="string"     // border color
  trigger="string"    // one fo 'click|hover', default value is 'click'
>
[                     // children must be an array with 2 ReactElement
  ReactElement,       // first element is handle
  ReactElement        // second element is pop content
]
</Popover>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Popover>
            <Button>Text</Button>
            <div style={{padding: 10}}>Some text</div>
          </Popover>

          <Popover>
            <Button>Width Title</Button>
            <div style={{padding: '1rem', width: 300}}>
              <h4>Title</h4>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Popover>

          <Popover>
            <Button>Image</Button>
            <div style={{padding: 6}}>
              <Image type="fill" width={200} height={120} src="./images/image1.jpg" />
            </div>
          </Popover>

          <Popover trigger="hover">
            <Button>Hover</Button>
            <div style={{padding: 6}}>
              <Image type="fill" width={200} height={120} src="./images/image1.jpg" />
            </div>
          </Popover>
        </Example>

        <h2 className="subhead">Position</h2>
        <Example>
          <div className="popover-demo">
            <Popover position="top-left" trigger="hover">
              <div>top-left</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <Popover position="top" trigger="hover">
              <div>top</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <Popover position="top-right" trigger="hover">
              <div>top-right</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <Popover position="left" trigger="hover">
              <div>left</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <div style={{border: 0, background: 'transparent'}}>&nbsp;</div>
            <Popover position="right" trigger="hover">
              <div>right</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <Popover position="bottom-left" trigger="hover">
              <div>bottom-left</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <Popover position="bottom" trigger="hover">
              <div>bottom</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
            <Popover position="bottom-right" trigger="hover">
              <div>bottom-right</div>
              <div style={{padding: 10}}>Some text</div>
            </Popover>
          </div>
        </Example>

        <h2 className="subhead">BackgroundColor & BorderColor</h2>
        <Example>
          <Popover background="#ddd" border="#f00">
            <Button>click me</Button>
            <div style={{padding: '1rem', width: 300}}>
              <h4>Title</h4>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Popover>
        </Example>
      </div>
    </div>
  )
}
