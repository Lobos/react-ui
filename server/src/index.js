'use strict'

import React from 'react'
import Qwest from 'qwest'

let Page = React.createClass({
  displayName: 'Page',

  getInitialState: function () {
    return {
      components: {},
      building: false
    }
  },

  componentWillMount: function () {
    Qwest.get('./components')
      .then(res => {
        this.setState({ components: res })
      })
  },

  handleChange: function (key) {
    let components = this.state.components
    let target = components[key]
    if (!target.$checked) {
      target.$checked = true
      let keys = target.dependencies || []
      keys.forEach(k => {
        components[k].$checked = true
      })
    } else {
      target.$checked = false
      let keys = Object.keys(components)
      for (let i = 0, count = keys.length; i < count; i++) {
        let c = components[keys[i]]
        if (c.$checked && c.dependencies && c.dependencies.indexOf(key) >= 0) {
          target.$checked = true
          break
        }
      }
    }
    this.setState({ components })
  },

  submit: function () {
    this.setState({ building: true })
  },

  render: function () {
    let components = this.state.components
    let list = Object.keys(components).map((key, i) => {
      let component = components[key]
      return (
        <div key={i}>
          <label>
            <input name="components"
                readOnly={this.state.building}
                onChange={this.handleChange.bind(this, key)}
                checked={component.$checked}
                value={key}
                type="checkbox" />
            <span>{key}</span>
          </label>
        </div>
      )
    })
    return (
      <div>
        <form onSubmit={this.submit} method="POST" action="/build">
          {list}
          <hr />

          <div>
            <label>
              <input readOnly={this.state.building} name="css" value={true} type="checkbox" />
              <span>独立css文件</span>
            </label>
          </div>

          <div>
            <label>
              <input readOnly={this.state.building} name="minimize" value={true} type="checkbox" />
              <span>Uglify 压缩</span>
            </label>
          </div>

          <hr />
          <button disabled={this.state.building} type="submit">Build</button>
        </form>
      </div>
    )
  }
})

React.render(
  <Page />,
  document.body
)
