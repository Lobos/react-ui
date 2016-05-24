'use strict';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Button from '../Button';
import { CLOSE } from '../svgs';
import { PropArrayOrObject, PropStringOrNumber, PropStringOrElement } from '../utils/proptypes';
import pureRender from '../mixins/PureRender';
import { compose } from '../utils/compose';
import { addClass } from '../utils/dom';

import ModalStyles from '../styles/_modal.scss';

export const ZINDEX = 1100;

class Modal extends React.Component {
  constructor (props) {
    super(props);

    this.clickaway = this.clickaway.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount () {
    setTimeout(() => {
      addClass(findDOMNode(this), ModalStyles.in);
    }, 0);
  }

  handleClose () {
    this.props.onClose(this.props.id);
  }

  clickaway (event) {
    if (event.target === this.refs.element) {
      this.handleClose();
    }
  }

  renderHeader () {
    const { header } = this.props;
    return header ? <div className={ModalStyles.header}>{header}</div> : undefined;
  }

  renderFooter () {
    const { buttons } = this.props;
    if (!buttons) {
      return undefined;
    }

    let btns = [];
    if (!Array.isArray(buttons)) {
      Object.keys(buttons).forEach((key) => {
        btns.push({ content: key, onClick: buttons[key] });
      });
    } else {
      btns = buttons;
    }

    btns = btns.map((btn, i) => {
      if (typeof btn === 'string') {
        btn = { content: btn, onClick: true };
      }
      let { content, onClick } = btn;
      let status = i === 0 ? 'primary' : undefined;
      let handle = () => {
          if (onClick === true) {
            this.handleClose();
          } else if (onClick === 'submit') {
            let form = findDOMNode(this).querySelector('form');
            if (form) {
              let event = document.createEvent('HTMLEvents');
              event.initEvent('submit', true, true);
              form.dispatchEvent(event);
            }
          } else {
            if (onClick()) {
              this.handleClose();
            }
          }
        };
      return <Button status={status} key={i} onClick={handle}>{content}</Button>;
    });

    return <div className={ModalStyles.footer}>{btns}</div>;
  }

  render () {
    const { width, content, index, padding } = this.props;

    let className = classnames(
      ModalStyles.modal
    );

    const clickaway = this.props.clickaway ? this.clickaway : undefined;

    return (
      <div ref="element" className={ModalStyles.inner} onClick={clickaway} style={{ zIndex: ZINDEX + index }}>
        <div style={{width: width || '35rem'}} className={className}>
          <a className={ModalStyles.close} onClick={this.handleClose}>{CLOSE}</a>
          {this.renderHeader()}
          <div style={{padding}} className={ModalStyles.content}>
            {content}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  buttons: PropArrayOrObject,
  clickaway: PropTypes.bool,
  content: PropStringOrElement,
  header: PropStringOrElement,
  id: PropTypes.string,
  index: PropTypes.number,
  onClose: PropTypes.func,
  padding: PropStringOrNumber,
  width: PropStringOrNumber
};

export default compose(pureRender)(Modal);
