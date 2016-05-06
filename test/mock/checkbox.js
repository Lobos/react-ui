const compData = {
  dataList1: ['foo', 'bar', 'baz'],
  dataList2: [
    {id: '1', text: 'foo'},
    {id: '2', text: 'bar'},
    {id: '3', text: 'baz'}
  ],
  dataList3: {
    1: 'foo',
    2: 'bar',
    3: 'baz'
  }
}

const compClass = {
  checkboxContainer: 'checkbox',
  checkboxGroupContainer: 'checkbox-group',
  checkboxInlineStyle: 'inline',
  checkboxBlockStyle: 'block'
}

const compSelector = {
  checkboxItem: 'label',
  checkboxGroupContainer: 'div.checkbox-group'
}

export { compClass, compData, compSelector }
