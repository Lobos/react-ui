var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Icon = require('../libs').Icon

module.exports = React.createClass({

  render: function () {
    var AI = Arguments.Item
    return (
      <div className="content">
        <h2 className="page-header">Icon</h2>
        <p>图标，来自 <a target="_blank" href="http://fontawesome.io/">fontawesome</a>。</p>

        <Arguments>
          <Arguments.Example>{'<Icon icon="icon-classname" spin={bool} size="lg" />'}</Arguments.Example>
          <AI name="icon" require={true} type="string"> classname，不要加前缀，参见 <a target="_blank" href="http://fontawesome.io/icons/">fontawesome</a> 文档</AI>
          <AI name="size" type="string or int">可选值为 [lg|2x|3x|4x|5x]，或者只填写数字</AI>
          <AI name="spin" type="bool" def="false">是否旋转</AI>
        </Arguments>

        <h3>Motheds</h3>
        <Arguments>
          <Arguments.Example>{'spin()'}</Arguments.Example>
          <p>开始旋转</p>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'unspin()'}</Arguments.Example>
          <p>停止旋转</p>
        </Arguments>

        <Example title="Normal" text={'<Icon icon="home" />'}>
          <Icon icon="home" />
        </Example> 

        <Example title="Size" text={'<Icon icon="home" /><Icon icon="home" size="lg" /><Icon icon="home" size="2x" /><Icon icon="home" size="3" /><Icon icon="home" size={4} /><Icon icon="home" size={5} />'}>
          <Icon icon="home" /> normal<br />
          <Icon icon="home" size="lg" /> lg<br />
          <Icon icon="home" size="2x" /> 2x<br />
          <Icon icon="home" size="3" /> 3x<br />
          <Icon icon="home" size={4} /> 4x<br />
          <Icon icon="home" size={5} /> 5x
        </Example> 

        <Example title="Spin" text={'<Icon icon="spinner" size="2" spin={true} />'}>
          <Icon icon="spinner" size="2" spin={true} />
        </Example>
      </div>
    )
  }

})

