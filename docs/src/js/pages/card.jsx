import Code from '../Code'
import Example from '../Example'
import { Card, Nav } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Card/(Panel)</h1>
      </div>

      <div className="content">
        <Code>
{`<Card
  block={bool}        // default is false
  className={string}
  type={string}       // 'primary|success|info|warning|danger'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Card block grid={1 / 3}>
            <h4>Title</h4>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
        </Example>

        <h2 className="subhead">Header</h2>
        <Example>
          <Card grid={1 / 3}>
            <Card.Header>Header</Card.Header>
            <div style={{padding: 20}}>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Card>
        </Example>

        <h2 className="subhead">With Nav</h2>
        <Example>
          <Card grid={1 / 2}>
            <Card.Nav inline active="1" type="tab">
              <Card.NavItem id="1">Tab 1</Card.NavItem>
              <Card.NavItem id="2">Tab 2</Card.NavItem>
              <Card.NavItem id="3">Tab 3</Card.NavItem>
            </Card.Nav>
            <div style={{padding: 20}}>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Card>
          <Card grid={1 / 2}>
            <Card.Nav inline active="1" type="pill">
              <Card.NavItem id="1">Tab 1</Card.NavItem>
              <Card.NavItem id="2">Tab 2</Card.NavItem>
              <Card.NavItem id="3">Tab 3</Card.NavItem>
            </Card.Nav>
            <div style={{padding: 20}}>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </div>
          </Card>
        </Example>

        <h2 className="subhead">Type</h2>
        <Example>
          <Card block type="primary" grid={1 / 3}>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
          <Card block type="info" grid={1 / 3}>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
          <Card block type="warning" grid={1 / 3}>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
          <Card block type="danger" grid={1 / 3}>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
          <Card block type="success" grid={1 / 3}>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
          <Card block type="inverse" style={{backgroundColor: '#333'}} grid={1 / 3}>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
        </Example>

      </div>
    </div>
  )
}
