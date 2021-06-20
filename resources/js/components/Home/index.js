import { React, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { deleteToken, token } from '../../token/token';
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
      <div>{token}</div>
      <button onClick={() => deleteToken()}>Delete token</button>
    </div>
  )
}

export default Home;