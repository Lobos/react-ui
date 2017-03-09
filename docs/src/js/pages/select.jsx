import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { TplDataDesc } from '../CommDocs'
import { Select, Button } from 'rctui'
import { Cn, En } from '../Language'

const bigData = []
let i = 1000
while (i--) { bigData.push(i) }

function imageTpl (d) {
  return <span><img src={`//lobos.github.io/react-ui/images/flags/${d.code}.png`} /> {d.en}</span>
}

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      country: ''
    }

    this.handleCountry = this.handleCountry.bind(this)
  }

  handleCountry (courtry) {
    this.setState({ courtry })
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Select</h1>
          <Cn tag="h2">下拉列表</Cn>
        </div>

        <div className="content">
          <Cn>
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
  maxShowCount={number} // 同时最多显示选项数。默认值为30
  mult={bool}           // 是否多选，默认为 false
  onChange={function}   // 值改变时触发事，参数为 value
  optionTpl={string}    // 选项模板，默认为 {text}
  required={bool}       // 如果mult为false时，设置required为true，将不会显示删除，默认值为false
  resultTpl={string}    // 选中项显示模板，如果不填使用 optionTpl
  valueTpl={string}     // 返回值模板，默认为 {id}
  value={string}        // 初始值
/>
模板使用 "{key}" 形式的字符串进行格式化。
data 为简单数组(如["中国", "美国", "俄罗斯", "德国"])，时，所有模板无效。
`}
            </Code>
          </Cn>
          <En>
            <Code>
{`<Select
  className={string}    // class
  data={array|object}
  fetch={object}
  grid={{width, offset, responsive}} // see Grid
  sep={string|null}     // default is ','
  filterAble={bool}     // default is false
  readOnly={bool}       // default is false
  groupBy={string}      // data key
  placeholder={string}
  maxShowCount={number} // max render count, use for large data, default is 30
  mult={bool}           // default is false
  onChange={function(value)}
  optionTpl={string}    // option template, default is "{text}"
  resultTpl={string}    // result template, default is same as optionTpl
  valueTpl={string}     // value template, default is "{value}"
  value={string}        // 初始值
/>`}
            </Code>
          </En>
          <p><a href="#/fetch">fetch see here</a></p>
          <Cn>0.7 加入了lazy render的机制，一个Select最多同时render maxShowCount个选项，提升大数据下的性能。</Cn>

          <TplDataDesc />

          <h2 className="subhead">Simple Array</h2>
          <Example>
<Select grid={{width: 1 / 3}}
  placeholder="no data"
  data={[]} />
<Select grid={{width: 1 / 3}}
  placeholder="City"
  required
  data={['Beijing', 'Tokyo', 'New York', 'Edinburgh', 'San Francisco', 'Sidney']} />
<Select grid={{width: 1 / 3}}
  mult
  data={['Beijing', 'Tokyo', 'New York', 'Edinburgh', 'San Francisco', 'Sidney']} />
          </Example>

          <h2 className="subhead">Object</h2>
          <Example>
<Select grid={{width: 1 / 4}}
  placeholder="Key Value"
  value="us"
  data={{
    'cn': 'China',
    'us': 'United States',
    'jp': 'Japan',
    'gb': 'Great Britain',
    'fr': 'France',
    'de': 'Germany',
    'es': 'Spain'
  }} />
          </Example>

          <h2 className="subhead">Single Select</h2>
          <Example>
<Select grid={{width: 1 / 2}}
  placeholder="Single Select"
  filterAble
  sep={null}
  optionTpl={imageTpl}
  valueTpl={d => d.code}
  onChange={ this.handleCountry }
  value={'ar'}
  fetch={'json/countries.json'} />
<Button style={{ marginLeft: 10 }} onClick={ () => this.setState({ country: '' }) }>Clear</Button>
          </Example>

          <h2 className="subhead">Large Options</h2>
          <Cn>这个示例设置了1000个选项。</Cn>
          <Example>
<Select grid={{width: 1 / 3}}
  filterAble
  placeholder="single"
  data={bigData} />
&nbsp;
<Select grid={{width: 1 / 3}}
  filterAble
  placeholder="mult"
  mult
  data={bigData} />
          </Example>

          <h2 className="subhead">Mult Select</h2>
          <Example>
<Select grid={{width: 1 / 2}}
  mult
  filterAble
  optionTpl={imageTpl}
  resultTpl="{en}"
  valueTpl="{en}"
  fetch={{url: 'json/countries.json', cache: 3600}} />
          </Example>

          <h2 className="subhead">groupBy</h2>
          <Example>
<Select grid={{width: 1 / 2}}
  placeholder="Group by continent"
  groupBy="continent"
  filterAble
  optionTpl={imageTpl}
  valueTpl="{country}-{en}"
  fetch={{url: 'json/countries.json', cache: true}} />
          </Example>

          <h2 className="subhead">readOnly</h2>
          <Example>
<Select grid={{width: 1 / 3}} readOnly
  value="New York"
  data={['Beijing', 'Tokyo', 'New York', 'Edinburgh', 'San Francisco', 'Sidney']} />
          </Example>
        </div>
      </div>
    )
  }
}
