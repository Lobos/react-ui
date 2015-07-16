"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
let {RadioGroup} = global.uiRequire()

const textValue = require('../data/text-value')

module.exports = React.createClass({
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

          <pre className="prettyprint">
{`<RadioGroup
  className={string}  // class
  data={array}        // 数据，与 src 二选一，优先使用 data
  src="string"        // 服务器端数据地址，与 data 二选一
  cache={bool}        // 数据缓存，只有当数据为远程获取时有效。默认为 true
  inline={bool}       // 为 true 时，各选项横向排列。默认为 false
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
  value={any}
/>`}
          </pre>

          <h2 className="subhead">数据结构</h2>
          <p>标准结构为 <em>text</em>, <em>value</em> key组成的数组</p>
          <pre className="prettyprint">{'[{"text":"北京","id":"beijing"},{"text":"上海", "id":"shanghai"}]'}</pre>
          <p>可以使用自定义数组，指定 <em>textTpl</em>, <em>valueTpl</em></p>
          <pre className="prettyprint">{'[{"cn":"北京","en":"beijing"},{"cn":"上海", "en":"shanghai"}]'}</pre>
          <p>可以使用一维数组，这种情况下，显示文字与值相同</p>
          <pre className="prettyprint">{'["北京","上海","广州"]'}</pre>

          <h2 className="subhead">Object Data</h2>
          <p>
            <RadioGroup inline={true} data={textValue} />
          </p>
          <pre className="prettyprint">{'<RadioGroup inline={true} data={data} />'}</pre>
          <pre className="prettyprint">
{`data = [
  { "id": "nanjing", "text": "南京" },
  { "id": "beijing", "text": "北京" },
  { "id": "guangzhou", "text": "广州" },
  { "id": "shenzhen", "text": "深圳" },
  { "id": "chengdu", "text": "成都" },
  { "id": "chongqing", "text": "重庆" },
  { "id": "shanghai", "text": "上海" }
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
