import Code from '../Code'
import Example from '../Example'
import { Alert } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Alert</h1>
      </div>

      <div className="content">
        <Code>
{`<Alert
className={string}
style={object}
onClose={func}      // close callback, if onClose undefined, will not show close button
type={string}       // 'info|warning|success|danger|error', default is 'info'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Alert onClose={() => console.log('closed')}>Some text...</Alert>
          <Alert type="success">type success...</Alert>
          <Alert type="warning">type warning...</Alert>
          <Alert type="danger">type danger...</Alert>
          <Alert type="error"><h3>Error</h3><p>some text</p></Alert>
        </Example>
      </div>
    </div>
  )
}
