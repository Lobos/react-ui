import Code from '../Code'
import Example from '../Example'
import { Image } from '../rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Image</h1>
      </div>

      <div className="content">
        <Code>
{`<Image
className={string}
style={object}
onClose={func}      // close callback, if onClose undefined, will not show close button
type={string}       // 'info|warning|success|danger|error', default is 'info'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Image width={200} height={200} src="//farm6.staticflickr.com/5045/5225561118_185b228767.jpg" />
        </Example>

        <h2 className="subhead">Lazy</h2>
        <Example>
          <Image width={200} height={200} lazy src="//farm6.staticflickr.com/5045/5225561118_185b228767.jpg" />
        </Example>
      </div>
    </div>
  )
}
