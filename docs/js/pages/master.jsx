var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

var Libs = require('../libs')
var Message = Libs.Message
var Loading = Libs.Loading
var Modal = Libs.Modal
var Icon = Libs.Icon

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
        <Message />
        <RouteHandler />
        <Modal />

        <a className="github-link" href="https://github.com/Lobos/react-ui">
          <div><Icon size="lg" icon="github" />&nbsp;{' '}github</div>
          <img src="http://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" />
        </a>
      </div>
    )
  }

})

module.exports = Master

