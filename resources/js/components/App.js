import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(
    () => setPageLoading(false)
  )

  if (pageLoading) {
    return (
      <div>Loading</div>
    )
  } else if (!pageLoading) {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}


export default App;