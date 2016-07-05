'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { TimeAgo } from '../rctui'

module.exports = function () {
  return (
  <div>
    <div className="header">
      <h1>Alert</h1>
    </div>
    <div className="content">
      <Code>
  {`abc`}
  </Code>
      <h2 className="subhead">Example</h2>
      <Example>
        <TimeAgo>
        </TimeAgo>
      </Example>
    </div>
  </div>
  )
}
