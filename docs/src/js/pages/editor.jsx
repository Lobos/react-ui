import { Component } from 'react'
import Editor from 'rctui/addons/Editor'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Editor</h1>
        </div>

        <div className="content">
          <Editor placeholder="some text"
            onChange={(value) => this.setState({ value })} style={{height: 300}} />
        </div>

        <div className="content">
          Result:
          <div style={{border: 'solid 1px #ccc', padding: 20}}>
            {this.state.value}
          </div>
        </div>
      </div>
    )
  }
}

export default Page
