'use strict';

import React from 'react';

export default function triggerAble (Component) {
  class Trigger extends React.Component {
    render () {
      return <Component {...this.props} />;
    }
  }

  return Trigger;
}
