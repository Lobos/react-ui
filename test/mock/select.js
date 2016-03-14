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
};

const compClass = {
  select: '.rct-select',
  options: '.rct-select-options',
  placeholder: '.placeholder',
  show:'.show',
  filter:'.filter'
};

const compSelector = {
  filterDiv:'div.filter',
  itemShowLi: 'li.show',
  selectResultDiv: 'div.rct-select-result'
};

export {compClass, compData, compSelector}
