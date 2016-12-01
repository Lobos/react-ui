import curry from 'curry'
import { toArray, substitute } from '../utils/strings'
import { hashcode, deepEqual, objectAssign } from '../utils/objects'
import PropTypes from '../utils/proptypes'
import PureRender from '../mixins/PureRender'

export default curry(function (Component) {
  const Format = function (props) {
    let values = toArray(props.value, props.sep)

    let { data, filterAble, valueTpl, optionTpl, resultTpl, groupBy } = props
    let noResultTpl = !resultTpl

    if (!Array.isArray(data)) {
      data = Object.keys(data).map((key) => {
        return { text: data[key], id: key }
      })
    }

    data = data.map((d, i) => {
      if (typeof d !== 'object') {
        d = typeof d === 'string' ? d : d.toString()
        return {
          $html: d,
          $result: d,
          $value: d,
          $filter: d.toLowerCase(),
          $selected: values.indexOf(d) >= 0,
          $key: hashcode(d)
        }
      }

      d = objectAssign({}, d)
      let val = substitute(valueTpl, d)

      // speed filter
      if (filterAble) {
        d.$filter = (Object.keys(d).map((k) => d[k])).join(',').toLowerCase()
      }

      d.$html = substitute(optionTpl, d)
      d.$result = noResultTpl ? d.$html : substitute(resultTpl, d)
      d.$value = val
      if (typeof val === 'string') {
        d.$selected = values.indexOf(val) >= 0
      } else {
        d.$selected = !!values.find(v => val === v || deepEqual(v, val))
      }
      d.$key = d.id ? d.id : i
      return d
    })

    if (groupBy) {
      let groups = {}
      data.forEach((d) => {
        let key = d[groupBy]
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(d)
      })
      data = []
      Object.keys(groups).forEach((k) => {
        data.push({ $group: k })
        data = data.concat(groups[k])
      })
    }

    return <Component {...props} data={data} />
  }

  Format.propTypes = {
    data: PropTypes.array_object,
    filterAble: PropTypes.bool,
    groupBy: PropTypes.string,
    mult: PropTypes.bool,
    optionTpl: PropTypes.tpl,
    resultTpl: PropTypes.tpl,
    sep: PropTypes.string,
    value: PropTypes.any,
    valueTpl: PropTypes.tpl
  }

  Format.defaultProps = {
    optionTpl: '{text}',
    sep: ',',
    valueTpl: '{id}'
  }

  return PureRender(true)(Format)
})
