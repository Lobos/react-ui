'use strict';

import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormControl } from 'rctui';

class Demo extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        Hello demo.
        <Form />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'));
