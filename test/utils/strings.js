var Strings = require('../../src/utils/strings');

describe('utils strings', function () {

  it('string format', function () {
    var _ = Strings.format;
    var str = '{0}-{1}!={2}';
    _(str, '3', '4', 2).should.equal('3-4!=2');
    str = '{0}-{1}!={2}';
    _(str, '3', '4').should.equal('3-4!={2}');
  });

  it('string substitute', function () {
    Strings.substitute('{a}!={b}', { a:1, b:2 }).should.equal('1!=2');
    Strings.substitute('{a}!={b}{c}', { a:1, b:null }).should.equal('1!=');
    Strings.substitute('\\{a}!={b}', { a:1, b:2 }).should.equal('{a}!=2');
  });

  it('toArray', function () {
    var _ = Strings.toArray;
    var raw = '1,2,3';
    _(raw, ',').should.deep.equal(['1', '2', '3']);

    var raw = '1|2,3';
    _(raw, '|').should.deep.equal(['1', '2,3']);

    raw = '1,2,3';
    _(raw).should.deep.equal(['1,2,3']);

    raw = [1, 2, 3];
    _(raw, ',').should.deep.equal(['1', '2', '3']);

    raw = [1, 2, 3];
    _(raw).should.deep.equal([1, 2, 3]);

    raw = 123;
    _(raw).should.deep.equal(['123']);

    raw = '123';
    _(raw).should.deep.equal(['123']);

    _(null).should.deep.equal([]);
    _(undefined).should.deep.equal([]);
  });

  it('nextUid', function () {
    var uid;
    for(var i=0; i<100; i++) {
      uid = Strings.nextUid();
    }

    uid.length.should.eql(8);
  });
});
