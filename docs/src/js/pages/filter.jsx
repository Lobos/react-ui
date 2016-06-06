'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
const { Filter, Input, Select, DatepickerRange } = global.uiRequire()

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: ''
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Filter</h1>
          <h2>筛选器</h2>
        </div>

        <div className="content">
          <Code>
{`<Filter
  className={string}
  style={object}
  onFilter={func(data)}         // 当确认时触发事件
  items={[{
    label: 'string',
    grid: {object},
    componenent: {ReactElement} //
  }]}
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<Filter
  columns={3}
  labelWidth="5rem"
  onFilter={fs => this.setState({ filterText: JSON.stringify(fs) })}
  items={[
    {
      label: 'name:',
      component: <Input name="name" />
    }, {
      label: 'birthday:',
      grid: 2 / 3,
      component: <DatepickerRange names={['startDate', 'endDate']} type="date" />
    }, {
      label: 'email:',
      component: <Input name="email" type="email" />
    }, {
      label: 'nationality:',
      component: <Select name="nationality" data={['Chinese', 'English', 'American', 'Spanish']} />
    }
  ]} />
<div>{this.state.filterText}</div>
          </Example>
        </div>
      </div>
    )
  }
}
