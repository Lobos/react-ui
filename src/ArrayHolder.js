import { objectAssign } from './utils/objects'

export default class ArrayHolder {
  constructor (values, options) {
    this.values = values || []
    this.options = objectAssign({}, options)
  }

  init (values) {
    this.values = values
  }

  add (items) {
    if (!Array.isArray(items)) items = [items]

    let temp = []
    items.forEach((d) => {
      if (this.values.indexOf(d) < 0) {
        temp.push(d)
      }
    })

    this.values = this.values.concat(temp)
  }

  remove (items) {
    if (!Array.isArray(items)) items = [items]

    this.values = this.values.filter((d) => {
      return items.indexOf(d) < 0
    })
  }

  clear () {
    this.values = []
  }

  getValue (sep) {
    return sep ? this.values.join(sep) : [...this.values]
  }
}

