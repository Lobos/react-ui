describe('utils objects', function () {
  var Objects = ReactUI.Utils.Objects

  it('isEmpty', function () {
    var isEmpty = Objects.isEmpty
    isEmpty(null).should.be.true
    isEmpty(undefined).should.be.true
    isEmpty(NaN).should.be.true
    isEmpty('').should.be.true
    isEmpty([]).should.be.true
    isEmpty({}).should.be.true
    isEmpty(0).should.be.false
    isEmpty(' ').should.be.false
    isEmpty([1]).should.be.false
    isEmpty({a:1}).should.be.false
    isEmpty(new Date()).should.be.false
  })

  it('forEach', function () {
    var obj = {a: 1, b: 2, c: 3},
        keys = [],
        value = 0
    Objects.forEach(obj, function (v, k) {
      keys.push(k)
      value += v
    })

    keys.length.should.equal(3)
    expect(keys).to.deep.equal(['a','b','c'])
    value.should.equal(6)
  })

  it('toTextValue', function () {
    var arr = [1, 2, 3, 4]
    var arrObj = arr.map(function (i) {
      return { text: i, value: i }
    })
    var tv = Objects.toTextValue(arr)
    expect(tv).to.deep.equal(arrObj)

    var rawObj = [
      { cn: '南京', key: 'nanjing' },
      { cn: '北京', key: 'beijing' },
      { cn: '上海', key: 'shanghai' }
    ]
    var targetObj = [
      { text: '南京', value: 'nanjing' },
      { text: '北京', value: 'beijing' },
      { text: '上海', value: 'shanghai' }
    ]
    rawObj = Objects.toTextValue(rawObj, 'cn', 'key')
    expect(rawObj).to.deep.equal(targetObj)

    rawObj = Objects.toTextValue(targetObj)
    expect(rawObj).to.deep.equal(targetObj)
  })
})
