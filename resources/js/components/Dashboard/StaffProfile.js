import React, { useEffect } from 'react';
import { getCookie } from '../../utilities/obtain_cookie';
import Header from '../Header';


function StaffProfile() {

  useEffect(() => {
    console.log(getCookie('token'));
  }, [])

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
      <Header page="Staff Profile" />
    </div>  
  )
}

export default StaffProfile;