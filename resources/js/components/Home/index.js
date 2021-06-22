import { React, useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
// import Home from './Home';


function Home() {

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const getCookie = (name) => {
    const cookie = getCookieValue(name);

    return cookie !== '' ? cookie : `${cookie} tidak ditemukan`
  }

  const userLogout = () => {
    document.cookie = `token = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `logged_in = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `role = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `username = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`

    location.reload();
  }

  return (
    <div className="min-h-screen 2xl:container 2xl:mx-auto p-10 flex flex-col items-center justify-center">
      <div className="flex space-x-2 mb-4">
        <Link to='/dashboard'>Dashboard</Link>
        {getCookie('logged_in') === 'true' ? null : <>
          <Link to='/login'>Masuk</Link>
          <Link to='/register'>Register</Link>
        </>}
      </div>
      {/* <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route exact path='/' component={Home} />
      </Switch> */}
      <div className="w-1/2 overflow-auto">
        <pre>{getCookie('token')}</pre>
        <pre>{getCookie('logged_in')}</pre>
        <pre>{getCookie('role')}</pre>
      </div>
      <button onClick={() => userLogout()}>Logout</button>
    </div>
  )
}

export default Home;