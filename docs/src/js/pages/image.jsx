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
  shape={string}      // one of 'rounded|circle|thumbnail'
  type={string}       //  one of'fit|center|fill|stretch'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Image width={200} height={200} src="./images/image1.jpg" />
        </Example>

        <h2 className="subhead">Shape</h2>
        <Example>
          <Image shape="rounded" width={200} height={200} placeholder={<div style={{background: '#ccc', height: '100%', textAlign: 'center', lineHeight: '200px'}}>200 x 200</div>} />
          <Image shape="circle" width={200} height={200} placeholder={<div style={{background: '#ccc', height: '100%', textAlign: 'center', lineHeight: '200px'}}>200 x 200</div>} />
          <Image shape="thumbnail" width={200} height={200} placeholder={<div style={{background: '#ccc', height: '100%', textAlign: 'center', lineHeight: '200px'}}>200 x 200</div>} />
        </Example>

        <h2 className="subhead">Type Fit</h2>
        <Example>
          <Image shape="thumbnail" type="fit" width={200} height={200} src="./images/image1.jpg" />
          <Image shape="thumbnail" type="fit" width={200} height={200} src="./images/image2.jpg" />
          <Image shape="thumbnail" type="fit" width={200} height={200} src="./images/image3.jpg" />
        </Example>

        <h2 className="subhead">Type Center</h2>
        <Example>
          <Image shape="thumbnail" type="center" width={200} height={200} src="./images/image1.jpg" />
          <Image shape="thumbnail" type="center" width={200} height={200} src="./images/image2.jpg" />
          <Image shape="thumbnail" type="center" width={200} height={200} src="./images/image3.jpg" />
        </Example>

        <h2 className="subhead">Type Stretch</h2>
        <Example>
          <Image shape="thumbnail" type="stretch" width={200} height={200} src="./images/image1.jpg" />
          <Image shape="thumbnail" type="stretch" width={200} height={200} src="./images/image2.jpg" />
          <Image shape="thumbnail" type="stretch" width={200} height={200} src="./images/image3.jpg" />
        </Example>

        <h2 className="subhead">Type Fill</h2>
        <Example>
          <Image shape="thumbnail" type="fill" width={200} height={200} src="./images/image1.jpg" />
          <Image shape="thumbnail" type="fill" width={200} height={200} src="./images/image2.jpg" />
          <Image shape="thumbnail" type="fill" width={200} height={200} src="./images/image3.jpg" />
        </Example>

        <h2 className="subhead">Lazy</h2>
        <Example>
          <Image width={200} height={200} lazy src="./images/image1.jpg" />
        </Example>
      </div>
    </div>
  )
}
