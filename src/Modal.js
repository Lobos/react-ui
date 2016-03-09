'use strict';

import classnames from 'classnames';
import React, { Component, PropTypes, DOM } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import Button from './Button';
import Overlay from './Overlay';
import { nextUid } from './utils/strings';

import { requireCss } from './themes';
requireCss('modal');

import {getLang, setLang} from './lang';
setLang('buttons');

const ADD_MODAL = 'id39hxqm';
const REMOVE_MODAL = 'id39i40m';
const CLICKAWAY = 'id5bok7e';
const ZINDEX = 1100;
let modals = [];
let modalContainer = null;

class ModalContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      increase: false,
      modals
    };
    this.close = this.close.bind(this);
    this.clickaway = this.clickaway.bind(this);
  }

  componentDidMount () {
    PubSub.subscribe(ADD_MODAL, this.addModal.bind(this));

    PubSub.subscribe(REMOVE_MODAL, this.removeModal.bind(this));

    PubSub.subscribe(CLICKAWAY, () => {
      let props = modals[modals.length - 1];
      if (props.clickaway) {
        PubSub.publish(REMOVE_MODAL);
      }
    });
  }

  addModal (topic, props) {
    let isReplace = false;
    modals = modals.map((m) => {
      if (m.id === props.id) {
        isReplace = true;
        m = props;
      }
      return m;
    });
    if (!isReplace) {
      modals.push(props);
    }

    this.setState({ modals, increase: true });
  }

  removeModal (topic, data) {
    let props = modals.pop();
    if (!props) {
      return;
    }
    if (props.onClose) {
      props.onClose(data);
    }
    this.setState({ modals, increase: false });
  }

  close () {
    PubSub.publish(REMOVE_MODAL);
  }

  clickaway () {
    PubSub.publish(CLICKAWAY);
  }

  renderModals () {
    let modalLength = this.state.modals.length;
    return this.state.modals.map((options, i) => {
      let style = {
        width: options.width || 500,
        zIndex: ZINDEX + i
      };
      if (typeof style.width === 'number' || style.width.indexOf('px') > 0) {
        style.width = parseInt(style.width);
        style.marginLeft = 0 - style.width / 2;
      } else if (style.width.indexOf('%') > 0) {
        style.marginLeft = (0 - parseInt(style.width) / 2) + '%';
      }

      let header, buttons = [];
      if (options.header) {
        header = <div className="rct-modal-header">{options.header}</div>;
      }

      if (options.buttons) {
        buttons = Object.keys(options.buttons).map((btn, j) => {
          let func = options.buttons[btn],
              status = j === 0 ? 'primary' : '',
              handle = () => {
                if (func === true) {
                  this.close();
                } else {
                  if (func()) {
                    this.close();
                  }
                }
              };
          return <Button status={status} key={j} onClick={handle}>{btn}</Button>;
        });
      }

      let className = classnames(
        'rct-modal',
        {
          fadein: this.state.increase && modalLength - 1 === i,
          noPadding: options.noPadding
        }
      );

      return (
        <div key={i} style={style} className={className}>
          <a className="rct-modal-close" onClick={this.close}>&times;</a>
          {header}
          <div className="rct-modal-content">
            {options.content}
          </div>
          {
            buttons.length > 0 &&
            <div className="rct-modal-footer">
              {buttons}
            </div>
          }
        </div>
      );
    });
  }

  render () {
    let mlen = this.state.modals.length;
    let className = classnames(
      'rct-modal-container',
      { active: mlen > 0 }
    );

    return (
      <div className={className}>
        <Overlay onClick={this.clickaway}
          className={classnames({active: mlen > 0})}
          style={{zIndex: ZINDEX + mlen - 1}} />
        { this.renderModals() }
      </div>
    );
  }
}

// static method ===============================================================

function close (data) {
  PubSub.publish(REMOVE_MODAL, data);
};

function open (options) {
  if (!modalContainer) {
    createContainer();
  }
  if (!options.id) {
    options.id = nextUid();
  }
  PubSub.publishSync(ADD_MODAL, options);
};

function alert (content, header) {
  let buttons = {};
  buttons[getLang('buttons.ok')] = true;

  open({
    clickaway: false,
    content,
    header,
    buttons
  });
};

function confirm (content, callback, header) {
  let buttons = {};

  buttons[getLang('buttons.ok')] = () => {
    callback();
    return true;
  };
  buttons[getLang('buttons.cancel')] = true;

  open({
    clickaway: false,
    content,
    header,
    buttons
  });
};

function createContainer () {
  modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  ReactDOM.render(<ModalContainer />, modalContainer);
}

// modal ===================================================================

class Modal extends Component {
  constructor (props) {
    super(props);
    this.id = nextUid();
  }

  componentDidMount () {
    if (this.props.isOpen) {
      this.renderModal(this.props);
    }
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.isOpen && !this.props.isOpen) {
      return;
    }

    if (newProps.isOpen) {
      this.renderModal(newProps);
    } else {
      close();
    }
  }

  renderModal (props) {
    open({
      id: this.id,
      content: props.children,
      ...props
    });
  }

  render () {
    return DOM.noscript();
  }
}

Modal.propTypes = {
  buttons: PropTypes.object,
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  width: PropTypes.number
};

Modal.open = open;
Modal.alert = alert;
Modal.confirm = confirm;
Modal.close = close;

module.exports = Modal;
