"use strict"

import React from 'react'
import prettify from '../prettify'
import textValue from '../data/text-value'
const {CheckboxGroup, dataSource } = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Checkbox'

  render () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox Group</h1>
          <h2>一组复选框</h2>
        </div>

        <div className="content">

          <pre className="prettyprint">

{`<CheckboxGroup
  className={string}  // class
  data={array|func}   // 数据，array 或者 dataSource
  cache={bool}        // 数据缓存，只有当数据为远程获取时有效。默认为 true
  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  inline={bool}       // 为 true 时，各选项横向排列。默认为 false
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
  value={string|array}
/>`}

          </pre>
          <p><a href="#/dataSource">dataSource 参加这里</a></p>

          <h2 className="subhead">数据结构</h2>
          <p>标准结构为 <em>text</em>, <em>id</em> key组成的数组</p>
          <pre className="prettyprint">{'[{"text":"北京","id":"beijing"},{"text":"上海", "id":"shanghai"}]'}</pre>
          <p>可以使用自定义数组，指定 <em>textTpl</em>, <em>valueTpl</em></p>
          <pre className="prettyprint">{'[{"cn":"北京","py":"beijing"},{"cn":"上海", "py":"shanghai"}]'}</pre>
          <p>可以使用一维数组，这种情况下，显示文字与值相同</p>
          <pre className="prettyprint">{'["北京","上海","广州"]'}</pre>

          <h2 className="subhead">Object Data</h2>
          <p>
            <CheckboxGroup inline={true} data={textValue} />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} data={data} />'}</pre>
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
            <CheckboxGroup ref="remote" onChange={()=>console.log(this.refs.remote.getValue())} cache={false} inline={true} value="shanghai,chengdu" data={ dataSource("json/text-value.json", { cache: true }) } />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} value="shanghai,chengdu" cache={false} data={dataSource("json/text-value.json",{cache: true})} />'}</pre>

          <h2 className="subhead">Data Sep</h2>
          <p>
            <CheckboxGroup ref="sep" onChange={()=>console.log(this.refs.sep.getValue())} inline={true} sep="|" value="shanghai|chengdu" data={ dataSource("json/text-value.json", { cache: true }) } />
          </p>
          <pre className="prettyprint">{'<CheckboxGroup inline={true} sep="|" value="shanghai|chengdu" data={dataSource("json/text-value.json",{cache: true})} />'}</pre>
        </div>


      </div>
    )
  }
}
