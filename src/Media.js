import classnames from 'classnames'

import _styles from './styles/_media.scss'

function MediaLeft (props) {
  let classNames = classnames(_styles['media-left'], _styles[`media-${props.align}`])
  return (
    <div style={props.style} className={classNames}>
    {props.children}
    </div>
  )
}

function MediaRight (props) {
  let classNames = classnames(_styles['media-right'], _styles[`media-${props.align}`])
  return (
    <div style={props.style} className={classNames}>
    {props.children}
    </div>
  )
}

function MediaBody (props) {
  let classNames = classnames(_styles['media-body'], _styles[`media-${props.align}`])
  return (
    <div style={props.style} className={classNames}>
    {props.children}
    </div>
  )
}

function MediaHead (props) {
  return (
    <div style={props.style} className={_styles['media-heading']}>
    {props.children}
    </div>
  )
}

export default function Media (props) {
  return (
    <div style={props.style} className={_styles.media}>
    {props.children}
    </div>
  )
}

Media.Left = MediaLeft
Media.Body = MediaBody
Media.Head = MediaHead
Media.Right = MediaRight

