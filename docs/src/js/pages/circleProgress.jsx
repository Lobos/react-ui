import React, { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { CircleProgress, Integer } from 'rctui'

module.exports = class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      e1: 30,
      e2: 100
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>CircleProgress</h1>
        </div>

        <div className="content">
          <Code>
  {`<CircleProgress
    className={string}
    style={object}
    size={number}        // required
    value={number}       // default value is 0
    max={number}         // default value is 100
    />`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
            <CircleProgress size={100} value={this.state.e1} max={this.state.e2}>
              <span style={{ fontSize: 18 }}>{((this.state.e1 / this.state.e2) * 100).toFixed(2)}%</span>
            </CircleProgress>
            <div>
              value: <Integer min={0} max={100} style={{width: 60}} value={this.state.e1} onChange={(value) => this.setState({ e1: value })} />
              {' '}max: <Integer min={0} max={1000} style={{width: 60}} value={this.state.e2} onChange={(value) => this.setState({ e2: value })} />
            </div>
          </Example>
        </div>
      </div>
    )
  }
}
