"use strict";

import React from 'react';
import prettify from '../prettify';
const {Icon} = global.uiRequire();

class Page extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Icon</h1>
          <h2>图标，使用</h2>
        </div>

        <div className="content">
          <p>
            支持 <a href="http://fontawesome.io/">font-awesome</a> 和 <a href="http://zavoloklom.github.io/material-design-iconic-font/">material-design-iconic-font</a><br />
            默认的前缀为 <em>icon</em>，如果使用less，生成这两个字体的css时，指定 <em>prefix</em> 为 <em>icon</em><br />
            如果使用这两个字体原生的前缀 <em>fa</em> 或者 <em>zmdi</em>，调用 <em>Icon.setPrefix(prefix)</em> 这个全局方法设置
          </p>

          <pre className="prettyprint">
{`<Icon
  icon="string"     // 图标名称，不带前缀部分
  spin={bool}       // 是否旋转。默认值为 false
  size={int|string} // 图标尺寸，可选值为 [lg|2x|3x|4x|5x]，或者为数字 1-5
  style={object}    // 样式，fontSize、color等等
/>`}
          </pre>

          <h2 className="subhead">Normal</h2>
          <Icon icon="home" /> home
          <pre className="prettyprint">{'<Icon icon="camera-retro" /> camera-retro'}</pre>

          <h2 className="subhead">Spin</h2>
          <Icon icon="settings" spin={true} />
          &nbsp; &nbsp;
          <Icon icon="refresh" spin={true} />
          <pre className="prettyprint">{'<Icon icon="spinner" spin={true} />\r<Icon icon="refresh" spin={true} />'}</pre>

          <h2 className="subhead">Size</h2>
          <Icon icon="home" /> normal<br />
          <Icon icon="home" size={'lg'} /> lg<br />
          <Icon icon="home" size={2} /> 2x<br />
          <Icon icon="home" size={3} /> 3x<br />
          <Icon icon="home" size={4} /> 4x<br />
          <Icon icon="home" size={5} /> 5x
          <pre className="prettyprint">
{`<Icon icon="camera-retro" />
<Icon icon="home" size="lg" />
<Icon icon="home" size="2x" />
<Icon icon="home" size="3" />
<Icon icon="home" size={4} />
<Icon icon="home" size={5} />`}
          </pre>

          <h2 className="subhead">Method</h2>
          <p>有两个实例方法控制旋转，<em>spin</em> 和 <em>unspin</em></p>
          <pre className="prettyprint">{'icon.spin()\ricon.unspin()'}</pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
