import { React, useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Footer from '../Footer';
// import Home from './Home';


function Home() {

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const getCookie = (name) => {
    const cookie = getCookieValue(name);

    return cookie || 'tidak ditemukan';
  }

  const userLogout = () => {
    document.cookie = `token = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `logged_in = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `role = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `username = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`

    const userLogoutVar = ['logged_in', 'role'];
    for (let i in userLogoutVar) {
      localStorage.removeItem(userLogoutVar[i]);
    }

    location.reload();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex space-x-2 mb-4">
          {getCookie('logged_in') === 'true' ? <Link to='/dashboard'>Dashboard</Link> : <>
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
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen flex flex-col">
        <div className="flex-grow"></div>
        <Footer height="33%"/>
      </div>
    </>
  )
}

export default Home;