import Code from '../Code'
import Example from '../Example'
import { Cascade } from '../rctui'
import Refetch from 'refetch'

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
          <Cascade grid={1 / 2}
            fetch={{
              url: 'json/districts-city.json',
              then: (res) => res.districts
            }}
            valueTpl="{adcode}"
            optionTpl="{name}"
          />
        </Example>

        <h2 className="subhead">Lazy Fetch</h2>
        <Example>
          <Cascade grid={1 / 2} maxLevel={4}
            lazyFetch={(d) => {
              return Refetch.jsonp('//restapi.amap.com/v3/config/district', {
                subdistrict: 1,
                key: 'be32611e40d4b1589a4facd7dfb0e37a',
                keywords: d ? d.adcode : undefined
              }, { cache: 3600 }).then(res => {
                if (res.status === '1') {
                  return res.districts[0].districts
                } else {
                  alert('fetch data error')
                }
              })
            }}
            valueTpl="{name}"
            optionTpl="{name}"
          />
        </Example>
      </div>
    </div>
  )
}
