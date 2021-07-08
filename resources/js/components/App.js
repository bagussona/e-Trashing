import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { ClimbingBoxLoading } from './Assets/LoadingPage';
import Home from './Home';
import Message from './Message';


function App() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(false)
  }, [])

  if (pageLoading) {
    return (
      <ClimbingBoxLoading />
    )
  } else if (!pageLoading) {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/message' component={Message} />

        </Switch>
      </Router>
    )
  }
}


export default App;
