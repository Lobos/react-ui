import { Component } from 'react'
import Refetch from 'refetch'
import Code from '../Code'
import Example from '../Example'
import { Grid, Image } from 'rctui'

function getUrl (d, size = 'm') {
  return `https://farm${d.farm}.staticflickr.com/${d.server}/${d.id}_${d.secret}_${size}.jpg`
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
  style={object}
  shape={string}         // one of 'rounded|circle|thumbnail'
  type={string}          // one of 'fit|center|fill|stretch'
  width={string|number}  // style width, default is '100%'
  height={string|number} // if height is percentage, aspect ratio of width
  placeholder={element}  // show before image loaded
  src={string}           // image url
  alt={string}           // alternate image url
  title={string}         // image load error text
  href={string}          // large image url
  target={string}        // one of '_modal|_self|_blank', default value is '_modal'
  lazy={bool}            // default value is false
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
            <Image width={200} height={200} src="./images/image1.jpg" />
          </Example>

          <h2 className="subhead">Shape</h2>
          <Example>
            <Image shape="rounded" width={200} height={200} title="200 x 200" />
            <Image shape="circle" width={200} height={200} title="200 x 200" />
            <Image shape="thumbnail" width={200} height={200} title="200 x 200" />
          </Example>

          <h2 className="subhead">Ratio height</h2>
          <Example>
            <Grid width={1 / 3}>
              <Image shape="thumbnail" type="fit" width="100%" height="120%" src="./images/image1.jpg" />
            </Grid>
            <Grid width={1 / 3}>
              <Image shape="thumbnail" type="fit" width="100%" height="100%" src="./images/image2.jpg" />
            </Grid>
            <Grid width={1 / 3}>
              <Image shape="thumbnail" type="fit" width="100%" height="80%" src="./images/image3.jpg" />
            </Grid>
          </Example>

          <h2 className="subhead">Not found</h2>
          <Example>
            <Image src="not_exist" shape="thumbnail" type="fit" width={200} height={200} />
            <Image src="not_exist" title="Some text" shape="thumbnail" type="fit" width={200} height={200} />
          </Example>

          <h2 className="subhead">Alternate</h2>
          <Example>
            <Image src="not_exist" alt="./images/image1.jpg" shape="thumbnail" type="fit" width={200} height={200} />
          </Example>

          <h2 className="subhead">Target</h2>
          <Example>
            <Image href="./images/image1.jpg" target="_modal" shape="thumbnail" type="fit" width={200} height={200} src="./images/image1.jpg" />
            <Image href="./images/image2.jpg" target="_blank" shape="thumbnail" type="fit" width={200} height={200} src="./images/image2.jpg" />
            <Image href="./images/image3.jpg" target="_self" shape="thumbnail" type="fit" width={200} height={200} src="./images/image3.jpg" />
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
                <Grid key={d.id} width={1 / 3}>
                  <Image lazy shape="thumbnail" type="fit"
                    width="100%" height="100%" title={d.title}
                    style={{margin: '0 5px 5px 0'}}
                    href={getUrl(d, 'b')}
                    src={getUrl(d)} />
                </Grid>
              ))
            }
          </Example>
        </div>
      </div>
    )
  }
}
