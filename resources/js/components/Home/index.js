import { React, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
// import Home from './Home';


function Home() {

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

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
      <div><pre>{getCookieValue('current_token')}</pre></div>
    </div>
  )
}

export default Home;