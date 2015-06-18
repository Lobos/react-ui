"use strict"

import React from 'react'
import Prettify from '../mixins/prettify'
import {RadioGroup} from '../../../../src/js'

const textValue = require('../data/text-value')

export default React.createClass({
  displayName: 'Pages/Checkbox',

  mixins: [Prettify],

  getInitialState: function () {
    return {
      inline: false
    }
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Radio Group</h1>
          <h2>一组单选框</h2>
        </div>

        <div className="content">

          <pre className="prettyprint">{'<RadioGroup data={array} cache={bool} inline={bool} onChange={function} readOnly={bool}\r  src="string" textKey="string" valueKey="string" value={any} />'}</pre>
          <p><b>data:</b>数据，与 <em>src</em> 二选一</p>
          <p><b>inline:</b>为 <em>true</em> 时，各选项横向排列。默认为 <em>false</em></p>
          <p><b>onChange:</b>当选项改变时回调方法，参数为 <em>value</em></p>
          <p><b>readOnly:</b>为 <em>true</em> 时，只读。默认为 <em>false</em></p>
          <p><b>src:</b>后端数据地址，与 <em>data</em> 二选一</p>
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
            <RadioGroup inline={true} data={textValue} />
          </p>
          <pre className="prettyprint">{'<RadioGroup inline={true} data={data} />'}</pre>
          <pre className="prettyprint">
{`data = [
  { "value": "nanjing", "text": "南京" },
  { "value": "beijing", "text": "北京" },
  { "value": "guangzhou", "text": "广州" },
  { "value": "shenzhen", "text": "深圳" },
  { "value": "chengdu", "text": "成都" },
  { "value": "chongqing", "text": "重庆" },
  { "value": "shanghai", "text": "上海" }
]`}
          </pre>

          <h2 className="subhead">Array Data</h2>
          <p>
            <RadioGroup inline={true} value="北京" data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />
          </p>
          <pre className="prettyprint">{'<RadioGroup inline={true} value="北京" data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'}</pre>

          <h2 className="subhead">Readonly</h2>
          <p>
            <RadioGroup readOnly={true} inline={true} value={"北京"} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />
          </p>
          <pre className="prettyprint">{'<RadioGroup readOnly={true} inline={true} value={"北京"} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'}</pre>

          <h2 className="subhead">Remote Data</h2>
          <p>
            <RadioGroup inline={true} stringify={true} value="chengdu" src="json/text-value.json" />
          </p>
          <pre className="prettyprint">{'<RadioGroup inline={true} stringify={true} value="chengdu" src="json/text-value.json" />'}</pre>
        </div>
      </div>
    )
  }

})
