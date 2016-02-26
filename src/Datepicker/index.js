'use strict';

import { Component } from 'react';
import Datetime from './Datetime';
import { shallowEqual } from '../utils/objects';
import { register } from '../higherOrders/FormItem';

class Datepicker extends Component {
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

Datepicker = register(Datepicker, ['datetime', 'time', 'date'], {valueType: 'datetime'});

module.exports = Datepicker;
