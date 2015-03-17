var React = require('react')

var Arguments = React.createClass({
  render: function () {
    return (
      <div className="bs-callout bs-callout-info">
        <h3>参数</h3>
        {this.props.children}
      </div>
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
            {this.props.def && <label>默认值: <code>{this.props.def}</code></label>}
            <br />
            {this.props.text}
          </p>
        </dd>
      </dl>
    )
  }
})

module.exports = Arguments
