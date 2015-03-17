var React = require('react')

var Home = React.createClass({

  render: function () {
    return(
      <div className="content">
        <h2 className="page-header">关于React UI</h2>
        <p>一个基于 React 的 Component 集合，UI部分基于bootstrap，Icon部分使用了font-awesome。</p>
      </div>
    )
  }

})

module.exports = Home
