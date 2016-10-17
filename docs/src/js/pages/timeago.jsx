import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { TimeAgo } from 'rctui'

const now = new Date()
const secondDemo = new Date(now.setSeconds(now.getSeconds() - 10))
const minuteDemo = new Date(now.setMinutes(now.getMinutes() - 5))
const hourDemo = new Date(now.setHours(now.getHours() - 1))
const dayDemo = new Date(now.setDate(now.getDate() - 10))
const monthDemo = new Date(now.setMonth(now.getMonth() - 1))
const yearDemo = new Date(2000, 0, 1, 0, 0, 0)

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
  onClick={func}      // click callback, when func exists, the timeago text wrapped by <a> tag
  base={date}         // the time base for timeago('required')
  mode={string}       // the strategy of counter
                             'default|least|most', default is 'default'
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
<div>yearDemo: {yearDemo.toLocaleString()}</div>
<TimeAgo base={yearDemo} mode="least"/>
      </Example>
    </div>
  </div>
  )
}
