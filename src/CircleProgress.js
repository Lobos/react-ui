import React from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import _styles from './styles/_circle-progress.scss'

function CircleProgress ({ children, className, size, style, width, background, color, value, max }) {
  const props = {
    cx: 50,
    cy: 50,
    r: 50 - width / 2,
    strokeWidth: width,
    fill: 'none'
  }

  const cf = (50 - width / 2) * 2 * 3.14

  const per = (value / max) * cf

  return (
    <div className={classnames(className, _styles.progress)} style={style}>
      <svg viewBox="0,0,100,100" transform="rotate(-90)" width={size} height={size}>
        <circle {...props} stroke={background} />
        <circle {...props} stroke={color} strokeDasharray={`${per}, ${cf}`} />
      </svg>
      <div className={_styles.inner} style={{ left: size / 2, top: size / 2 }}>
        {children}
      </div>
    </div>
  )
}

CircleProgress.propTypes = {
  animated: PropTypes.bool,
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  max: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.number,
  width: PropTypes.number
}

CircleProgress.defaultProps = {
  background: '#f2f2f2',
  color: '#0275d8',
  max: 100,
  value: 0,
  width: 10
}

export default CircleProgress
