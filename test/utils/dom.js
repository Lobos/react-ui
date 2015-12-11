'use strict';

import * as Dom from '../../src/utils/dom';
import isEqual from '../../src/utils/isEqual';

function getElement() {
  let outer = document.createElement('div');
  outer.id = 'outer';
  outer.style.position = 'absolute';
  outer.style.left = '20px';
  outer.style.top = '30px';
  outer.style.height = '100px';
  outer.style.width = '200px';
  outer.style.borderWidth = '5px';
  outer.style.padding = '10px';
  outer.innerHTML = '<div id="inner"><label></label></div>';
  return outer;
}

describe('utils dom', () => {

  it('isDescendant', () => {
    let outer = getElement();
    let inner = outer.querySelector('#inner');
    Dom.isDescendant(outer, inner).should.be.true;

    let label = outer.querySelector('label');
    Dom.isDescendant(outer, label).should.be.true;

    Dom.isDescendant(label, outer).should.be.false;
  });

  it('offset', () => {
    let outer = getElement();
    // jsdom getBoundingClientRect return 0 for all properties
    isEqual(Dom.offset(outer), { top: 0, left: 0 }).should.be.true;
  });

  /*
  it('addClass', () => {
    let outer = getElement();
    Dom.addClass(outer, 'outer');
    outer.className.should.eql('outer');
    Dom.addClass(outer, 'outer2');
    outer.className.should.eql('outer outer2');
  });
  
  it('removeClass', () => {
    let outer = getElement();
    outer.className = 'outer outer2';
    Dom.removeClass(outer, 'outer');
    outer.className.should.eql('outer2');
  });

  it('toggleClass', () => {
    let outer = getElement();
    Dom.toggleClass(outer, 'outer');
    outer.className.should.eql('outer');
    Dom.toggleClass(outer, 'outer');
    outer.className.should.eql('');
  });

  it('hasClass', () => {
    let outer = getElement();
    outer.className = '';
    Dom.hasClass(outer, 'outer').should.be.false;
    Dom.addClass(outer, 'outer');
    Dom.hasClass(outer, 'outer').should.be.true;
  });
  */

  it('getOuterHeight', () => {
    let outer = getElement();
    document.body.appendChild(outer);
  });
});
