describe('utils objects', function () {
  var Objects = require('../../src/utils/objects');

  it('isEmpty', function () {
    var isEmpty = Objects.isEmpty;
    isEmpty(null).should.be.true;
    isEmpty(undefined).should.be.true;
    isEmpty(NaN).should.be.true;
    isEmpty('').should.be.true;
    isEmpty([]).should.be.true;
    isEmpty({}).should.be.true;
    isEmpty(0).should.be.false;
    isEmpty(' ').should.be.false;
    isEmpty([1]).should.be.false;
    isEmpty({a:1}).should.be.false;
    isEmpty(new Date()).should.be.false;
  });

  it('forEach', function () {
    var obj = {a: 1, b: 2, c: 3},
        keys = [],
        value = 0;
    Objects.forEach(obj, function (v, k) {
      keys.push(k);
      value += v;
    });

    keys.length.should.equal(3);
    keys.should.deep.equal(['a','b','c']);
    value.should.equal(6);
  });

  it('toTextValue', function () {
    var _ = Objects.toTextValue;
    var arr = [1, 2, 3, 4];
    var arrObj = arr.map(function (i) {
      return { $text: i, $value: i };
    });

    _(arr).should.deep.equal(arrObj);

    var rawObj = [
      { cn: '南京', key: 'nanjing' },
      { cn: '北京', key: 'beijing' },
      { cn: '上海', key: 'shanghai' }
    ];
    var targetObj = [
      { cn: '南京', key: 'nanjing', $text: '南京', $value: 'nanjing' },
      { cn: '北京', key: 'beijing', $text: '北京', $value: 'beijing' },
      { cn: '上海', key: 'shanghai', $text: '上海', $value: 'shanghai' }
    ];
    _(rawObj, '{cn}', '{key}').should.deep.equal(targetObj);

    _(null).should.eql([]);
  });

  it('sortByKey', () => {
    let obj = { a: 1, c: 2, b: 3 };
    JSON.stringify(Objects.sortByKey(obj)).should.eql(JSON.stringify({a:1, b:3, c:2}));
    Objects.sortByKey(null).should.eql({});
  });
});
