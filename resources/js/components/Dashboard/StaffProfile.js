import React, { useEffect, useState } from 'react';
import { getLocation, getUser } from '../../apis/api';
import { getCookie } from '../../utilities/obtain_cookie';
import { ClimbingBoxLoading } from '../Assets/LoadingPage';
import Header from '../Header';

function StaffProfile() {
  const [loading, setLoading] = useState(true);
  const [staffProfile, setStaffProfile] = useState({});
  const [location, setLocation] = useState({});

  const mountData = () => {
    getUser(getCookie('token'))
    .then(async res => {
      const body = await res
      setStaffProfile(body.data)

      const latAndLon = (res.data.user.location).split(', ')
      // console.log(latAndLon)
      getLocation(latAndLon[0], latAndLon[1])
      .then(res => {
        setLoading(false);
        setLocation(res.data.address);
      })
      // .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    mountData()
  }, [])

  if (loading) {
    return <ClimbingBoxLoading height="full" width="full" />
  } else {
    return (
      <div id="dashboard-content" className="px-16 py-10 ml-20 h-full flex flex-col">
        <Header page="Staff Profile" />
        <div id="page-content" className="w-full h-full flex flex-row px-16 py-10">
          {/* <div id="content-container" className="w-full flex-grow flex px-16 py-10 flex-row"> */}
            <div id="left-content" className="w-80 h-full mr-8 flex flex-col bg-white rounded shadow-md">
              <div id="picture-container" className="w-full flex justify-center items-center">
                <picture id="picture-wrapper" className="h-80 flex items-center">
                  <img src={staffProfile.user.avatar} className="h-3/4" alt="current avatar" />
                </picture>
              </div>
              <div id="little-summary" className="w-full h-auto flex flex-col px-10 text-gray-400" style={{fontFamily: ['Inter', 'sans-serif']}}>
                <div id="summary-city" className="flex flex-row items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span id="city" style={{fontWeight: 400}}>{location.county}, {location.country}</span>
                </div>
                <div id="summary-email" className="flex flex-row items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span id="email" style={{ fontWeight: 400 }}>{staffProfile.user.email}</span>
                </div>
                <div id="summary-phone" className="flex flex-row items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span id="phone" style={{ fontWeight: 400 }}>{staffProfile.user.nohape}</span>
                </div>
              </div>
            </div>
            <div id="right-content" className="flex-grow h-full ml-8 flex items-center justify-center">
              <div id="detail-wrapper">

              </div>
            </div>  
          </div>
        {/* </div> */}
      </div>  
    )
  }

}

export default StaffProfile;