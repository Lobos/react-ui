var React = require('react')

var Arguments = React.createClass({
  componentDidMount: function () {
    window.prettyPrint(null, this.getDOMNode())
  },

  render: function () {
    return (
      <div className="bs-callout bs-callout-info">
        {this.props.children}
      </div>
    )
  }
})

Arguments.Example = React.createClass({
  render: function () {
    return (
      <pre className="prettyprint">{this.props.children}</pre>
    )
  }
})

Arguments.Item = React.createClass({
  render: function () {
    return (
      <dl>
        <dt>{this.props.name}</dt>
        <dd>
          <p>
            <label>类型: <code>{this.props.type}</code></label>
            {this.props.require && <span className="label label-warning">必填</span>}
            {this.props.def && <label>默认值: <code>{this.props.def}</code></label>}
            <br />
            {this.props.children}
          </p>
        </dd>
      </dl>
    )
  }
})

module.exports = Arguments
