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
    var hashcode = Objects.hashcode;
    var arr = [1, 2, 3, 4];
    var arrObj = arr.map(function (i) {
      i = i.toString();
      return { $text: i, $value: i, $key: hashcode(i) };
    });

    _(arr).should.deep.equal(arrObj);

    var rawObj = [
      { cn: '南京', key: 'nanjing' },
      { cn: '北京', key: 'beijing' },
      { cn: '上海', key: 'shanghai' }
    ];
    var targetObj = [
      { cn: '南京', key: 'nanjing', $text: '南京', $value: 'nanjing', $key: hashcode({ cn: '南京', key: 'nanjing' }) },
      { cn: '北京', key: 'beijing', $text: '北京', $value: 'beijing', $key: hashcode({ cn: '北京', key: 'beijing' }) },
      { cn: '上海', key: 'shanghai', $text: '上海', $value: 'shanghai', $key: hashcode({ cn: '上海', key: 'shanghai' }) }
    ];
    _(rawObj, '{cn}', '{key}').should.deep.equal(targetObj);

    rawObj = [
      { cn: '南京', id: '1', key: 'nanjing' },
      { cn: '北京', id: '2', key: 'beijing' },
      { cn: '上海', id: '3', key: 'shanghai' }
    ];
    targetObj = [
      { cn: '南京', key: 'nanjing', id: '1', $text: '南京', $value: 'nanjing', $key: '1' },
      { cn: '北京', key: 'beijing', id: '2', $text: '北京', $value: 'beijing', $key: '2' },
      { cn: '上海', key: 'shanghai', id: '3', $text: '上海', $value: 'shanghai', $key: '3' }
    ];
    _(rawObj, '{cn}', '{key}').should.deep.equal(targetObj);

    _(null).should.eql([]);
  });

  it('hashcode', () => {
    var hashcode = Objects.hashcode;
    hashcode(12345).should.eql('ruxir');
    hashcode('12345').should.eql('ruxir');
    hashcode({a: 1}).should.eql('-numd4y');
    hashcode([1, 2, 3, 4, 5]).should.eql('-75lz7b');
  });

  it('sortByKey', () => {
    let obj = { a: 1, c: 2, b: 3 };
    JSON.stringify(Objects.sortByKey(obj)).should.eql(JSON.stringify({a:1, b:3, c:2}));
    Objects.sortByKey(null).should.eql({});
  });

  it('shallowEqual', () => {
    let a = { a: 1, b: 2 };
    let b = { b: 2, a: 1 };
    let c = a;
    (a === b).should.be.false;
    Objects.shallowEqual(a, b).should.be.true;
    Objects.shallowEqual(a, c).should.be.true;
    Objects.shallowEqual(a, null).should.be.false;
  });
});
