import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Form, FormControl, FormBlock } from 'rctui'
import { Cn, En } from '../Language'

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        base: {
          email: 'test@123.com',
          nickname: 'test'
        }
      }
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>FormBlock</h1>
          <Cn tag="h2">表单区块</Cn>
        </div>

        <div className="content pure-form">
          <Cn>
            表单区块用来处理复杂表单数据中嵌套的部分
          </Cn>

          <h2 className="subhead">Example</h2>

          <Example>
            <Form onSubmit={d => console.log(d)} button="Submit" data={this.state.data}>
              <FormBlock name="base">
                <FormControl required label="email" name="email" type="email" />
                <FormControl required label="nickname" name="nickname" type="text" />
              </FormBlock>
              <FormBlock layout="inline" name="extra" value={{
                avatar: '',
                birthday: '1980-01-01',
                city: 'nanjing'
              }}>
                <FormControl label="avatar" name="avatar" type="text" />
                <FormControl required label="birthday" name="birthday" type="date" />
                <FormControl label="city" name="city" type="text" />
              </FormBlock>
            </Form>
          </Example>
>
        </div>
      </div>
    )
  }
}
