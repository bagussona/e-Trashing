import React, { useEffect } from 'react';
import { getCookie } from '../../utilities/obtain_cookie';


function StaffProfile() {

  useEffect(() => {
    console.log(getCookie('token'));
  }, [])

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
      <div>Staff Profile</div>
    </div>  
  )
}

export default StaffProfile;