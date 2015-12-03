import { expect } from 'chai';
import merge from '../../src/utils/merge';

const noop = function () {};
let Person = function (firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
};
Object.defineProperties(Person.prototype, {
  fullname: {
    get: function () {
      return this.firstname + ' ' + this.lastname;
    },
    enumerable: false
  }
});

describe('utils merge', () => {
  it('merge', () => {
    merge().should.eql({});

    let a = { a: 1, b: 2 };
    let b = { a: 3 };
    merge(a, b).should.eql({ a: 3, b: 2 });

    merge(a, null, b).should.eql({ a: 3, b: 2 });

    b = { a: noop };
    merge(a, b).should.eql({ a: noop, b: 2 });

    let p = new Person('a', 'san');
    merge({ a: 1 }, p).should.eql({ a:1, firstname: 'a', lastname: 'san' });
  });
});
