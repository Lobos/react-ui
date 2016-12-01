import Code from '../Code'
import Example from '../Example'
import { Tooltip, Button } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Tooltip</h1>
      </div>

      <div className="content button-docs">
        <Code>
{`<Tooltip
  position={string}  // one of 'left|top|right|bootom', default value is 'right'
  trigger={string}    // one of 'click|hover', default value is 'hover'
  tip={string}        // tip text
>
{ReactElement}
</Tooltip>`}
        </Code>

        <h2 className="subhead">Hover</h2>
        <Example>
          <Tooltip position="left" tip="some tip text">
            <Button>Tip Left</Button>
          </Tooltip>

          <Tooltip position="top" tip="some tip text">
            <Button>Tip Top</Button>
          </Tooltip>

          <Tooltip position="bottom" tip="some tip text">
            <Button>Tip Bottom</Button>
          </Tooltip>

          <Tooltip position="right" tip="some tip text">
            <Button>Tip Right</Button>
          </Tooltip>
        </Example>

        <h2 className="subhead">Click</h2>
        <Example>
          <Tooltip trigger="click" position="left" tip="some tip text">
            <Button>Tip Left</Button>
          </Tooltip>

          <Tooltip trigger="click" position="top" tip="some tip text">
            <Button>Tip Top</Button>
          </Tooltip>

          <Tooltip trigger="click" position="bottom" tip="some tip text">
            <Button>Tip Bottom</Button>
          </Tooltip>

          <Tooltip trigger="click" position="right" tip="some tip text">
            <Button>Tip Right</Button>
          </Tooltip>
        </Example>

      </div>
    </div>
  )
}
