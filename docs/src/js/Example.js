'use strict';

import { PropTypes } from 'react';
import classnames from 'classnames';

const Example = (props) => {
  return (
    <div className={classnames('docs-example', props.className)}>
      {props.children}
    </div>
  );
};

Example.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

module.exports = Example;
