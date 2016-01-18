"use strict";

import React from 'react';
import Code from '../Code';
import Example from '../Example';
import exampleData from '../data/text-value';
const {CheckboxGroup} = global.uiRequire();

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox Group</h1>
          <h2>一组复选框</h2>
        </div>

        <div className="content">

          <Code>
{`<CheckboxGroup
  className={string}
  data={array}        // 数据，默认值为[]
  fetch={object}
  inline={bool}       // 为 true 时，各选项横向排列。默认为 false
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  value={string|array}
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
/>`}
          </Code>
          <div><a href="#/fetch">fetch 参见这里</a></div>

          <h2 className="subhead">数据结构</h2>
          <div>标准结构为 <em>text</em>, <em>id</em> key组成的数组</div>
          <div>可以使用自定义数组，指定 <em>textTpl</em>, <em>valueTpl</em></div>
          <div>可以使用一维数组，这种情况下，显示文字与值相同</div>

          <h2 className="subhead">Object Data</h2>
          <Example>
<CheckboxGroup inline={true} data={exampleData} />
          </Example>
          <Code>
{`exampleData = [
  { "id": "nanjing", "text": "南京" },
  { "id": "beijing", "text": "北京" },
  { "id": "guangzhou", "text": "广州" },
  { "id": "shenzhen", "text": "深圳" },
  { "id": "chengdu", "text": "成都" },
  { "id": "chongqing", "text": "重庆" },
  { "id": "shanghai", "text": "上海" }
]`}
          </Code>

          <h2 className="subhead">Array Data</h2>
          <Example>
<CheckboxGroup ref="array" sep=""
  onChange={(value)=>console.log(value)}
  inline={true} 
  value={["北京", "广州"]}
  data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]}
/>
          </Example>

          <h2 className="subhead">Readonly</h2>
          <Example>
<CheckboxGroup readOnly={true} inline={true}
  value={["北京", "广州"]}
  data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]}
/>
          </Example>

          <h2 className="subhead">Remote Data</h2>
          <Example>
<CheckboxGroup ref="remote"
  onChange={(value)=>console.log(value)}
  inline={true}
  value="shanghai,chengdu"
  fetch={{url: "json/text-value.json", cache: 3600}}
/>
          </Example>

          <h2 className="subhead">Data Sep</h2>
          <Example>
<CheckboxGroup ref="sep"
  onChange={(value)=>console.log(value)}
  inline={true}
  sep="|"
  value="shanghai|chengdu"
  fetch={{url: "json/text-value.json", cache: 3600}}
/>
          </Example>
        </div>
      </div>
    );
  }
}
