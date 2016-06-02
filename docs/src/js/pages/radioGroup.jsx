'use strict'

import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { TplDataDesc } from '../CommDocs'
const {RadioGroup, Radio, Icon} = global.uiRequire()

import { createKeyValue } from '../data/mock'
const data1000 = createKeyValue(1000)

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inline: false
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Radio Group</h1>
          <h2>一组单选框</h2>
        </div>

        <div className="content">

          <Code>
{`<RadioGroup
  block={bool}           // 为 true 时，各选项单行排列。默认为 false 
  className={string}     // class
  data={array|object}    // 数据, array 或者 object
  fetch={object}
  inline={bool}          // 旧接口，和block相反，建议使用block，设置了block时，inline无效
  onChange={function}    // 当选项改变时回调方法，参数为 value
  readOnly={bool}        // 为 true 时，只读。默认为 false
  textTpl={string|func}  // 显示文字模板，字符串或方法，默认为 "{text}"
  valueTpl={string|func} // 返回数据模板，字符串或方法，默认为 "{id}"
  value={any}
/>`}
          </Code>
          <div><a href="#/fetch">fetch 参见这里</a></div>

          <TplDataDesc />

          <h2 className="subhead">默认结构数据</h2>
          <Example>
<RadioGroup data={[
  { 'id': 'nanjing', 'text': '南京' },
  { 'id': 'beijing', 'text': '北京' },
  { 'id': 'guangzhou', 'text': '广州' },
  { 'id': 'shenzhen', 'text': '深圳' },
  { 'id': 'chengdu', 'text': '成都' },
  { 'id': 'chongqing', 'text': '重庆' },
  { 'id': 'shanghai', 'text': '上海' }
]} />
          </Example>

          <h2 className="subhead">定义模版(string)</h2>
          <Example>
<RadioGroup
  value="beijing"
  textTpl="{cn}({en})"
  valueTpl="{en}"
  data={[
    { 'en': 'nanjing', 'cn': '南京' },
    { 'en': 'beijing', 'cn': '北京' },
    { 'en': 'guangzhou', 'cn': '广州' },
    { 'en': 'shenzhen', 'cn': '深圳' },
    { 'en': 'chengdu', 'cn': '成都' },
    { 'en': 'chongqing', 'cn': '重庆' },
    { 'en': 'shanghai', 'cn': '上海' }
  ]}
/>
          </Example>

          <h2 className="subhead">定义模版(function)</h2>
          <Example>
<RadioGroup block
  value="beijing"
  textTpl={(d) => <span><b>{d.cn}</b> - {d.en}</span>}
  valueTpl={(d) => d.en}
  data={[
    { 'en': 'nanjing', 'cn': '南京' },
    { 'en': 'beijing', 'cn': '北京' },
    { 'en': 'guangzhou', 'cn': '广州' },
    { 'en': 'shenzhen', 'cn': '深圳' },
    { 'en': 'chengdu', 'cn': '成都' },
    { 'en': 'chongqing', 'cn': '重庆' },
    { 'en': 'shanghai', 'cn': '上海' }
  ]}
/>
          </Example>

          <h2 className="subhead">key value 结构数据</h2>
          <div>0.6 后可以使用key value结构的object作为数据</div>
          <Example>
<RadioGroup value="beijing" data={{
  'nanjing': '南京',
  'beijing': '北京',
  'guangzhou': '广州',
  'shenzhen': '深圳',
  'chengdu': '成都',
  'chongqing': '重庆',
  'shanghai': '上海'
}} />
          </Example>

          <h2 className="subhead">简单数组</h2>
          <Example>
<RadioGroup
  value="北京"
  data={['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安']} />
          </Example>

          <h2 className="subhead">只读</h2>
          <Example>
<RadioGroup readOnly
  value="北京"
  data={['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安']} />
          </Example>

          <h2 className="subhead">服务端数据</h2>
          <div>支持<a href="#/fetch">fetch</a>从服务端获取数据</div>
          <Example>
<RadioGroup
  value="chengdu"
  fetch={{url:'json/text-value.json', cache: 3600 }} />
          </Example>

          <h2 className="subhead">data && children</h2>
          <Example>
<RadioGroup
  onChange={(value) => console.log(value)}
  value="北京"
  data={['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安']}
  >
  <Radio position={3} defaultValue="香港"><Icon icon="cloud-outline" />香港</Radio>
</RadioGroup>
          </Example>

          <h2 className="subhead">1000 radios</h2>
          <Example>
<RadioGroup data={data1000} />
          </Example>

        </div>
      </div>
    )
  }
}
