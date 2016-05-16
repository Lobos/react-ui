'use strict';

import React from 'react';
import Datetime from './Datetime';
import { shallowEqual } from '../utils/objects';
import { register } from '../higherOrders/FormItem';
import { compose } from '../utils/compose';
import pureRenderMixin from '../mixins/PureRender';

class Datepicker extends React.Component {
  constructor (props) {
    super(props);
  }

  shouldComponentUpdate (nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  render () {
    return (
      <Datetime { ...this.props } />
    );
  }
}

export default compose(
  register(['datetime', 'time', 'date'], {valueType: 'datetime'}),
  pureRenderMixin
)(Datepicker);
