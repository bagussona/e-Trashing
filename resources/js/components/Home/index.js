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
        <pre>{getCookie('current_token')}</pre>
        <pre>{getCookie('logged_in')}</pre>
      </div>
    </div>
  )
}

export default Home;