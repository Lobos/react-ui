"use strict";

import React from 'react';
import prettify from '../prettify';
const {Select, dataSource, Button} = global.uiRequire();

class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      country: ''
    };
  }

  render () {
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
  data={array|func}     // 数据，array 或者 dataSource
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
          </pre>
          <p><a href="#/dataSource">dataSource 参加这里</a></p>

          <h2 className="subhead">简单数组</h2>
          <div>
            <Select grid={{width:1/4}} placeholder="简单数组" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
            {' '}
            <Select grid={{width:1/2}} mult={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
          </div>
          <pre className="prettyprint">
{`<Select placeholder="简单数组" data={["中国", "美国", "俄罗斯", "德国"]} />
<Select className="pure-u-1-2" mult={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />`}
          </pre>

          <h2 className="subhead">单选</h2>
          <Select grid={{width:1/2}}
            placeholder="单选"
            filterAble={true}
            optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
            valueTpl="{country}-{en}"
            //onChange={ country => this.setState({ country }) }
            value={this.state.country}
            data={dataSource("json/countries.json")} />
          <Button style={{ marginLeft: 10 }} onClick={ () => this.setState({ country: '' }) }>清空</Button>
          <pre className="prettyprint">
{`<Select placeholder="单选"
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  value={this.state.country}
  data={dataSource("json/countries.json")} />
<Button style={{ marginLeft: 10 }} onClick={ () => this.setState({ country: '' }) }>清空</Button>
`}
          </pre>

          <h2 className="subhead">多选</h2>
          <Select grid={{width:1}}
            mult={true}
            placeholder="多选"
            filterAble={true}
            optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
            resultTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}'
            valueTpl="{en}"
            data={dataSource("json/countries.json", null, {cache: true})} />
          <pre className="prettyprint">
{`<Select placeholder="多选"
  mult={true}
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  resultTpl='<img src="images/flags/{code}.png" /> {country}'
  valueTpl="{en}"
  data={dataSource("json/countries.json", null, {cache: true})} />
`}
          </pre>

          <h2 className="subhead">groupBy</h2>
          <Select grid={{width:1}}
            placeholder="Group by continent"
            groupBy="continent"
            filterAble={true}
            optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
            valueTpl="{country}-{en}"
            data={dataSource("json/countries.json", null, {cache: true})} />
          <pre className="prettyprint">
{`<Select placeholder="Group by continent"
  groupBy="continent"
  filterAble={true}
  optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  data={dataSource("json/countries.json", null, {cache: true})} />
`}
          </pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
