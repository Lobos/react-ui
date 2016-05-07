"use strict";

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {Select, Button} = global.uiRequire();

const bigData = [];
let i=10000;
while (i--) { bigData.push(i); }

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      country: ''
    };

    this.handleCountry = this.handleCountry.bind(this);
  }

  handleCountry (courtry) {
    this.setState({ courtry });
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Select</h1>
          <h2>下拉列表</h2>
        </div>

        <div className="content">
          <Code>
{`<Select
  className={string}    // class
  data={array|object}   // 数据
  fetch={object}
  grid={{width, offset, responsive}} // 宽度，详见Grid
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
data 为简单数组(如["中国", "美国", "俄罗斯", "德国"])，时，所有模板无效。
`}
          </Code>
          <div><a href="#/fetch">fetch 参见这里</a></div>

          <h2 className="subhead">简单数组</h2>
          <Example>
<Select grid={{width:1/3}}
  placeholder="简单数组"
  data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
&nbsp; 
<Select grid={{width:1/3}}
  mult={true}
  data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
          </Example>

          <h2 className="subhead">KeyValue</h2>
          <Example>
<Select grid={{width:1/4}}
  placeholder="Key Value"
  data={{ jiangsu: '江苏', shanghai: '上海', beijing: '北京', guangdong: '广东', zhejiang: '浙江' }} />
          </Example>

          <h2 className="subhead">单选</h2>
          <Example>
<Select grid={{width:1/2}}
  placeholder="单选"
  filterAble={true}
  optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  onChange={ this.handleCountry }
  value={this.state.country}
  fetch={"json/countries.json"} />
<Button style={{ marginLeft: 10 }} onClick={ () => this.setState({ country: '' }) }>清空</Button>
          </Example>

          <h2 className="subhead">超大数据</h2>
          <p>模拟了10000条数据</p>
          <Example>
<Select grid={{width:1/3}}
  placeholder="单选"
  data={bigData} />
&nbsp; 
<Select grid={{width:1/3}}
  placeholder="多选"
  mult={true}
  data={bigData} />
          </Example>

          <h2 className="subhead">多选</h2>
          <Example>
<Select grid={{width:1/2}}
  mult={true}
  placeholder="多选"
  filterAble={true}
  optionTpl="<img src='//lobos.github.io/react-ui/images/flags/{code}.png' /> {country}-{en}"
  resultTpl="<img src='//lobos.github.io/react-ui/images/flags/{code}.png' /> {country}"
  valueTpl="{en}"
  fetch={{url:"json/countries.json", cache:3600}} />
          </Example>

          <h2 className="subhead">groupBy</h2>
          <Example>
<Select grid={{width:1/2}}
  placeholder="Group by continent"
  groupBy="continent"
  filterAble={true}
  optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  fetch={{url: "json/countries.json", cache: true}} />
          </Example>

          <h2 className="subhead">readOnly</h2>
          <Example>
<Select grid={{width:1/3}} readOnly
  value="俄罗斯"
  data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
          </Example>

        </div>
      </div>
    );
  }
}
