var React = require('react')
var Arguments = require('../components/arguments.jsx')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var ModalActions = Libs.Actions.Modal

var width = [6, 9, 5, 10, 12]
module.exports = React.createClass({
  getInitialState: function () {
    return {
      index: 1
    }
  },

  open: function () {
    ModalActions.confirm('hehehe')
  },

  handleClose: function () {
    var index = this.state.index - 1
    this.setState({ index: index })
  },

  multPop: function () {
    var index = this.state.index,
        w = width[index % width.length],
        lines = []
    for (var i=0; i<w; i++) {
      lines.push(<p>...</p>)
    }
    var content = (
      <div>
        <p key={i}>我是第 {index} 层Modal</p>
        {lines}
        <a href="javascript:;" onClick={this.multPop}>点我弹出第 {index+1} 层Modal</a>
      </div>
    )
    ModalActions.open({
      title: '多层嵌套modal',
      content: content,
      width: w,
      onClose: this.handleClose
    })
    index = index + 1
    this.setState({ index: index })
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Modal</h2>
        <br />

        <Arguments></Arguments>

        <Example>
          <a onClick={this.multPop} href="javascript:;">多层弹出</a>
        </Example>
      </div>
    )
  }
})
