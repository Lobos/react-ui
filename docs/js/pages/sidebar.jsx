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
  { route: 'mult-select', text: 'Mult select' },
  { route: 'datetime', text: 'Datetime' },
  { route: 'tree', text: 'Tree' },
  { route: 'rating', text: 'Rating' },
  { route: 'form', text: 'Form' },
  { route: 'form-control', text: 'Form Control' },
  { route: 'pagination', text: 'Pagination' },
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
  mixins: [Router.State, Libs.Mixins.Classable],

  getInitialState: function () {
    return {
      open: false
    }
  },

  onRouteChange: function (route) {
    this.context.router.transitionTo(route)  
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
          <h3 onClick={function(){this.onRouteChange('/')}.bind(this)}>React UI</h3>
          <ul className="list-unstyled">{items}</ul>
        </div>
        <div onClick={this.close} className="overlay"></div>
      </div>
    )
  }
})

module.exports = Sidebar
