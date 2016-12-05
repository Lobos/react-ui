import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Spin } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Spin</h1>
      </div>

      <div className="content">
        <div>
          <a href="https://github.com/tobiasahlin/SpinKit" target="_blank">
            base on SpinKit
          </a>
        </div>
        <Code>
{`<Spin
className={string}
color={string}       // default value is '#ccc'
type={string}        // see example
size={string|number} // width && height
maring={string}      // css margin
/>`}
        </Code>

        <h2 className="subhead">Plane</h2>
        <Example>
          <Spin size="40px" type="plane" />
          <Spin size="2rem" type="plane" color="red" />
        </Example>

        <h2 className="subhead">Double Bounce</h2>
        <Example>
          <Spin size="60px" type="double-bounce" />
          <Spin size="5rem" type="double-bounce" color="red" />
        </Example>

        <h2 className="subhead">Wave</h2>
        <Example>
          <Spin size="30px" type="wave" />
          <Spin size={40} type="wave" color="green" />
          <Spin size="5rem" type="wave" color="red" />
        </Example>

        <h2 className="subhead">Pulse</h2>
        <Example>
          <Spin size="30px" type="pulse" />
          <Spin size={40} type="pulse" color="green" />
          <Spin size="5rem" type="pulse" color="red" />
        </Example>

        <h2 className="subhead">Chasing Dots</h2>
        <Example>
          <Spin size="30px" type="dots" />
          <Spin size={40} type="dots" color="green" />
          <Spin size="5rem" type="dots" color="red" />
        </Example>

        <h2 className="subhead">Three Bounce</h2>
        <Example>
          <Spin size="30px" type="three-bounce" />
          <Spin size={40} type="three-bounce" color="green" />
          <Spin size="5rem" type="three-bounce" color="red" />
        </Example>

        <h2 className="subhead">Circle</h2>
        <Example>
          <Spin size="30px" type="circle" />
          <Spin size={40} type="circle" color="green" />
          <Spin size="5rem" type="circle" color="red" />
        </Example>

        <h2 className="subhead">Simple Circle</h2>
        <Example>
          <Spin size="28px" type="simple-circle" />
          <Spin size={40} type="simple-circle" color="green" />
          <Spin size="5rem" type="simple-circle" color="red" />
        </Example>

        <h2 className="subhead">Cube Grid</h2>
        <Example>
          <Spin size="30px" type="cube-grid" />
          <Spin size={40} type="cube-grid" color="green" />
          <Spin size="5rem" type="cube-grid" color="red" />
        </Example>

        <h2 className="subhead">Fading Circle</h2>
        <Example>
          <Spin size="1rem" type="fading-circle" />
          <Spin size="30px" type="fading-circle" />
          <Spin size={40} type="fading-circle" color="green" />
          <Spin size="5rem" type="fading-circle" color="red" />
        </Example>

        <h2 className="subhead">Folding Cube</h2>
        <Example>
          <Spin margin={10} size="30px" type="folding-cube" />
          <Spin margin={20} size={40} type="folding-cube" color="green" />
          <Spin margin="3rem" size="4rem" type="folding-cube" color="red" />
        </Example>

        <h2 className="subhead">Chase Circle</h2>
        <Example>
          <Spin size="1rem" type="chase-circle" />
          <Spin size="30px" type="chase-circle" />
          <Spin size={40} type="chase-circle" color="green" />
          <Spin size="5rem" type="chase-circle" color="red" />
        </Example>
      </div>
    </div>
  )
}
