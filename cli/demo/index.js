'use strict';

import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormControl, FormSubmit, Modal } from 'rctui';

class Demo extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h2>React UI Form demo</h2>
        <Form onSubmit={(data) => Modal.alert(JSON.stringify(data), 'alert')}>
          <FormControl type="text" name="text" grid={1/4} label="text" />
          <FormControl type="date" name="date" label="date" />
          <FormControl type="time" name="time" label="time" />
          <FormControl type="select" name="select" grid={1/4} label="select" data={['1', '2', '3', '4', '5', '6', '7']} />
          <FormSubmit>submit</FormSubmit>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'));

