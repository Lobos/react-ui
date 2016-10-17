import Code from '../Code'
import Example from '../Example'
import { Progress } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Progress</h1>
      </div>

      <div className="content">
        <Code>
{`<Progress
className={string}
type={string}       // 'info|warning|success|danger', default is 'info'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Progress value={25} />
          <Progress value={2} max={5} />
          <Progress value={340} max={1024} />
        </Example>

        <h2 className="subhead">Type</h2>
        <Example>
          <Progress value={20} />
          <Progress type="info" value={40} />
          <Progress type="warning" value={60} />
          <Progress type="success" value={80} />
          <Progress type="danger" value={100} />
        </Example>

        <h2 className="subhead">Striped</h2>
        <Example>
          <Progress striped value={20} />
          <Progress striped type="info" value={40} />
          <Progress striped type="warning" value={60} />
          <Progress striped type="success" value={80} />
          <Progress striped type="danger" value={100} />
        </Example>
      </div>
    </div>
  )
}
