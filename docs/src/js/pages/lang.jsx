import { Component } from 'react'
import Code from '../Code'
import { getLang } from '../../../../src/lang'
import { Cn, En } from '../Language'

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      path: 'buttons.ok',
      text: getLang('request.status.405')
    }
  }

  handleChange (event) {
    let path = event.target.value
    this.setState({ path })
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Language</h1>
          <Cn tag="h2">语言包</Cn>
        </div>

        <div className="content">
          <Cn>所有提示文字信息都放在 <em>lang</em> 下。</Cn>
          <En>Language package, include tip text, button text...</En>

          <h2 className="subhead">Set location</h2>
          <Cn>设置语言包，默认为'zh-cn'</Cn>
          <En>Static method, set current location, there are 2 language packages in the folder, 'zh-cn' and 'en', default is 'zh-cn'. If you want other language, use setLang.</En>
          <Code>
            {`
              import config from 'rctui/config'
              config.location = 'en|zh-cn'
            `}
          </Code>

          <h2 className="subhead">Lang.setLang(map[,map2...])</h2>
          <Cn>更新或者增加。</Cn>
          <En>Add or update language message</En>
          <Code>
{'Lang.setLang({ buttons: { ok: "Ok" } })'}
          </Code>

          <h2 className="subhead">Lang.getLang(path)</h2>
          <Cn>获取信息，<em>path</em> 为 <em>.</em> 分隔字符串。</Cn>
          <En>Get message, path is a string with '.'</En>
          <div>
            Lang.getLang(<input onChange={this.handleChange.bind(this)} value={this.state.path} type="text" />)
            <div>{JSON.stringify(getLang(this.state.path), null, 4) || 'undefined'}</div>
          </div>

          <Cn><h2 className="subhead">当前信息</h2></Cn>
          <En><h2 className="subhead">Current Message</h2></En>
          <Code>{JSON.stringify(getLang(), null, 4)}</Code>
        </div>
      </div>
    )
  }
}
