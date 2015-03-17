var React = require('react')

module.exports = React.createClass({
  componentDidMount: function () {
    window.prettyPrint(null, this.getDOMNode())
  },

  render: function () {
    //var converted = React.renderToStaticMarkup(this.props.children)
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="bs-example bs-example-type">
          {this.props.children}
        </div>
        <pre className="react-code prettyprint">{this.props.text}</pre>
      </div>
    )
  }

})
