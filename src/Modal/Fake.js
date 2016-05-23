'use strict';

import React, { Component, PropTypes, DOM } from 'react';
import { nextUid } from '../utils/strings';

export default function (open, close) {
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

    componentWillUnmount () {
      close(this.id);
    }

    componentWillReceiveProps (nextProps) {
      if (!nextProps.isOpen && !this.props.isOpen) {
        return;
      }

      if (nextProps.isOpen) {
        this.renderModal(nextProps);
      } else {
        close(this.id);
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
    buttons: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    children: PropTypes.any,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    width: PropTypes.number
  };

  return Modal;
}
