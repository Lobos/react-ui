/*
var request = require('../utils/request')
var loading = require('../components/loading.jsx')
var Router = require('react-router')

module.exports = {
  mixins: [Router.Navigation],

  componentWillMount: function () {
    this.setState({ struct: [], data: [] })
    this.getStruct()
    this.getData()
  },

  getStruct: function () {
    loading.start()
    request.getCache(
      this.props.structUrl, 
      function (res) {
        loading.end()
        if (res.status) {
          this.setState({ struct: res.data })
        }
      }.bind(this),
      loading.end
    )
  },

  getData: function () {
    loading.start()
    request.get(
      this.props.resUrl, 
      null, 
      function (res) {
        loading.end()
        if (res.status) {
          this.setState({ data: res.data })
        }
      }.bind(this),
      loading.end
    )
  },

  refresh: function () {
    this.getData()
  },

  addEntity: function () {
    this.editEntity('0')
  },

  editEntity: function (id) {
    this.transitionTo(this.props.entityRoute + id)  
  },

  getPager: function () {
  }
}
 */
