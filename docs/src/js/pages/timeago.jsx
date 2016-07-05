'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { TimeAgo } from '../rctui'

module.exports = function () {
  return (
  <div>
    <div className="header">
      <h1>TimeAgo</h1>
    </div>
    <div className="content">
      <Code>
    {`timeago`}
  </Code>
      <h2 className="subhead">Example</h2>
      <Example>
        <TimeAgo base={new Date(2016, 6, 5, 0, 0, 0)}>
        </TimeAgo>
        <TimeAgo base={new Date(1991, 5, 14)}>
        </TimeAgo>
        <TimeAgo base={new Date(2019, 5, 14)}>
        </TimeAgo>
      </Example>
    </div>
  </div>
  )
}
