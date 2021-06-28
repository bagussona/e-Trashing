import React from 'react';
import { userRole } from '../../cookie_const';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Admin from './Admin';
import Treasurer from './Treasurer';

/** React Functional Component */
function DashboardMain(props) {
  
    if (localStorage.getItem(userRole) === 'admin') {
      return (
        <Admin />
      )
    } else if (localStorage.getItem(userRole) === 'bendahara') {
      return (
        <Treasurer />
      )
    }
}
/** End of React Functional Component */

export default DashboardMain;