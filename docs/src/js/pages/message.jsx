import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Cn, En } from '../Language'
import { Message, Icon } from 'rctui'

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>Message</h1>
        <Cn><h2>消息</h2></Cn>
      </div>

      <div className="content">
        <h2 className="subhead">Global method</h2>
        <Code>
{`Message[info|show|warning|success|error|danger](content, { duration })
info === show
error === danger`}
        </Code>

        <Cn>
          <b>content:</b>消息内容，必填，值为 <em>string</em> 或 <em>ReactElement</em><br />
          <b>duration:</b>显示时长，单位为秒。当 duration > 0 时，Message会在显示duration秒后自动关闭，否则，会显示一个关闭按钮，需要手动关闭。默认值：当type为'danger'或者'error'时，默认值为 0，其它为 6
        </Cn>
        <En>
          <b>content:</b> required, string or ReactElement<br />
          <b>duration:</b> seconds, number. if duration > 0, message will auto close after 'duration' seconds, else show a close button. message type === 'danger|error', default 'duration' is 0, else default 'duration' is 6 seconds.
        </En>

        <h2 className="subhead">info</h2>
        <Example>
<a onClick={() => Message.info('This is an info message.')}>click me</a>
        </Example>

        <h2 className="subhead">error</h2>
        <Example>
<a onClick={() => Message.error('This is an error message.')}>click me</a>
        </Example>

        <h2 className="subhead">duration</h2>
        <Example>
<a onClick={
  () => Message.error(
    'this message will close after 2 seconds.',
    { duration: 2 }
  )}>
  click me
</a>
        </Example>

        <h2 className="subhead">with element</h2>
        <Example>
<a onClick={
  () => Message.warning(
    <div><span>some text.</span> <a>a link</a></div>
  )}>
  click me
</a>
        </Example>

        <h2 className="subhead">with icon</h2>
        <Example>
<a onClick={
  () => Message.success(
    <span><Icon icon="check" /> success with icon</span>
  )}>
  click me
</a>
        </Example>

      </div>
    </div>
  )
}
