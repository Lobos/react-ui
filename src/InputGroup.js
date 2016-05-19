'use strict';

import React, { Children, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';
import Input from './Input';
import Button from './Button';

import InputStyles from './styles/_input-group.scss';

export default function InputGroup (props) {
  let className = classnames(InputStyles.group, getGrid(props.grid));

  const children = Children.map(props.children, (child) => {
    let type = child ? child.type : null;

    if (type === Input) {
      return cloneElement(child, { className: classnames(props.className, InputStyles.input) });
    } else if (type === Button) {
      className = classnames(className, InputStyles.groupBtn);
      return cloneElement(child, { tag: 'a', className: classnames(props.className, InputStyles.btn) });
    } else {
      return <div className={InputStyles.addon}>{child}</div>;
    }
  });

  return <div className={className}>{children}</div>;
}

InputGroup.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])
};
