import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';


function Dashboard() {
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div>Dashboard</div>
        <Link to='/'>Home</Link>
        <button onClick={() => userLogout()}>Logout</button>
        <div className="">

        </div>
      </div>
      <Footer height="5%" />
    </div>
  )
}

export default Dashboard;