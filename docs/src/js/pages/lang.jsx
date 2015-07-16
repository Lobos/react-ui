"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
let {Lang} = global.uiRequire()

module.exports = React.createClass({
  displayName: 'Pages/Lang',

  mixins: [Prettify],

  getInitialState: function () {
    return {
      path: 'request.status.405',
      text: Lang.get('request.status.405')
    }
  },

  handleChange: function (event) {
    let path = event.target.value
    let text = JSON.stringify(Lang.get(path), null, 4) || 'undefined'
    this.setState({ path, text })
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Language</h1>
          <h2>语言包</h2>
        </div>

        <div className="content">
          <p>所有提示文字信息都放在 <em>lang</em> 下。</p>
          <h2 className="subhead">Lang.set(map[,map2...])</h2>
          <p>更新或者增加信息。</p>

          <h2 className="subhead">Lang.get(path)</h2>
          <p>获取信息，<em>path</em> 为 <em>.</em> 分隔字符串。</p>
          <p>
            <input onChange={this.handleChange} value={this.state.path} type="text" />
            <p>{this.state.text}</p>
          </p>

          <h2 className="subhead">当前信息</h2>
          <pre className="prettyprint">{JSON.stringify(Lang.get(), null, 4)}</pre>
        </div>
      </div>
    )
  }
})
