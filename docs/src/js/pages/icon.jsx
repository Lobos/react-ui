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
          <b>或者，在<a href="http://iconfont.cn/">iconfont.cn</a>生成自己的icon字库。个人比较推荐这种方式，可以定制化，文件大小比较容易控制。可选的图标也更多。</b>
        </p>

        <h2 className="subhead">使用iconfont</h2>
        <div>使用iconfont只需要在css加入字体路径，不需要其他额外配置，直接用就可以</div>
        <Code>
{`icon.less|scss // iconfont生成的代码，copy过来即可
  @font-face {
  font-family: 'iconfont';
  src: ...
}

// ================================
<Icon
  font="string"   // 默认值为'iconfont'
  spin={bool}     // 是否旋转。默认值为 false
  size={number}   // 大小，单位为rem。不设定size，将会使用父元素的size。
                     设定size后，元素的宽高也会被设定。
  style={object}  // 样式，fontSize、color等等
>
  {fontcode}      // string
</Icon>`}
        </Code>

        <h2 className="subhead">iconfont</h2>
        <Example>
<Icon>&#xe601;</Icon> 
<Icon style={{color: 'red'}}>&#xe602;</Icon> 
<span style={{color: 'green', fontSize: '2rem', verticalAlign: 'middle'}}>
  <Icon>&#xe603;</Icon>
</span>

<br />

<Icon size={0.7}>&#xe601;</Icon> 
<Icon size={1}>&#xe601;</Icon> 
<Icon size={1.2}>&#xe601;</Icon> 
<Icon size={1.5}>&#xe601;</Icon> 
<Icon size={2.0}>&#xe601;</Icon> 
<Icon size={2.5}>&#xe601;</Icon> 
        </Example>

        <h2 className="subhead">使用font-awesome 或 material</h2>
        <div>
          默认的前缀为 <em>icon</em>，如果使用less，生成这两个字体的css时，指定 <em>prefix</em> 为 <em>icon</em><br />
          如果使用这两个字体原生的前缀 <em>fa</em> 或者 <em>zmdi</em>，调用 <em>Icon.setPrefix(prefix)</em> 这个全局方法设置<br />
        </div>
        <Code>
{`icon.less|scss
@import "path/material-design-iconic-font.less|font-awesome.less"; // 样式文件路径
@zmdi-css-prefix: icon;
@zmdi-icon-prefix: icon;
@zmdi-font-path: "path/fonts";  // 字体文件路径

// ===============================
<Icon
icon="string"     // 图标名称，不带前缀部分
spin={bool}       // 是否旋转。默认值为 false
size={int|string} // 图标尺寸，可选值为 [lg|2x|3x|4x|5x]，或者为数字 1-5
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
&nbsp; &nbsp;
<Icon spin>&#xe605;</Icon> 
        </Example>
      </div>
    </div>
  );
}
