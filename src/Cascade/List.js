import { PropTypes } from 'react'
import SafeHtml from '../SafeHtml'

export default function List (props) {
  const { data, onChange } = props
  return (
    <ul>
    {
      data.map(d => (
        <li key={d.$key}
          onClick={onChange.bind(this, d)}>
          <SafeHtml>{d.$html}</SafeHtml>
        </li>
      ))
    }
    </ul>
  )
}

List.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func
}

List.defaultProps = {
  data: []
}
