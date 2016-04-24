import deepEqual from '../../src/utils/deepEqual';

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

describe('utils deepEqual', () => {

  it('anything equal', () => {

    var a = 1;
    deepEqual(a, 1).should.be.true;
    deepEqual(a, '1').should.be.false;
    a = NaN;
    deepEqual(a, NaN).should.be.true;

    deepEqual(2, new Number(2)).should.be.true;

    deepEqual(new Date(2015, 11, 21), new Date(1450627200000)).should.be.true;
    deepEqual(new Date(2015, 11, 20), new Date(2015, 11, 21)).should.be.false;

    deepEqual(noop(), noop()).should.be.true;

    deepEqual(/13$/, /13$/).should.be.true;
    deepEqual(/^13$/, /13$/).should.be.false;

    deepEqual(new String('i am string'), new String('i am string')).should.be.true;
    deepEqual(new String('i am string'), 'i am string').should.be.true;

    deepEqual({}, 1).should.be.false;
    deepEqual({}, new Date()).should.be.false;
    deepEqual(new Person('aa'), new Man('aa')).should.be.false;
    deepEqual(new Person('aa'), new Person('aa')).should.be.true;
    deepEqual(new Person('aa'), new Person('bb')).should.be.false;
    deepEqual(Person, new Person()).should.be.false;

    deepEqual({a: new Person('aa')}, {a: new Person('aa')}).should.be.true;

    deepEqual({ a: 1, b: NaN }, { a: 1, b: NaN }).should.be.true;
    deepEqual({ a: 1, b: 1 }, { a: 3, b: 1 }).should.be.false;
    deepEqual({ a: 1, b: 1 }, { a: 1 }).should.be.false;
    deepEqual({ a: 1 }, { a: 1, b: 1 }).should.be.false;
    deepEqual({ a: 1, b: 1 }, { b: '1', a: 1 }).should.be.false;
    deepEqual({ a: 1, b: 1 }, { b: 1, a: 1 }).should.be.true;
    deepEqual({ a: 1, b: { c: 1 } }, { b: { c: 1 }, a: 1 }).should.be.true;
    deepEqual({ a: 1, b: { c: function () {} } }, { b: { c: 1 }, a: 1 }).should.be.false;

    deepEqual([1, 2, 3], [1, 2, 3]).should.be.true;
    deepEqual([1, 2, 3], [1, 2]).should.be.false;
    deepEqual([1, 2, 3], [1, 3, 2]).should.be.false;
    deepEqual({a: [1, 2, 3]}, {a: [1, 3, 2]}).should.be.false;
    deepEqual({a: [1, 2, 3]}, {a: [1, 2, 3]}).should.be.true;
  });

});
