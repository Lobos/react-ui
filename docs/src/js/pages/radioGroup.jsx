"use strict";

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {RadioGroup, Radio, Icon} = global.uiRequire();
const textValue = require('../data/text-value');

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inline: false
    };
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
  className={string}  // class
  data={array|object} // 数据, array 或者 object
  fetch={object}
  inline={bool}       // 为 true 时，各选项横向排列。默认为 true
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
  value={any}
/>`}
          </Code>
          <div><a href="#/fetch">fetch 参见这里</a></div>

          <h2 className="subhead">数据结构</h2>
          <div>标准结构为 <em>text</em>, <em>value</em> key组成的数组</div>
          <Code>{'[{"text":"北京","id":"beijing"},{"text":"上海", "id":"shanghai"}]'}</Code>
          <div>可以使用自定义数组，指定 <em>textTpl</em>, <em>valueTpl</em></div>
          <Code>{'[{"cn":"北京","en":"beijing"},{"cn":"上海", "en":"shanghai"}]'}</Code>
          <div>可以使用一维数组，这种情况下，显示文字与值相同</div>
          <Code>{'["北京","上海","广州"]'}</Code>

          <h2 className="subhead">默认结构数据</h2>
          <Example>
<RadioGroup data={[
  { "id": "nanjing", "text": "南京" },
  { "id": "beijing", "text": "北京" },
  { "id": "guangzhou", "text": "广州" },
  { "id": "shenzhen", "text": "深圳" },
  { "id": "chengdu", "text": "成都" },
  { "id": "chongqing", "text": "重庆" },
  { "id": "shanghai", "text": "上海" }
]} />
          </Example>
          
          <h2 className="subhead">定义模版</h2>
          <Example>
<RadioGroup 
  value='beijing'
  textTpl='{cn}({en})'
  valueTpl='{en}' 
  data={[
    { "en": "nanjing",   "cn": "南京" },
    { "en": "beijing",   "cn": "北京" },
    { "en": "guangzhou", "cn": "广州" },
    { "en": "shenzhen",  "cn": "深圳" },
    { "en": "chengdu",   "cn": "成都" },
    { "en": "chongqing", "cn": "重庆" },
    { "en": "shanghai",  "cn": "上海" }
  ]}
/>
          </Example>

          <h2 className="subhead">key value 结构数据</h2>
          <div>0.6 后可以使用key value结构的object作为数据</div>
          <Example>
<RadioGroup value="beijing" data={{
  "nanjing": "南京",
  "beijing": "北京",
  "guangzhou": "广州",
  "shenzhen": "深圳",
  "chengdu": "成都",
  "chongqing": "重庆",
  "shanghai": "上海"
}} />
          </Example>

          <h2 className="subhead">简单数组</h2>
          <Example>
<RadioGroup inline={true}
  value="北京"
  data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />
          </Example>

          <h2 className="subhead">只读</h2>
          <Example>
<RadioGroup readOnly={true}
  inline={true}
  value="北京"
  data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />
          </Example>

          <h2 className="subhead">服务端数据</h2>
          <div>支持<a href="#/fetch">fetch</a>从服务端获取数据</div>
          <Example>
<RadioGroup inline={true}
  value="chengdu"
  fetch={{url:"json/text-value.json", cache: 3600 }} />
          </Example>

          <h2 className="subhead">data && children</h2>
          <Example>
<RadioGroup
  onChange={(value)=>console.log(value)}
  inline={true} 
  value="北京"
  data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]}
  >
  <Radio position={3} value="香港"><Icon icon="cloud-outline" />香港</Radio>
</RadioGroup>
          </Example>

        </div>
      </div>
    );
  }
}
