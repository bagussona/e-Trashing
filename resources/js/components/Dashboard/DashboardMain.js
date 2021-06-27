import React from 'react';
import { userRole } from '../../cookie_const';
import { Link } from 'react-router-dom';
import Header from '../Header';

/** React Functional Component */
function DashboardMain(props) {
  
    if (localStorage.getItem(userRole) === 'admin') {
      return (
        <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
          <Header page='Dashboard' />
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
}
/** End of React Functional Component */

export default DashboardMain;