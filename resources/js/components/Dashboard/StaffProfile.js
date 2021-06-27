import React, { useEffect } from 'react';
import { getCookie } from '../../utilities/obtain_cookie';


function StaffProfile() {

  useEffect(() => {
    console.log(getCookie('token'));
  }, [])

  return (
    <div>Staff Profile</div>
  )
}

export default StaffProfile;