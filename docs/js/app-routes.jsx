var React = require('react')
var Router = require('react-router')
var Route = Router.Route
//var Redirect = Router.Redirect
var DefaultRoute = Router.DefaultRoute

var Master = require('./pages/master.jsx')
var Home = require('./pages/home.jsx')
var Icon = require('./pages/icon.jsx')
var Loading = require('./pages/loading.jsx')
var Message = require('./pages/message.jsx')
var Select = require('./pages/select.jsx')
var Checkbox = require('./pages/checkbox.jsx')
var CheckboxGroup = require('./pages/checkbox-group.jsx')
var RadioGroup = require('./pages/radio-group.jsx')
var MultSelect = require('./pages/mult-select.jsx')
var Datetime = require('./pages/datetime.jsx')
var Tree = require('./pages/tree.jsx')
var Form = require('./pages/form.jsx')


var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="icon" handler={Icon} />
    <Route name="loading" handler={Loading} />
    <Route name="message" handler={Message} />
    <Route name="select" handler={Select} />
    <Route name="checkbox" handler={Checkbox} />
    <Route name="checkbox-group" handler={CheckboxGroup} />
    <Route name="datetime" handler={Datetime} />
    <Route name="radio-group" handler={RadioGroup} />
    <Route name="mult-select" handler={MultSelect} />
    <Route name="tree" handler={Tree} />
    <Route name="form" handler={Form} />

    <DefaultRoute handler={Home} />
  </Route>
)

module.exports = AppRoutes
