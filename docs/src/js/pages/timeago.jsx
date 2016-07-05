'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { TimeAgo } from '../rctui'

const now = new Date()
const secondDemo = new Date(now.setSeconds(now.getSeconds() - 10))
const minuteDemo = new Date(now.setMinutes(now.getMinutes() - 5))
const hourDemo = new Date(now.setHours(now.getHours() - 1))
const dayDemo = new Date(now.setDate(now.getDate() - 10))
const monthDemo = new Date(now.setMonth(now.getMonth() - 1))
const yearDemo = new Date(now.setFullYear(now.getFullYear() - 20))

module.exports = function () {
  return (
  <div>
    <div className="header">
      <h1>TimeAgo</h1>
    </div>
    <div className="content">
      <Code>
  {`<TimeAgo
   className={string}
   onClick={func}      // click callback
   base={date}      // 'the time base for timeago(required)'
   />`}
  </Code>
      <h2 className="subhead">Example</h2>
      <Example>
        <span>secondDemo: {secondDemo.toLocaleString()}</span>
        <TimeAgo base={secondDemo} />
        <span>secondDemo: {minuteDemo.toLocaleString()}</span>
        <TimeAgo base={minuteDemo} />
        <span>secondDemo: {hourDemo.toLocaleString()}</span>
        <TimeAgo base={hourDemo} />
        <span>secondDemo: {dayDemo.toLocaleString()}</span>
        <TimeAgo base={dayDemo} />
        <span>secondDemo: {monthDemo.toLocaleString()}</span>
        <TimeAgo base={monthDemo} />
        <span>secondDemo: {yearDemo.toLocaleString()}</span>
        <TimeAgo base={yearDemo} />
      </Example>
    </div>
  </div>
  )
}
