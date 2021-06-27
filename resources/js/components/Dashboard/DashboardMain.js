import React from 'react';
import { isLogin, userRole } from '../../cookie_const';
import { Link } from 'react-router-dom';
import Header from '../Header';

/** React Functional Component */
function DashboardMain(props) {

  /** Cookie related Method */
  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const getCookie = (name) => {
    const cookie = getCookieValue(name);

    return cookie || 'tidak ditemukan';
  }
  /** End of Method */

  /** Logout Method */
  // const userLogout = () => {
  //   document.cookie = `token = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
  //   document.cookie = `logged_in = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
  //   document.cookie = `role = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
  //   document.cookie = `username = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`

  //   const userLogoutVar = [isLogin, userRole];
  //   for (let i in userLogoutVar) {
  //     localStorage.removeItem(userLogoutVar[i]);
  //   }

  //   location.reload();
  // }
  // /** End of Logout Methods */

  // if (getCookie(isLogin) === 'true') {
    if (localStorage.getItem(userRole) === 'admin') {
      return (
        <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
          <Header page='Dashboard' location={props.location} />
          {/* <button onClick={() => userLogout()} className="text-gray-400">Logout</button> */}
          <Link to="/dashboard/userlist" className="text-gray-400">List User</Link>
        </div>
      )
    } else if (localStorage.getItem(userRole) === 'bendahara') {
      return (
        <>
          <div>Dashboard Bendaharaq</div>
        </>
      )
    }
  // } else {
  //   return <Redirect to='/login' />
  // }
}
/** End of React Functional Component */

export default DashboardMain;