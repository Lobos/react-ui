var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

var Libs = require('../libs')
//var message = Libs.message
var Loading = Libs.Loading

var Sidebar = require('./sidebar.jsx')

var Master = React.createClass({

  getInitialState: function () {
    return {
      sidebarOpened: true
    }
  },

  render: function () {
    return(
      <div className="app-root">
        <Sidebar />

        <Loading text="页面载入中，请稍候..." />
        <RouteHandler />
      </div>
    )
  }

})

module.exports = Master

