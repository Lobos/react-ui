"use strict"

import React from 'react'
import Prettify from '../mixins/prettify'
import CheckboxGroup from '../../../../src/js/components/checkbox-group.jsx'

const textValue = require('../data/text-value')

module.exports = React.createClass({
  displayName: 'Pages/Checkbox',

  mixins: [Prettify],

  getInitialState: function () {
    return {
      inline: false
    }
  },

  toggleInline: function () {
    this.setState({ inline: !this.state.inline })
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox Group</h1>
          <h2>一组复选框</h2>
        </div>

        <div className="content">

          <pre className="prettyprint">{'<CheckboxGroup data={array} sep={string||null} cache={bool} inline={bool} onChange={function}\r  readOnly={bool} src="string" textKey="string" valueKey="string" value={any} />'}</pre>
          <p><b>data:</b>数据，与 <em>src</em> 二选一，优先使用data</p>
          <p><b>sep:</b>返回值分隔字符，默认值为 <em>,</em> 。值设为 <em>''</em> 或 <em>null</em> 时，返回值类型为 <em>array</em></p>
          <p><b>inline:</b>为 <em>true</em> 时，各选项横向排列。默认为 <em>false</em></p>
          <p><b>onChange:</b>当选项改变时回调方法，参数为 <em>value</em></p>
          <p><b>readOnly:</b>为 <em>true</em> 时，只读。默认为 <em>false</em></p>
          <p><b>src:</b>服务器端数据地址，与 <em>data</em> 二选一</p>
          <p><b>cache:</b>数据缓存，只有当数据为远程获取时有效。默认为 <em>true</em></p>
          <p><b>textKey:</b>数据结构中显示文字的key，不填默认为 <em>text</em></p>
          <p><b>valueKey:</b>数据结构中返回值的key，不填默认为 <em>value</em></p>
          <p><b>value:</b>选中值</p>

          <h2 className="subhead">数据结构</h2>
          <p>标准结构为 <em>text</em>, <em>value</em> key组成的数组</p>
          <pre className="prettyprint">{'[{"text":"北京","value":"beijing"},{"text":"上海", "value":"shanghai"}]'}</pre>
          <p>可以使用自定义数组，指定 <em>textKey</em>, <em>valueKey</em></p>
          <pre className="prettyprint">{'[{"cn":"北京","py":"beijing"},{"cn":"上海", "py":"shanghai"}]'}</pre>
          <p>可以使用一维数组，这种情况下，显示文字与值相同</p>
          <pre className="prettyprint">{'["北京","上海","广州"]'}</pre>

          <h2 className="subhead">Object Data</h2>
          <p>
            <CheckboxGroup inline={true} data={textValue} />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} data={data} />'}</pre>
          <pre className="prettyprint">{
`data = [
  { "value": "nanjing", "text": "南京" },
  { "value": "beijing", "text": "北京" },
  { "value": "guangzhou", "text": "广州" },
  { "value": "shenzhen", "text": "深圳" },
  { "value": "chengdu", "text": "成都" },
  { "value": "chongqing", "text": "重庆" },
  { "value": "shanghai", "text": "上海" }
]`
            }</pre>

          <h2 className="subhead">Array Data</h2>
          <p>
            <CheckboxGroup ref="array" sep="" onChange={()=>console.log(this.refs.array.getValue())} inline={true} value={["北京", "广州"]} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} value={["北京", "广州"]} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'}</pre>

          <h2 className="subhead">Readonly</h2>
          <p>
            <CheckboxGroup readOnly={true} inline={true} value={["北京", "广州"]} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup readOnly={true} inline={true} value={["北京", "广州"]} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'}</pre>

          <h2 className="subhead">Remote Data</h2>
          <p>
            <CheckboxGroup ref="remote" onChange={()=>console.log(this.refs.remote.getValue())} cache={false} inline={true} value="shanghai,chengdu" src="json/text-value.json" />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} value="shanghai,chengdu" cache={false} src="json/text-value.json" />'}</pre>

          <h2 className="subhead">Data Sep</h2>
          <p>
            <CheckboxGroup ref="sep" onChange={()=>console.log(this.refs.sep.getValue())} inline={true} sep="|" value="shanghai|chengdu" src="json/text-value.json" />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} sep="|" value="shanghai|chengdu" src="json/text-value.json" />'}</pre>
        </div>
      </div>
    )
  }
})
