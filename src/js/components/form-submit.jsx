'use strict'

let React = require('react')
let Classable = require('../mixins/classable')
let Button = require('./button.jsx')

let Submit = React.createClass({
  displayName: 'FormSubmit',

  propTypes: {
    children: React.PropTypes.any,
    locked: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  mixins: [Classable],

  render: function () {
    let children = this.props.children
    let content
    if (Array.isArray(children)) {
      content = this.props.locked ? children[1] : children[0]
    } else {
      content = children
    }

    return (
      <div className="pure-control-group">
        <Button type="submit"
          status='primary'
          onClick={this.props.onClick}
          disabled={this.props.locked}>
          {content}
        </Button>
      </div>
    )
  }
})

module.exports = Submit
