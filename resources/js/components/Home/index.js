import { React, useEffect, useState } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Footer from '../Footer';
import { isLogin } from '../../cookie_const';
// import Home from './Home';


function Home() {
  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const getCookie = (name) => {
    const cookie = getCookieValue(name);

    return cookie || 'tidak ditemukan';
  }

  // if (getCookie(isLogin) === 'true') {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          {getCookie(isLogin) === 'true' ? 
            <div className="flex space-x-2 mb-4">
              <Link to='/dashboard'>Dashboard</Link>
              <button onClick={() => userLogout()}>Logout</button>
            </div> : 
            <div className="flex space-x-2 mb-4">
              <Link to='/login'>Masuk</Link>
              <Link to='/register'>Register</Link>
            </div>
          }
          {/* <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route exact path='/' component={Home} />
          </Switch> */}
          {/* <div className="w-1/2 overflow-auto">
            <pre>{getCookie('token')}</pre>
            <pre>{getCookie('logged_in')}</pre>
            <pre>{getCookie('role')}</pre>
          </div> */}
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
  // } else {
  //   return <Redirect to='/login' />
  // }

}

export default Home;