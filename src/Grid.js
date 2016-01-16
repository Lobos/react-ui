'use strict';

import classnames from 'classnames';
import { getGrid } from './utils/grids';

module.exports = (props) => {
  let { className, width, offset, responsive, style, children } = props;
  className = classnames(
    className,
    getGrid({ width, offset, responsive })
  );
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
