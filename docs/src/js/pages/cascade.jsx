import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { Cascade, MultCascade, Icon, InputGroup, Select } from 'rctui'
import { Cn, En } from '../Language'
import Refetch from 'refetch'

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      maxLevel: 4
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Cascade</h1>
        </div>

        <div className="content button-docs">
          <En>
            <Code>
{`<Cascade
  data={array}          // same as Tree
  fetch={object}
  hastily={bool}        // if hastily is true, click parent node will trigger onChange
  maxLevel={integer}    //
  value={array}
  optionTpl={string}    // option template, default is "{text}"
  resultTpl={string}    // result template, default is same as optionTpl
  valueTpl={string}     // value template, default is "{value}"
  onChange={func(array)}
>
{ReactElement}
</Cascade>`}
            </Code>
          </En>
          <Cn>
            <Code>
{`<Cascade
  data={array}          // 格式和tree相同
  fetch={object}
  lazyFetch={promise}
  hastily={bool}        // 如果hastily为true，点击父节点也会触发onChange事件
  maxLevel={integer}    // 最多展示多少级选项
  value={array}
  optionTpl={string}    // 选项模板，默认为 {text}
  resultTpl={string}    // 选中项显示模板，如果不填使用 optionTpl
  valueTpl={string}     // 返回值模板，默认为 {value}
  onChange={func(array)}
>
{ReactElement}
</Cascade>`}
            </Code>
          </Cn>

          <h2 className="subhead">Example</h2>
          <Example>
            <Cascade fetch={'json/tree.json'} value={['1', '1.2', '1.2.1']} />
          </Example>

          <h2 className="subhead">hastily</h2>
          <Example>
            <Cascade fetch={'json/tree.json'} hastily />
          </Example>

          <h2 className="subhead">City</h2>
          <Example>
            <Cascade grid={1 / 2}
              fetch={{
                url: 'json/districts-city.json',
                then: (res) => res.districts
              }}
              valueTpl="{adcode}"
              optionTpl="{name}"
            />
          </Example>

          <h2 className="subhead">Lazy Fetch</h2>
          <Cn>延迟获取数据，一次获取一个级别列表</Cn>
          <Example>
            maxLevel: <Select data={[2, 3, 4]} value={this.state.maxLevel}
              onChange={(maxLevel) => this.setState({ maxLevel })} />

            <br /><br />

            <InputGroup grid={1 / 2}>
              <Icon icon="pin" />
              <Cascade
                maxLevel={parseInt(this.state.maxLevel)}
                value={['江苏省', '南京市', '鼓楼区', '三牌楼']}
                lazyFetch={(d) => {
                  return Refetch.jsonp('//restapi.amap.com/v3/config/district', {
                    subdistrict: 1,
                    key: 'be32611e40d4b1589a4facd7dfb0e37a',
                    keywords: d ? d.adcode : undefined
                  }, { cache: 600 }).then(res => {
                    if (res.status === '1') {
                      return res.districts[0].districts
                    } else {
                      alert('fetch data error')
                    }
                  })
                }}
                valueTpl="{name}"
                optionTpl="{name}"
              />
            </InputGroup>
          </Example>

          <h2 className="subhead">MultCascade</h2>
          <Example>
            <MultCascade fetch={'json/tree.json'} value={[
              {value: '1.2', text: 'Child 1.2'},
              {value: '2.2.1', text: 'Grandchild 2.2.1'}
            ]} />
          </Example>
        </div>
      </div>
    )
  }
}
