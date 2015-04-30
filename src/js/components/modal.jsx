var React = require('react')
var Reflux = require('reflux')
var classnames = require('classnames')

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
    var modals = this.state.modals,
        len = modals.length,
        className

    if (len === 0) {
      return <div className="modal" />
    }

    modals = modals.map(function (modal, i) {
      className = classnames('modal-dialog', 'col-md-' + (modal.width || 6), {
        active: len === i + 1
      })
      return (
        <div key={i} className={className}>
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
      )
    }, this)

    return (
      <div className="modal open">
        <Overlay className="active" onClick={this.dismiss} />
        {modals}
      </div>
    )
  }
})

module.exports = Modal
