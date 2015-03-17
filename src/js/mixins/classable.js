var React = require('react')
var classnames = require('classnames')

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  getClasses: function() {
    var mainArguments = Array.prototype.slice.call(arguments);
    if (this.props.className)
      mainArguments.push(this.props.className) 

    return classnames.apply(null, mainArguments)
  }
}
