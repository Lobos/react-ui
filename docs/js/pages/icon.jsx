var React = require('react')
var Example = require('../components/example.jsx')
var Icon = require('../libs').Icon

module.exports = React.createClass({

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Icon</h2>
        <p>图标，来自 <a target="_blank" href="http://fontawesome.io/">font-awesome</a>。</p>
        <br />

        <Example title="Normal" text={'<Icon icon="home" />'}>
          <Icon icon="home" />
        </Example> 

        <Example title="Size" text={'<Icon icon="home" /><Icon icon="home" size="lg" /><Icon icon="home" size={2} /><Icon icon="home" size={3} /><Icon icon="home" size={4} /><Icon icon="home" size={5} />'}>
          <Icon icon="home" /> normal<br />
          <Icon icon="home" size="lg" /> lg<br />
          <Icon icon="home" size={2} /> 2x<br />
          <Icon icon="home" size={3} /> 3x<br />
          <Icon icon="home" size={4} /> 4x<br />
          <Icon icon="home" size={5} /> 5x
        </Example> 

        <Example title="Spin" text={'<Icon icon="spinner" spin={true} />'}>
          <Icon icon="spinner" spin={true} />
        </Example>
      </div>
    )
  }

})

