var React = require('react')
var Router = require('react-router')

var menus = [
  { route: 'icon', text: 'Icon' }
]

var Item = React.createClass({
  routeChange: function () {
    this.props.onRouteChange(this.props.route)
  },

  render: function () {
    return (
      <li><a onClick={this.routeChange} href="javascript:;">{this.props.text}</a></li>
    )
  }
})

var Sidebar = React.createClass({
  mixins: [Router.Navigation, Router.State],

  onRouteChange: function (route) {
    this.transitionTo(route)  
  },

  render: function () {
    var items = menus.map(function (item, i) {
      return (
        <Item text={item.text} route={item.route} key={i} onRouteChange={this.onRouteChange} />
      )
    }.bind(this))

    return (
      <div className="sidebar">
        <div className="list">
          <h3>React UI</h3>
          <ul className="list-unstyled">{items}</ul>
        </div>
      </div>
    )
  }
})

module.exports = Sidebar
