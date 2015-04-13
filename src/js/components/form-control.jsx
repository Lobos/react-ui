var React = require('react')

var Classable = require('../mixins/classable')
var Validatable = require('../mixins/validatable')

function formatCol(cols) {
  cols = cols || [2, 10]
  var t = typeof cols
  switch (t) {
    case 'string':
      var sl = cols.split(',')
      cols = []
      sl.forEach(function (s) {
        cols.push(parseInt(s))
      })
      break
    case 'number':
      cols = [cols]
      break
  }
  if (cols.length === 1) {
    cols[1] = 0
  }
  var c0 = cols[0]
  if (isNaN(c0) || c0 < 1) {
    c0 = cols[0] = 2
  }
  var c1 = cols[1]
  if (isNaN(c1) || c1 < 1 || c0 + c1 > 12) {
    cols[1] = 12 - c0
  }
  return cols
}

var FormControl = React.createClass({
  mixins: [Classable, Validatable],

  getInitialState: function () {
    return {
      hasError: false,
      hintText: '',
      cols: formatCol(this.props.cols)
    }
  },

  getValue: function () {
  },

  render: function () {
    var className = this.getClasses("form-group"),
        cols = this.state.cols
    return (
      <div className={className}>
        <label className={"control-label col-sm-" + cols[0]}>{this.props.label}</label>
        <div className={"col-sm-" + cols[1]}>
          <input className="form-control" type="text" />
          <span className="help-block">{this.state.hintText}</span>
        </div>
      </div>
    )
  }
})

module.exports = FormControl
