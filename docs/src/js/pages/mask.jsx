import Code from '../Code'
import Example from '../Example'
import { Mask, Grid, Spin } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Mask</h1>
      </div>

      <div className="content">
        <Code>
{`<Mask
  className={string}
  active={bool}        // default value is false
  background={string}  // background style
  style={object}
>
  <Spin />
</Mask>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Grid width={1 / 2} style={{height: 200}}>
            <Mask active />
          </Grid>
        </Example>

        <h2 className="subhead">Custom Content</h2>
        <Example>
          <Grid width={1 / 2} style={{height: 200}}>
            <Mask active background="#ccc">
              <div style={{textAlign: 'center'}}>
                <Spin size={30} color="green" type="wave" />
                loading...
              </div>
            </Mask>
          </Grid>
        </Example>

      </div>
    </div>
  )
}
