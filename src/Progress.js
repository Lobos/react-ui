import React from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'

import _styles from './styles/_progress.scss'

const isIE9 = /MSIE 9/i.test(navigator.userAgent)

export default function Progress (props) {
  const className = classnames(
    _styles.progress,
    props.className,
    props.animated && _styles['progress-animated'],
    props.striped && _styles['progress-striped'],
    props.type && _styles[`progress-${props.type}`]
  )

  let { value, max } = props
  if (value > max) value = max
  else if (value < 0) value = 0

  let width = ((value / max) * 100).toFixed(2) + '%'

  return (
    <div style={{position: 'relative'}}>
      <progress className={className} value={value} max={max}>
      {
        isIE9 &&
        <div className={className}>
          <span className={_styles['progress-bar']} style={{width}} />
        </div>
      }
      </progress>
      <span className={_styles['progress-tip']} style={{left: width}}>{`${value} / ${max}`}</span>
    </div>
  )
}

Progress.propTypes = {
  animated: PropTypes.bool,
  className: PropTypes.string,
  max: PropTypes.number,
  striped: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.number
}

Progress.defaultProps = {
  max: 100,
  value: 0
}
