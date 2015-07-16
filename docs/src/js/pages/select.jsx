"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
let {Select} = global.uiRequire()

module.exports = React.createClass({
  displayName: 'Pages/Select',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Select</h1>
          <h2>下拉列表</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Select
  className={string}    // class
  data={array}          // 数据，与 src 二选一，优先使用 data
  src="string"          // 服务器端数据地址，与 data 二选一
  cache={bool}          // 数据缓存，只有当数据为远程获取时有效。默认为 true
  sep={string|null}     // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  filterAble={bool}     // 是否显示筛选，默认为 false
  readOnly={bool}       // 是否只读。默认为 false
  groupBy={string}      // 分组的 key。不填为不分组
  placeholder={string}  // 占位提示文字
  mult={bool}           // 是否多选，默认为 false
  onChange={function}   // 值改变时触发事，参数为 value
  optionTpl={string}    // 选项模板，默认为 {text}
  resultTpl={string}    // 选中项显示模板，如果不填使用 optionTpl
  valueTpl={string}     // 返回值模板，默认为 {value}
  value={string}        // 初始值
/>
模板使用 "{key}" 形式的字符串进行格式化。
data 为简单数组（如["中国", "美国", "俄罗斯", "德国"])，时，所有模板无效。
`}
          </pre>

          <h2 className="subhead">简单数组</h2>
          <div>
            <Select width={6} placeholder="简单数组" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
            {' '}
            <Select width={12} mult={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
          </div>
          <pre className="prettyprint">
{`<Select placeholder="简单数组" data={["中国", "美国", "俄罗斯", "德国"]} />
<Select className="pure-u-1-2" mult={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />`}
          </pre>

          <h2 className="subhead">单选</h2>
          <Select width={12}
            placeholder="单选"
            filterAble={true}
            optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
            valueTpl="{country}-{en}"
            src="json/countries.json" />
          <pre className="prettyprint">
{`<Select placeholder="单选"
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  src="json/countries.json" />
`}
          </pre>

          <h2 className="subhead">多选</h2>
          <Select width={24}
            cache={true}
            mult={true}
            placeholder="多选"
            filterAble={true}
            optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
            resultTpl='<img src="images/flags/{code}.png" /> {country}'
            valueTpl="{en}"
            src="json/countries.json" />
          <pre className="prettyprint">
{`<Select placeholder="多选"
  cache={true}
  mult={true}
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  resultTpl='<img src="images/flags/{code}.png" /> {country}'
  valueTpl="{en}"
  src="json/countries.json" />
`}
          </pre>

          <h2 className="subhead">groupBy</h2>
          <Select width={12}
            placeholder="Group by continent"
            groupBy="continent"
            filterAble={true}
            optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
            valueTpl="{country}-{en}"
            src="json/countries.json" />
          <pre className="prettyprint">
{`<Select placeholder="Group by continent"
  groupBy="continent"
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  src="json/countries.json" />
`}
          </pre>
        </div>
      </div>
    )
  }
})


