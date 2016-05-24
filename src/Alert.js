'use strict';

import { PropTypes } from 'react';
import classnames from 'classnames';

import AlertStyles from './styles/_alert.scss';

export default function Alert (props) {
  const { children, dismissible, className, onClose, type, ...others } = props;

  return (
    <div {...others} className={
      classnames(
        AlertStyles.alert,
        AlertStyles[type],
        dismissible && AlertStyles.dismissible,
        className
      )}>
      <a className={AlertStyles.close} onClick={onClose} href="javascript:;">×</a>
      { children }
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string
};

Alert.defaultProps = {
  type: 'info'
};
