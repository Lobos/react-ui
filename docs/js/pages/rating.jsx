var React = require('react')
var Example = require('../components/example.jsx')

var Rating = require('../libs').Rating

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Rating</h2>
        <p>评分</p>
        <br />

        <Example>
          <Rating style={{color:'gold'}} value={3} />
        </Example>

        <Example>
          <Rating style={{color:'red'}} icons={['heart-o', 'heart']} readOnly={true} value={7.5} max={15} />
        </Example>
      </div>
    )
  }
})
