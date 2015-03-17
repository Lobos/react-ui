var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Icon = require('../libs').Icon

module.exports = React.createClass({

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Icon</h2>
        <p>图标，来自 <a target="_blank" href="http://fontawesome.io/">fontawesome</a>。</p>

        <Arguments>
          <Arguments.Item name="icon" type="string" text="必填， class，去除前缀，参见 fontawesome 文档。" />
          <Arguments.Item name="size" type="string or int" text="可选值为 'lg 2x 3x 4x 5x'，或者只填写数字" />
          <Arguments.Item name="spin" type="bool" def="false" text="可选值为 'lg 2x 3x 4x 5x'，或者只填写数字" />
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

