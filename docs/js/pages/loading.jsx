var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Loading = require('../libs').Loading

module.exports = React.createClass({

  getInitialState: function () {
    return {
      loadingCount: 0
    }
  },

  load: function (text) {
    Loading.start(text)
    var count = 5

    var down = function () {
      this.setState({ loadingCount: count })
      if (count === 0) {
        Loading.end()
        return
      }
      setTimeout(down, 1000)
      count--
    }.bind(this)
    down()
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Loading</h2>
        <p>页面载入等待，采用计数的方式处理多次load，当count>0时显示，count==0时隐藏，所以start和end方法必须成对使用</p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Loading text="页面载入中，请稍候..." />'}</Arguments.Example>
          <Arguments.Item name="text" type="string" def="'loading...'">显示的提示文字</Arguments.Item>
        </Arguments>

        <h3>Motheds</h3>
        <Arguments>
          <Arguments.Example>{'Loading.start(text)'}</Arguments.Example>
          <p>静态方法，执行后全局 count+1</p><br />
          <Arguments.Item name="text" type="string">需要显示的文字信息，不传值将使用Component传入的text值</Arguments.Item>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'Loading.end()'}</Arguments.Example>
          <p>静态方法，执行后全局 count-1</p>
        </Arguments>

        <Example title="Example" text={'<Loading text="页面载入中，请稍候..." />\n<a onClick={function() { Loading.start() }} href="javascript:;">loading</a>\n<a onClick={function() { Loading.start("自定义文字") }} href="javascript:;">自定义文字</a>'}>
          <a onClick={function() { this.load() }.bind(this)} href="javascript:;">loading</a>
          <br />
          <a onClick={function() { this.load('自定义文字') }.bind(this)} href="javascript:;">自定义文字</a>
          <br />
          {this.state.loadingCount > 0 && <span>end count: {this.state.loadingCount}</span>}
        </Example>
      </div>
    )
  }

})
