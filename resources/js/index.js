import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/Example';

if (document.getElementById('app')) {
  ReactDOM.render(
    <Example />, document.getElementById('app')
  )
}