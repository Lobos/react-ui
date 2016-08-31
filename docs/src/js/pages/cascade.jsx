import Code from '../Code'
import Example from '../Example'
import { Cascade } from '../rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Cascade</h1>
      </div>

      <div className="content button-docs">
        <Code>
{`<Cascade
  position={string}  // one of 'left|top|right|bootom', default value is 'right'
  trigger={string}    // one of 'click|hover', default value is 'hover'
  tip={string}        // tip text
>
{ReactElement}
</Cascade>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Cascade fetch={'json/tree.json'} value={['1', '1.2', '1.2.1']} />
        </Example>

        <h2 className="subhead">City</h2>
        <Example>
          <Cascade
            fetch={{
              url: 'json/districts-city.json',
              then: (res) => res.districts
            }}
            valueTpl="{adcode}"
            optionTpl="{name}"
          />
        </Example>
      </div>
    </div>
  )
}
