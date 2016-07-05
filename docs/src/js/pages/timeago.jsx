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
const yearDemo = '2000-01-01 00:00:00'

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
  base={date}         // 'the time base for timeago(required)'
/>`}
      </Code>

      <h2 className="subhead">Example</h2>
      <Example>
<div>secondDemo: {secondDemo.toLocaleString()}</div>
<TimeAgo onClick={() => {}} base={secondDemo} />
<div>minuteDemo: {minuteDemo.toLocaleString()}</div>
<TimeAgo base={minuteDemo} />
<div>hourDemo: {hourDemo.toLocaleString()}</div>
<TimeAgo base={hourDemo} />
<div>dayDemo: {dayDemo.toLocaleString()}</div>
<TimeAgo base={dayDemo} />
<div>monthDemo: {monthDemo.toLocaleString()}</div>
<TimeAgo base={monthDemo} />
<div>yearDemo: {yearDemo.toLocaleString()}</div>
<TimeAgo base={yearDemo} />
      </Example>
    </div>
  </div>
  )
}
