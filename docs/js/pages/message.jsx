var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var MessageActions = require('../libs').Actions.Message

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Message</h2>
        <p>全局弹出消息</p>
        <br />

        <Arguments>
          <Arguments.Example>
            {'<Message top={bool} clickaway={bool} />'}
          </Arguments.Example>
          <Arguments.Item name="top" type="bool" def="false">当top为true时在顶部显示，否则在左下角</Arguments.Item>
          <Arguments.Item name="clickaway" type="bool" def="true">当clickaway为true时，点击屏幕任意空白位置关闭消息框</Arguments.Item>
        </Arguments>

        <h3>Motheds</h3>
        <Arguments>
          <Arguments.Example>{'MessageActions.info(content, title)\nMessageActions.warn(content, title)\nMessageActions.success(content, title)\nMessageActions.error(content, title)\n'}</Arguments.Example>
          <p>静态方法</p><br />
          <Arguments.Item name="content" type="任意" require={true}>要显示的内容</Arguments.Item>
          <Arguments.Item name="title" type="string"></Arguments.Item>
        </Arguments>

        <Example title="Example" text={'<a href="javascript:;" onClick={function () { MessageActions.info("pop info") }}>info</a>\n<a href="javascript:;" onClick={function () { MessageActions.success("pop success", "Success") }}>success</a>\n<a href="javascript:;" onClick={function () { MessageActions.warn(<span>pop span warning</span>) }}>warning</a>\n<a href="javascript:;" onClick={function () { MessageActions.error("pop error") }}>error</a>'}>
          <a href="javascript:;" onClick={function () { MessageActions.info("pop info") }}>info</a><br />
          <a href="javascript:;" onClick={function () { MessageActions.success("pop success", "Success") }}>success</a><br />
          <a href="javascript:;" onClick={function () { MessageActions.warn(<span>pop span warning</span>) }}>warning</a><br />
          <a href="javascript:;" onClick={function () { MessageActions.error("pop error") }}>error</a>
        </Example>
      </div>
    )
  }
})
