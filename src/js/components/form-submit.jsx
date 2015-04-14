var React = require('react')
var classnames = require('classnames')

var Submit = React.createClass({

  getInitialState: function () {
    return {
      disabled: this.props.locked
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.locked !== this.props.locked) {
      this.setState({ disabled:nextProps.locked })
    }
  },

  render: function () {
    var text = this.props.text || this.props.label
    if (text instanceof Array) {
      var i = this.state.disabled && text.length > 1 ? 1: 0
      text = text[i]
    }

    var button = <button onClick={this.handleSubmit} disabled={this.state.disabled} className="btn btn-primary" type="submit">{text}</button>

    if ('horizontal' === this.props.layout) {
      var labelWidth = this.props.labelWidth || 2,
          width = 12 - labelWidth,
          className = classnames("col-sm-offset-" + labelWidth, "col-sm-" + width)

      button = 
        <div className="form-group">
          <div className={className}>
            {button}
          </div>
        </div>
    }

    return button
  }
})

module.exports = Submit
