import React, { useEffect, useState } from 'react';
import { userRole } from '../../cookie_const';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Admin from './Admin';
import Treasurer from './Treasurer';
import { getCookie } from '../../utilities/obtain_cookie';
import { getTreasurerDashboardData } from '../../apis/api';
import {useStore} from '../../utilities/store';

/** React Functional Component */
function DashboardMain(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const currentUserID = useStore(state => state.currentUserID);
  
  useEffect(() => {
    console.log(props)
    getTreasurerDashboardData(getCookie('token'), currentUserID)
    .then(res => {
      setData(res)
      // console.log(res)
      setLoading(false);
    });
  }, [])
  
  return (
    loading ? <div>Loading</div> :
    
    localStorage.getItem(userRole) === 'admin' ? <Admin data={data} /> : localStorage.getItem(userRole) === 'bendahara' ? <Treasurer data={data} /> : null
  )
}
/** End of React Functional Component */

export default DashboardMain;