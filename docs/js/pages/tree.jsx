var React = require('react')
var Example = require('../components/example.jsx')
//var Arguments = require('../components/arguments.jsx')
var Tree = require('../libs').Tree

var exampleSrc = window.location.pathname + 'json/tree.json'

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: [],
      greedy: false,
      checkAble: true
    }
  },

  handleChange: function () {
    var value = this.refs.tree.getValue('id')
    this.setState({ value: value })
  },

  toggleGreedy: function () {
    var greedy = !this.state.greedy
    this.setState({ greedy: greedy })
    setTimeout(this.handleChange, 0)
  },

  toggleCheckAble: function () {
    var checkAble = !this.state.checkAble
    this.setState({checkAble: checkAble})
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Tree view</h2>
        <br />

        <Example text={''}>
          <Tree ref="tree" flat={true} greedy={this.state.greedy} onChange={this.handleChange} checkAble={this.state.checkAble} src={exampleSrc} />
          <p><a onClick={this.toggleGreedy} href="javascript:;" >Change greedy: {this.state.greedy.toString()}</a></p>
          <p><a onClick={this.toggleCheckAble} href="javascript:;" >Change checkAble: {this.state.checkAble.toString()}</a></p>
          <p>{this.state.value}</p>
        </Example>
      </div>
    )
  }
})
