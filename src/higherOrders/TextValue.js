'use strict';

import React, { PropTypes } from 'react';
import curry from 'curry';

export const textValueEnhance = curry((single, Component) => {
  class TextValue extends React.Component {
    render () {
      return (
        <Component {...this.props} />
      );
    }
  }

  return TextValue;
});
