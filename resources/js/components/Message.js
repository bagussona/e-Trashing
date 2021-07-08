import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Message extends Component {
    render() {
        return (
          <div className="container">
            <p>I'm an component message 1!</p>
          </div>
        );
    }
}

if (document.getElementById('message-component')) {
    ReactDOM.render(<Message />, document.getElementById('message-component'));
}
