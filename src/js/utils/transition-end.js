/*
  * TransitionEnd
  * author: Evandro Leopoldino Gonçalves <evandrolgoncalves@gmail.com>
  * https://github.com/evandrolg
  * License: MIT
*/

var _Event = function(element, type){
  this.element = element;
  this.type = type;
};

_Event.prototype = {
  add: function(callback){
    this.callback = callback;
    this.element.addEventListener(this.type, this.callback, false);
  },

  remove: function(){
    this.element.removeEventListener(this.type, this.callback, false);
  }
};

var TransitionEnd = function(element){
  this.element = element;
  this.transitionEnd = this.whichTransitionEnd();
  this.event = new _Event(this.element, this.transitionEnd);
};

TransitionEnd.prototype = {
  whichTransitionEnd: function(){
    var transitions = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    };

    for(var t in transitions){
      if(this.element.style[t] !== undefined){
        return transitions[t];
      }
    }
  },

  bind: function(callback){
    this.event.add(callback);
  },

  unbind: function(){
    this.event.remove();
  }
};

var Cache = {
  list: [],

  getPosition: function(element){
    if(Array.prototype.indexOf){
      return this.list.indexOf(element);
    }

    for(var i = 0, size = this.list.length; i < size; i++){
      if(this.list[i] === element){
        return i;
      } 
    }

    return -1;
  },

  insert: function(element){
    var positonElement = this.getPosition(element);
    var isCached = positonElement !== -1;

    if(!isCached){
      this.list.push(element);
      this.list.push(new TransitionEnd(element));

      positonElement = this.getPosition(element);
    }

    return this.list[positonElement+1];
  }
};

module.exports = function(el){
  if(!el){
    throw 'You need to pass an element as parameter!';
  }

  var element = el[0] || el;
  var instance = Cache.insert(element);

  return instance;
};
