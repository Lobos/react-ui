import classnames from 'classnames'

const Example = (props) => {
  return (
    <div className={classnames('docs-example', props.className)}>
      {props.children}
    </div>
  )
}

module.exports = Example
