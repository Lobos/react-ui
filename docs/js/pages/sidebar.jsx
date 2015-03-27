var React = require('react')
var Router = require('react-router')
var Libs = require('../libs')
var Icon = Libs.Icon

var menus = [
  { route: 'icon', text: 'Icon' },
  { route: 'loading', text: 'Loading' },
  { route: 'message', text: 'Message' },
  { route: 'checkbox', text: 'Checkbox' },
  { route: 'checkbox-group', text: 'Checkbox group' },
  { route: 'radio-group', text: 'Radio group' },
  { route: 'select', text: 'Select' },
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
  mixins: [Router.Navigation, Router.State, Libs.Mixins.Classable],

  getInitialState: function () {
    return {
      open: false
    }
  },

  onRouteChange: function (route) {
    this.transitionTo(route)  
    this.close()
  },

  open: function () {
    this.setState({ open: true })
  },

  close: function () {
    this.setState({ open: false })
  },

  render: function () {
    var items = menus.map(function (item, i) {
      return (
        <Item text={item.text} route={item.route} key={i} onRouteChange={this.onRouteChange} />
      )
    }.bind(this))

    var className = this.getClasses('sidebar', {
      open: this.state.open
    })

    return (
      <div className={className}>
        <div className="menu-handle"><a onClick={this.open} href="javascript:;"><Icon icon="bars" />&nbsp; React UI</a></div>
        <div className="list">
          <h3>React UI</h3>
          <ul className="list-unstyled">{items}</ul>
        </div>
        <div onClick={this.close} className="overlay"></div>
      </div>
    )
  }
})

module.exports = Sidebar
