"use strict";

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Icon} = global.uiRequire();

module.exports = () => {
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
          如果使用这两个字体原生的前缀 <em>fa</em> 或者 <em>zmdi</em>，调用 <em>Icon.setPrefix(prefix)</em> 这个全局方法设置<br />
          <b>或者，去<a href="http://iconfont.cn/">iconfont.cn</a>生成自己的icon字库。个人比较推荐这种方式，可以按需选择图标，文件大小比较容易控制。可选的图标也非常丰富。</b>
        </p>

        <h2 className="subhead">使用iconfont</h2>
        <Code>
{`<Icon
  font="string"   // 默认值为'iconfont'
  style={object}  // 样式，fontSize、color等等
>
  {fontcode}      // string
</Icon>`}
        </Code>

        <h2 className="subhead">Normal</h2>
        <Example>
<Icon>&#xe601;</Icon> 
<Icon style={{color: 'red'}}>&#xe602;</Icon> 
<span style={{color: 'green', fontSize: '1.5rem', verticalAlign: 'middle'}}><Icon>&#xe603;</Icon></span>
<Icon style={{fontSize: '2rem'}}>&#xe604;</Icon> 
        </Example>

        <h2 className="subhead">使用font-awesome 或 material</h2>
        <Code>
{`<Icon
icon="string"     // 图标名称，不带前缀部分
spin={bool}       // 是否旋转。默认值为 false
size={int|string} // 图标尺寸，可选值为 [lg|2x|3x|4x|5x]，或者为数字 1-5
font={string}     // 指定font-family
style={object}    // 样式，fontSize、color等等
/>`}
        </Code>

        <h2 className="subhead">Normal</h2>
        <Example>
<Icon icon="home" /> home
        </Example>

        <h2 className="subhead">Spin</h2>
        <Example>
<Icon icon="settings" spin />
&nbsp; &nbsp;
<Icon icon="refresh" spin />
        </Example>

        <h2 className="subhead">Size</h2>
        <Example>
<Icon icon="home" /> normal<br />
<Icon icon="home" size={'lg'} /> lg<br />
<Icon icon="home" size={2} /> 2x<br />
<Icon icon="home" size={3} /> 3x<br />
<Icon icon="home" size={4} /> 4x<br />
<Icon icon="home" size={5} /> 5x
        </Example>
      </div>
    </div>
  );
}
