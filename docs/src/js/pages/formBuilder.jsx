'use strict';

import { Component } from 'react';
const FormBuilder = global.uiRequire('addons/FormBuilder');

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>FormBuilder</h1>
      </div>

      <div className="content pure-form">
        <FormBuilder />
      </div>
    </div>
  );
}
