"use strict";

require('../../less/message.less');

var React = require('react');
var Overlay = require('./overlay.jsx');
var Objects = require('../utils/objects');
var Classable = require('../mixins/classable');
var PubSub = require('pubsub-js');

var messages = [],
    ADD_MESSAGE = "EB3A79637B40",
    REMOVE_MESSAGE = "73D4EF15DF50";

var Item = React.createClass({
  displayName: 'Message.Item',

  propTypes: {
    content: React.PropTypes.string,
    dismissed: React.PropTypes.dismissed,
    index: React.PropTypes.number,
    onDismiss: React.PropTypes.func,
    type: React.PropTypes.string
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
      'message-' + this.props.type,
      {
        'dismissed': this.state.dismissed
      }
    );

    return (
      <div className={className}>
        <button type="button" onClick={this.dismiss} className="close">&times;</button>
        {this.props.content}
      </div>
    );
  }
});

var Message = React.createClass({
  displayName: 'Message',

  mixins: [Classable],

  getInitialState: function () {
    return {
      messages: messages
    };
  },

  componentDidMount: function () {
    var self = this;
    PubSub.subscribe(ADD_MESSAGE, function (topic, data) {
      messages.push(data);
      self.setState({ messages: messages });
    });

    PubSub.subscribe(REMOVE_MESSAGE, function (topic, index) {
      messages.splice(index, 1);
      self.setState({ messages: messages });
    });
  },

  dismiss: function(index) {
    PubSub.publish(REMOVE_MESSAGE, index);
  },

  clear: function () {
    Objects.forEach(this.refs, function (ref) {
      ref.dismiss();
    });
  },

  render: function () {
    var items = this.state.messages.map(function (msg, i) {
      return (
        <Item key={i} index={i} ref={i} onDismiss={this.dismiss} {...msg} />
      );
    }, this);

    var className = this.getClasses(
      'rui-message',
      'message-extend',
      { 'has-message': this.state.messages.length > 0 }
    );

    return (
      <div className={className}>
        <Overlay onClick={this.clear} />
        {items}
      </div>
    );
  }
});

Message.show = function (content, type) {
  PubSub.publish(ADD_MESSAGE, {
    content: content,
    type: type || 'info'
  });
};

module.exports = Message;
