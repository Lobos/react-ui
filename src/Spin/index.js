import React from 'react'
import PropTypes from '../utils/proptypes'
import Plane from './Plane'
import DoubleBounce from './DoubleBounce'
import Wave from './Wave'
import Pulse from './Pulse'
import ChasingDots from './ChasingDots'
import ThreeBounce from './ThreeBounce'
import Circle from './Circle'
import CubeGrid from './CubeGrid'
import FadingCircle from './FadingCircle'
import FoldingCube from './FoldingCube'
import SimpleCircle from './SimpleCircle'
import ChaseCircle from './ChaseCircle'

const spins = {
  'plane': Plane,
  'double-bounce': DoubleBounce,
  'wave': Wave,
  'pulse': Pulse,
  'dots': ChasingDots,
  'three-bounce': ThreeBounce,
  'circle': Circle,
  'cube-grid': CubeGrid,
  'fading-circle': FadingCircle,
  'folding-cube': FoldingCube,
  'simple-circle': SimpleCircle,
  'chase-circle': ChaseCircle
}

export default function Spin (props) {
  const { type } = props
  const Component = spins[type]
  return <Component {...props} />
}

Spin.propTypes = {
  size: PropTypes.number_string,
  type: PropTypes.oneOf([
    'plane',
    'double-bounce',
    'wave',
    'pulse',
    'dots',
    'three-bounce',
    'circle',
    'cube-grid',
    'fading-circle',
    'folding-cube',
    'simple-circle',
    'chase-circle'
  ])
}

Spin.defaultProps = {
  color: '#ccc',
  size: 40
}
