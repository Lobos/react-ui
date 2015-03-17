var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

//var Libs = require('../libs')
//var message = Libs.message
//var loading = Libs.loading

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

        <RouteHandler />
      </div>
    )
  }

})

module.exports = Master

