var React = require('react')

var Home = React.createClass({
  componentDidMount: function () {
    window.prettyPrint(null, this.getDOMNode())
  },

  render: function () {
    return(
      <div className="content">
        <h2 className="page-header">关于React UI</h2>
        <p>一个基于 React 的 Component 集合，UI部分基于<a href="http://getbootstrap.com/">bootstrap</a>，Icon部分使用了<a href="http://fontawesome.io/">font-awesome</a>。</p>
        <br />

        <h3>数据格式</h3>
        <hr />
        <p>框架中所有与服务器交互的部分，统一使用json，采用以下格式封装</p>
        <pre className="prettyprint">{
'{\n\
    "status": number, // 值为1时表示成功，必填\n\
    "msg": string, // 消息\n\
    "timestamp": string, // 时间戳\n\
    "cache": bool, // 是否使用当前缓存中的数据\n\
    "data": object // 返回内容\n\
}'
        }</pre>
      </div>
    )
  }

})

module.exports = Home
