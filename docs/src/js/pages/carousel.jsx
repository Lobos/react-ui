import Code from '../Code'
import Example from '../Example'
import Carousel from 'rctui/addons/Carousel'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Alert</h1>
      </div>

      <div className="content">
        <Code>{`
            `}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Carousel style={{width: 500, height: 300}} indicator={{position: 'right', type: 'number'}} duration={5000}>
            <div style={{background: '#666', display: 'flex'}}>
              <div style={{fontSize: 40, color: '#fff', display: 'flex', margin: 'auto'}}>
                Page 1
              </div>
            </div>

            <div style={{background: '#666', display: 'flex'}}>
              <div style={{fontSize: 40, color: '#fff', display: 'flex', margin: 'auto'}}>
                Page 2
              </div>
            </div>

            <a href="javascript:;">
              <img style={{width: '100%', height: '100%'}} src="./images/image1.jpg" />
            </a>
          </Carousel>
        </Example>
      </div>
    </div>
  )
}
