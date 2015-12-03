import isEqual from '../../src/utils/isEqual';

function noop() {
  return function () {};
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Man extends Person {
  constructor(name) {
    super(name);
  }
}

describe('utils isEqual', () => {

  it('anything equal', () => {

    var a = 1;
    isEqual(a, 1).should.be.true;
    isEqual(a, '1').should.be.false;
    a = NaN;
    isEqual(a, NaN).should.be.true;

    isEqual(2, new Number(2)).should.be.true;

    isEqual(new Date(2015, 11, 21), new Date(1450627200000)).should.be.true;
    isEqual(new Date(2015, 11, 20), new Date(2015, 11, 21)).should.be.false;

    isEqual(noop(), noop()).should.be.true;

    isEqual(/13$/, /13$/).should.be.true;
    isEqual(/^13$/, /13$/).should.be.false;

    isEqual(new String('i am string'), new String('i am string')).should.be.true;
    isEqual(new String('i am string'), 'i am string').should.be.true;

    isEqual({}, 1).should.be.false;
    isEqual({}, new Date()).should.be.false;
    isEqual(new Person('aa'), new Man('aa')).should.be.false;
    isEqual(new Person('aa'), new Person('aa')).should.be.true;
    isEqual(new Person('aa'), new Person('bb')).should.be.false;
    isEqual(Person, new Person()).should.be.false;

    isEqual({a: new Person('aa')}, {a: new Person('aa')}).should.be.true;

    isEqual({ a: 1, b: NaN }, { a: 1, b: NaN }).should.be.true;
    isEqual({ a: 1, b: 1 }, { a: 3, b: 1 }).should.be.false;
    isEqual({ a: 1, b: 1 }, { a: 1 }).should.be.false;
    isEqual({ a: 1 }, { a: 1, b: 1 }).should.be.false;
    isEqual({ a: 1, b: 1 }, { b: '1', a: 1 }).should.be.false;
    isEqual({ a: 1, b: 1 }, { b: 1, a: 1 }).should.be.true;
    isEqual({ a: 1, b: { c: 1 } }, { b: { c: 1 }, a: 1 }).should.be.true;
    isEqual({ a: 1, b: { c: function () {} } }, { b: { c: 1 }, a: 1 }).should.be.false;
  });

});
