import { React, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
// import Home from './Home';


function Home() {

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const getCookie = (name) => {
    const cookie_name = getCookieValue(name);

    return cookie_name !== '' ? cookie_name : `${cookie_name} tidak ditemukan`
  }

  const logout = (cookie_n) => {
    document.cookie = `${cookie_name}`
  }

  return (
    <div>
      <div>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login'>Masuk</Link>
        <Link to='/register'>Register</Link>
        <button onClick={() => logout()}>Logout</button>
      </div>
      {/* <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route exact path='/' component={Home} />
      </Switch> */}
      <div>{getCookie('current_token')}</div>
      <div>{getCookie('logged_in')}</div>
    </div>
  )
}

export default Home;