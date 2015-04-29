var React = require('react')
var Reflux = require('reflux')

var Lang = require('../lang')
var Overlay = require('./overlay.jsx')
var Classable = require('../mixins/classable')
var modalStore = require('../store/modal')
var modalActions = require('../actions/modal')

var Modal = React.createClass({
  mixins: [Classable, Reflux.connect(modalStore, 'modals')],

  dismiss: function () {
    modalActions.dismiss()
  },

  render: function () {
    /*
    var modals = this.state.modals.map(function (modal, i) {
      return (
        <div key={i}>{modal.content}</div>
      )
    })
    */
    if (this.state.modals.length === 0) {
      return <div className="modal" />
    }

    var modal = this.state.modals[0]

    return (
      <div className="modal open">
        <Overlay className="active" onClick={this.dismiss} />
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={this.dismiss} type="button" className="close">&times;</button>
              <h4 className="modal-title" id="myModalLabel">{modal.title}&nbsp;</h4>
            </div>
            <div className="modal-body">
              {modal.content}
            </div>
            <div className="modal-footer">
             {modal.onCheck && <button onClick={function () { modal.onCheck() }} type="button" className="btn btn-primary">{Lang.get('buttons.ok')}</button>}
              <button onClick={this.dismiss} type="button" className="btn btn-default">{Lang.get('buttons.close')}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Modal
