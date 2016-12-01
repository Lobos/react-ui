const compData = {
  dataList1: ['foo', 'bar', 'baz'],

  dataList2: [{
    type: 'info',
    content: 'foo',
    text: 'foo',
    value: 'foo'
  }, {
    type: 'info',
    content: 'bar',
    text: 'bar',
    value: 'bar'
  }, {
    type: 'error',
    content: 'baz',
    text: 'baz',
    value: 'baz'
  }]
}

const compClass = {
  select: '.select',
  options: '.options',
  placeholder: '.placeholder',
  hidden: '.hidden',
  filter: '.filter',
  result: '.result'
}

const compSelector = {
  filterContainer: 'div.filter',
  showItem: 'li',
  multSelectResultContainer: 'div.control'
}

export { compClass, compData, compSelector }
