'use strict';

import { PropTypes } from 'react';

const Example = (props) => {
  return (
    <div className="docs-example">{props.children}</div>
  );
};

Example.propTypes = {
  children: PropTypes.any
};

module.exports = Example;
