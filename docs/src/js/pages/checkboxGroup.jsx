'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { TplDataDesc } from '../CommDocs'
import { Cn, En } from '../Language'
import { CheckboxGroup, Checkbox, Icon } from 'rctui'

import { createKeyValue } from '../data/mock'
const data1000 = createKeyValue(1000)

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox Group</h1>
          <Cn tag="h2">复选框组</Cn>
        </div>

        <div className="content">
          <Cn>
            <Code>
  {`<CheckboxGroup
    block={bool}            // 为 true 时，各选项单行排列。默认为 false
    className={string}
    data={array|object}     // 数据，默认值为[]
    fetch={object}
    inline={bool}           // 旧接口，和block相反，建议使用block，设置了block时，inline无效
    onChange={function(     // 当选项改变时回调方法
      value                 // typeof sep === 'string' ? array.join(sep) : [array]
    )}
    readOnly={bool}         // 为 true 时，只读。默认为 false
    sep={string|null}       // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
    textTpl={string|func}   // 显示文字模板，字符串或方法，默认为 "{text}"
    value={string|array}
    valueTpl={string|func}  // 返回数据模板，字符串或方法，默认为 "{id}"
  />`}
            </Code>
          </Cn>
          <En>
<Code>
  {`<CheckboxGroup
    block={bool}            // default is false
    className={string}
    data={array|object}     // default is []
    fetch={object}
    onChange={function(     // change callback
      value                 // typeof sep === 'string' ? array.join(sep) : [array]
    )}
    readOnly={bool}         // default is false
    sep={string|null}       // default is ','
    textTpl={string|func}   // text template, default is  "{text}"
    value={string|array}
    valueTpl={string|func}  // value template, default is "{id}"
  />`}
            </Code>
          </En>
          <p><a href="#/fetch">fetch see here</a></p>

          <TplDataDesc />

          <h2 className="subhead">Array Data</h2>
          <Example>
<CheckboxGroup value="us,fr" data={[
  { 'id': 'cn', 'text': 'China' },
  { 'id': 'us', 'text': 'United States' },
  { 'id': 'jp', 'text': 'Japan' },
  { 'id': 'gb', 'text': 'Great Britain' },
  { 'id': 'fr', 'text': 'France' },
  { 'id': 'de', 'text': 'Germany' },
  { 'id': 'es', 'text': 'Spain' }
]} />
          </Example>

          <h2 className="subhead">Object Data</h2>
          <Cn>0.6 后可以使用key value结构的object作为数据</Cn>
          <Example>
<CheckboxGroup value="gb" data={{
  'cn': 'China',
  'us': 'United States',
  'jp': 'Japan',
  'gb': 'Great Britain',
  'fr': 'France',
  'de': 'Germany',
  'es': 'Spain'
}} />
          </Example>

          <h2 className="subhead">String Template</h2>
          <Example>
<CheckboxGroup
  value="us"
  textTpl="{name}({code})"
  valueTpl="{code}"
  data={[
    { 'code': 'cn', 'name': 'China' },
    { 'code': 'us', 'name': 'United States' },
    { 'code': 'jp', 'name': 'Japan' },
    { 'code': 'gb', 'name': 'Great Britain' },
    { 'code': 'fr', 'name': 'France' },
    { 'code': 'de', 'name': 'Germany' },
    { 'code': 'es', 'name': 'Spain' }
  ]}
/>
          </Example>

          <h2 className="subhead">Function Template</h2>
          <Example>
<CheckboxGroup
  value="us"
  textTpl={(d) => d.name + '-' + d.code }
  valueTpl={(d) => d.code}
  data={[
    { 'code': 'cn', 'name': 'China' },
    { 'code': 'us', 'name': 'United States' },
    { 'code': 'jp', 'name': 'Japan' },
    { 'code': 'gb', 'name': 'Great Britain' },
    { 'code': 'fr', 'name': 'France' },
    { 'code': 'de', 'name': 'Germany' },
    { 'code': 'es', 'name': 'Spain' }
  ]}
/>
          </Example>

          <h2 className="subhead">Array[string]</h2>
          <Cn>显示文本和选中值一样时，可以使用简单数组</Cn>
          <Example>
<CheckboxGroup sep=""
  onChange={(value) => console.log(value)}
  value={['Beijing', 'Edinburgh']}
  data={['Beijing', 'Tokyo', 'New York', 'HongKong', 'Edinburgh',
    'San Francisco', 'London', 'Sidney']}
/>
          </Example>

          <h2 className="subhead">Remote Data</h2>
          <Cn>支持<a href="#/fetch">fetch</a>从服务端获取数据</Cn>
          <En>Get data from server with <a href="#/fetch">fetch</a></En>
          <Example>
<CheckboxGroup
  onChange={(value) => console.log(value)}
  value="us,fr"
  fetch={{url: 'json/text-value.json', cache: 3600}}
/>
          </Example>

          <h2 className="subhead">Block</h2>
          <Example>
<CheckboxGroup block
  onChange={(value) => console.log(value)}
  value="us,fr"
  fetch={{url: 'json/text-value.json', cache: 3600}}
/>
          </Example>

          <h2 className="subhead">Data Separator</h2>
          <Cn>使用自定义数据分隔符代替','号</Cn>
          <En>use '|' instead of ','</En>
          <Example>
<CheckboxGroup
  onChange={(value) => console.log(value)}
  sep="|"
  value="us|fr"
  fetch={{url: 'json/text-value.json', cache: 3600}}
/>
          </Example>

          <h2 className="subhead">ReadOnly</h2>
          <Example>
<CheckboxGroup readOnly
  value={['Beijing', 'Edinburgh']}
  data={['Beijing', 'Tokyo', 'New York', 'HongKong', 'Edinburgh',
    'San Francisco', 'London', 'Sidney']}
/>
          </Example>

          <h2 className="subhead">Data && Children</h2>
          <Cn>0.6 支持数据和Checkbox元素混合传入，position为插入位置，正整数</Cn>
          <Example>
<CheckboxGroup sep={null}
  onChange={(value) => console.log(value)}
  value={['Beijing', 'Edinburgh']}
  data={['Beijing', 'Tokyo', 'New York', 'Edinburgh', 'San Francisco', 'Sidney']}
  >
  <Checkbox position={3} value="Hongkong"><Icon icon="cloud-outline" />Hongkong</Checkbox>
  <Checkbox value="London">London</Checkbox>
</CheckboxGroup>
          </Example>

          <h2 className="subhead">1000 radios</h2>
          <Example>
<CheckboxGroup data={data1000} />
          </Example>
        </div>
      </div>
    )
  }
}
