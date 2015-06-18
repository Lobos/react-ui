"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
let Icon = require('../../../../src/js/components/icon.jsx')

module.exports = React.createClass({
  displayName: 'Pages/Icon',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Icon</h1>
          <h2>图标，使用<a href="http://fontawesome.io/">font-awesome</a></h2>
        </div>

        <div className="content">
          <pre className="prettyprint">{'<Icon icon="string" spin={bool} size={int|string} />'}</pre>
          <p><b>icon:</b>图标名称，详见<a href="http://fontawesome.io/icons/">fontawesome</a></p>
          <p><b>spin:</b>是否旋转。默认值为 <em>false</em></p>
          <p><b>size:</b>图标尺寸，可选值为 <em>[lg|2x|3x|4x|5x]</em>，或者为数字 <em>1-5</em></p>

          <h2 className="subhead">Normal</h2>
          <Icon icon="home" /> home
          <pre className="prettyprint">{'<Icon icon="camera-retro" /> camera-retro'}</pre>

          <h2 className="subhead">Spin</h2>
          <Icon icon="spinner" spin={true} />
          &nbsp; &nbsp;
          <Icon icon="refresh" spin={true} />
          <pre className="prettyprint">{'<Icon icon="spinner" spin={true} />\r<Icon icon="refresh" spin={true} />'}</pre>

          <h2 className="subhead">Size</h2>
          <Icon icon="camera-retro" /> normal<br />
          <Icon icon="camera-retro" size={'lg'} /> lg<br />
          <Icon icon="camera-retro" size={2} /> 2x<br />
          <Icon icon="camera-retro" size={3} /> 3x<br />
          <Icon icon="camera-retro" size={4} /> 4x<br />
          <Icon icon="camera-retro" size={5} /> 5x
          <pre className="prettyprint">
{`<Icon icon="camera-retro" />
<Icon icon="camera-retro" size="lg" />
<Icon icon="camera-retro" size="2x" />
<Icon icon="camera-retro" size="3" />
<Icon icon="camera-retro" size={4} />
<Icon icon="camera-retro" size={5} />`}
          </pre>

          <h2 className="subhead">Method</h2>
          <p>有两个实例方法控制旋转，<em>spin</em> 和 <em>unspin</em></p>
          <pre className="prettyprint">{'icon.spin()\ricon.unspin()'}</pre>
        </div>
      </div>
    )
  }
})
