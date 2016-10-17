import Code from '../Code'
import Example from '../Example'
import { Breadcrumb } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Breadcrumb</h1>
      </div>

      <div className="content">
        <Code>
{`<Breadcrumb
className={string}
data={array[
  href: string,
  onClick: function,
  text: string           // required
]}
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Breadcrumb data={[
            { href: '#', text: 'Home' },
            { onClick: () => console.log('click library'), text: 'Library' },
            { text: 'Data' },
            { active: true, text: 'Active' }
          ]} />
        </Example>
      </div>
    </div>
  )
}
