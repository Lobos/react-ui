import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { Grid, Select, Input } from 'rctui'
import { Cn, En } from '../Language'

const borderGridStyle = { border: 'solid 1px #ccc', lineHeight: '30px', textAlign: 'center'}

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: '12'
    }
  }

  gridChange (i) {
    this.setState({ grid: i })
  }

  renderSingle () {
    let grid = this.state.grid
    let gs = []
    for (var i = 1; i <= grid; i++) {
      gs.push(
        <Grid style={borderGridStyle} key={i} width={ 1 / grid }>{i}</Grid>
      )
    }
    return gs
  }

  renderGroup () {
    let grid = this.state.grid
    let gs = []
    for (var i = 1; i <= grid; i++) {
      gs.push(
        <div key={i} style={{background: '#fafafa', marginTop: 10}}>
          <Grid style={{ background: '#eee', lineHeight: '30px' }} width={ i / grid }>
            {i} / {grid}
          </Grid>
        </div>
      )
    }
    return gs
  }

  render () {
    let options = []
    for (let i = 2; i <= 48; i++) {
      options.push(i.toString())
    }

    return (
      <div>
        <div className="header">
          <h1>Grid</h1>
          <Cn tag="h2">栅格</Cn>
        </div>

        <div className="content">
          <Cn>可以实现任意等分的栅格，支持responsive。</Cn>
          <En>Any decile grid, support responsive.</En>

          <Cn>
            <Code>
{`<Grid
  width={n/m}         // 小于1的小数，值为列数/总列数，例如：1/2, 2/5，默认值为1
  offset={n/m}        // 可选，小于1的小数，值为列数/总列数，例如：1/2, 2/5，默认为0
  responsive={string} // 可选值为'sm|md|lg|xl'，对应的值为'568px|768px|992px|1200px'，默认值为'md'
  style={object}
  className={string}
/>`}
            </Code>
          </Cn>
          <En>
            <Code>
{`<Grid
  width={n/m}         // fraction, less than 1, example: 1/2, 2/5, default value is 1
  offset={n/m}        // optional, fraction less than 1, example: 1/2, 2/5, default is 0
  responsive={string} // option: 'sm(568px)|md(768px}|lg(992px)|xl(1200px)', default is 'md'
  style={object}
  className={string}
/>`}
            </Code>
          </En>

          <Cn>
            ReactUI 的所有表单组件内部都实现了Grid的封装，可以使用grid这个props进行调用。
          </Cn>
          <En>
            All ReactUI FormItem extends Grid, you can just use grid props.
          </En>
          <Example>
            <Input type="text" grid={{ width: 1 / 2, offset: 1 / 4, responsive: 'md' }} />
          </Example>

          <Cn>如果只定义宽度，可以再简化为</Cn>
          <En>If only use width, can simplify use like this.</En>
          <Example>
            <Input type="text" grid={1 / 2} />
          </Example>

          <h2 className="subhead">Example</h2>
          <Select data={options} value={this.state.grid} onChange={this.gridChange.bind(this)} />

          <div style={{ marginTop: 10 }}>
            { this.renderSingle() }
          </div>

          <div>
            { this.renderGroup() }
          </div>

          <h2 className="subhead">Offset</h2>
          <Example>
            <Grid width={1 / 4} offset={1 / 4} style={borderGridStyle}>offset 1/4</Grid>
            <Grid width={1 / 4} offset={1 / 4} style={borderGridStyle}>offset 1/4</Grid>
            <Grid width={1 / 3} offset={0} style={borderGridStyle}>offset 0</Grid>
            <Grid width={1 / 2} offset={1 / 6} style={borderGridStyle}>offset 1/6</Grid>
          </Example>

          <Cn><h2 className="subhead">嵌套</h2></Cn>
          <En><h2 className="subhead">Nested</h2></En>
          <Example>
            <Grid style={{background: '#eee'}} width={ 1 / 2 }>
              <div style={{ textAlign: 'center', lineHeight: '30px' }}>1/2</div>
              <Grid style={borderGridStyle} width={ 1 / 3 }>1/3</Grid>
              <Grid style={borderGridStyle} width={ 2 / 3 }>2/3</Grid>
            </Grid>
            <Grid style={{background: '#fafafa'}} width={ 1 / 2 }>
              <div style={{ textAlign: 'center', lineHeight: '30px' }}>1/2</div>
              <Grid style={borderGridStyle} width={ 1 / 5 }>1/5</Grid>
              <Grid style={borderGridStyle} width={ 2 / 5 }>2/5</Grid>
              <Grid style={borderGridStyle} width={ 2 / 5 }>2/5</Grid>
            </Grid>
          </Example>

          <h2 className="subhead">Auto Width</h2>
          <Cn>如果Grid嵌套在另一个Grid内，并且没有设定width，未设定width的Grid将会平分剩余的width</Cn>
          <Example>
            <Grid width={ 1 }>
              <Grid style={borderGridStyle} width={ 1 / 4 }>1/4</Grid>
              <Grid style={borderGridStyle}>auto</Grid>
              <Grid style={borderGridStyle}>auto</Grid>
              <Grid style={borderGridStyle}>auto</Grid>
              <Grid style={borderGridStyle}>auto</Grid>
              <Grid style={borderGridStyle}>auto</Grid>
              <Grid style={borderGridStyle}>auto</Grid>
            </Grid>
          </Example>
        </div>
      </div>
    )
  }
}
