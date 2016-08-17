import { Component } from 'react'
import Refetch from 'refetch'
import Code from '../Code'
import Example from '../Example'
import { Image } from '../rctui'

function getUrl (d) {
  return `https://farm${d.farm}.staticflickr.com/${d.server}/${d.id}_${d.secret}_m.jpg`
}

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentWillMount () {
    Refetch.get('./json/photos.json')
      .then(res => res.photos.photo)
      .then(photos => this.setState({ photos }))
  }

  render () {
    const { photos } = this.state

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
            {
              photos.map(d => (
                <Image key={d.id} lazy shape="thumbnail" type="fit"
                  width={200} height={200}
                  style={{margin: '0 5px 5px 0'}}
                  src={getUrl(d)} />
              ))
            }
          </Example>
        </div>
      </div>
    )
  }
}
