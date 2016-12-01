import classnames from 'classnames'
import PropTypes from './utils/proptypes'

import _styles from './styles/_breadcrumb.scss'

export default function Breadcrumb (props) {
  const className = classnames(
    props.className,
    _styles.breadcrumb
  )

  return (
    <ol style={props.style} className={className}>
    {
      props.data.map((d, i) => {
        let content = d.text
        if (d.href) {
          content = <a href={d.href}>{d.text}</a>
        } else if (d.onClick) {
          content = <a href="javascript:;" onClick={d.onClick}>{d.text}</a>
        }

        let cls = classnames(
          _styles['breadcrumb-item'],
          d.active && _styles['active']
        )

        return <li key={i} className={cls}>{content}</li>
      })
    }
    </ol>
  )
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  style: PropTypes.object
}

Breadcrumb.defaultProps = {
  data: []
}
