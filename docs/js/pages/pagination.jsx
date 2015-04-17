var React = require('react')
var Arguments = require('../components/arguments.jsx')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var Pagination = Libs.Pagination
var Checkbox = Libs.Checkbox

module.exports = React.createClass({
  getInitialState: function () {
    return {
      totalItems: 1000,
      itemsPerPage: 10,
      index: 1,
      showGo: true
    }
  },

  set: function (type) {
    return function (event) {
      var state = {}
      var value = parseInt(event.target.value)
      if (value) {
        state[type] = value
        this.setState(state)
        this.refs.page.trySetState(type, event.target.value)
      }
    }.bind(this)
  },

  handleChange: function (index) {
    this.setState({ index: index })
  },
  
  render: function () {
    var inputProps = {
      className: 'form-control',
      style: { width:80, display:'inline-block' }
    }
    return (
      <div className="content">
        <h2 className="page-header">Pagination</h2>
        <p>分页</p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Pagination onChange={function} totalItems={int} itemsPerPage={int} span={int} index={int} showGo={bool} />'}</Arguments.Example>
          <Arguments.Item name="totalItems" type="int" require={true}>数据总条数</Arguments.Item>
          <Arguments.Item name="itemsPerPage" type="int" require={true}>每页数据条数</Arguments.Item>
          <Arguments.Item name="index" type="int" require={true}>当前页码</Arguments.Item>
          <Arguments.Item name="span" type="int" def="4">当前页码前后显示的页码数量，显示的数量为<code>span*2+1</code></Arguments.Item>
          <Arguments.Item name="showGo" type="bool" def="false">显示页码输入框</Arguments.Item>
        </Arguments>

        <h3>Methods</h3>
        <Arguments>
          <Arguments.Example>{'setIndex(int)'}</Arguments.Example>
          <p>设置当前页码</p>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'setTotalItems(int)'}</Arguments.Example>
          <p>设置总数据条数</p>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'setItemsPerPage(int)'}</Arguments.Example>
          <p>设置每页数据条数</p>
        </Arguments>

        <Example text='<Pagination showGo={this.state.showGo} onChange={this.handleChange} totalItems={this.state.totalItems} itemsPerPage={this.state.itemsPerPage} index={this.state.index} />'>
          <div>
            <Pagination ref="page" showGo={this.state.showGo} onChange={this.handleChange} totalItems={this.state.totalItems} itemsPerPage={this.state.itemsPerPage} index={this.state.index} />
          </div>
          总数：<input {...inputProps} value={this.state.totalItems} onChange={this.set('totalItems')} />
          每页数量：<input {...inputProps} value={this.state.itemsPerPage} onChange={this.set('itemsPerPage')} />
          当前页码：<input {...inputProps} value={this.state.index} onChange={this.set('index')} />
          <Checkbox checked={this.state.showGo} onChange={function (v) { this.setState({ showGo: v }) }.bind(this)} text="showGo" />
        </Example>
      </div>
    )
  }
})
