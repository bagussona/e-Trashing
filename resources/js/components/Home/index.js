import { React, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
// import Home from './Home';


function Home() {
  return (
    <div>
      <div>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login'>Masuk</Link>
        <Link to='/register'>Register</Link>
      </div>
      {/* <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route exact path='/' component={Home} />
      </Switch> */}
    </div>
  )
}

export default Home;