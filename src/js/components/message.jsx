"use strict";

require('../../less/message.less');

var React = require('react');
var Reflux = require('reflux');
var Overlay = require('./overlay.jsx');
var Objects = require('../utils/objects');
var Classable = require('../mixins/classable');

var Actions = Reflux.createActions([
  "error",
  "info",
  "remove",
  "clear",
  "success",
  "warn"
]);

var Store = Reflux.createStore({
  listenables: [Actions],

  init: function () {
    this.index = 0;
  },

  getInitialState: function () {
    this.messages = [];
    return this.messages;
  },

  push: function (content, level, title, clickaway) {
    this.messages.push({
      open: true,
      index: this.index++,
      content: content,
      level: level || 'info',
      title: title,
      clickaway: clickaway
    });
    this.trigger(this.messages);
  },

  onClear: function () {
    this.messages = [];
    this.trigger(this.messages);
  },

  onRemove: function (index) {
    var si = -1;
    for (var i = 0, count = this.messages.length; i < count; i++) {
      if (this.messages[i].index === index) {
        si = i;
        break;
      }
    }
    this.messages.splice(si, 1);
    this.trigger(this.messages);
  },

  onSuccess: function (content, title) {
    this.push(content, 'success', title, true);
  },

  onInfo: function (content, title) {
    this.push(content, 'info', title, true);
  },

  onWarn: function (content, title) {
    this.push(content, 'warning', title, true);
  },

  onError: function (content, title) {
    this.push(content, 'error', title, false);
  }
});

var Item = React.createClass({
  displayName: 'Message.Item',

  propTypes: {
    content: React.PropTypes.string,
    dismissed: React.PropTypes.dismissed,
    index: React.PropTypes.number,
    level: React.PropTypes.string,
    onDismiss: React.PropTypes.func,
    title: React.PropTypes.string
  },

  mixins: [Classable],

  getInitialState: function () {
    return {
      dismissed: this.props.dismissed
    };
  },

  dismiss: function () {
    if (this.state.dismissed) {
      return;
    }
    this.setState({ dismissed: true });
    setTimeout(function () {
      this.props.onDismiss(this.props.index);
    }.bind(this), 400);
  },

  render: function () {
    var className = this.getClasses(
      'message',
      'message-' + this.props.level,
      {
        'dismissed': this.state.dismissed
      }
    );

    return (
      <div className={className}>
        <button type="button" onClick={this.dismiss} className="close">&times;</button>
        {this.props.title && <h3>{this.props.title}</h3>}
        {this.props.content}
      </div>
    );
  }
});

var Message = React.createClass({
  displayName: 'Message',

  mixins: [Classable, Reflux.connect(Store, 'messages')],

  dismiss: function(index) {
    Actions.remove(index);
  },

  clear: function () {
    Objects.forEach(this.refs, function (ref) {
      ref.dismiss();
    });
  },

  render: function () {
    var items = this.state.messages.map(function (msg, i) {
      return (
        <Item key={i} ref={i} onDismiss={this.dismiss} {...msg} />
      );
    }, this);

    var className = this.getClasses(
      'rui-message',
      'message-extend',
      {
        'has-message': this.state.messages.length > 0
      }
    );

    return (
      <div className={className}>
        <Overlay onClick={this.clear} />
        {items}
      </div>
    );
  }
});

// exports actions
Message.error = Actions.error;
Message.info = Actions.info;
Message.success = Actions.success;
Message.warn = Actions.warn;
//Message.remove = Actions.remove;
//Message.clear = Actions.clear;

module.exports = Message;
