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
            <div id="left-content" className="w-80 mr-8 bg-white rounded shadow-md py-10 flex items-center justify-center">
            <div id="content-wrapper" className="flex flex-col w-full items-center justify-center space-y-10">
                <div id="picture-container" className="w-full flex justify-center items-center flex-col space-y-5">
                  <picture id="picture-wrapper">
                    <img src={staffProfile.user.avatar} className="h-60" alt="current avatar" />
                  </picture>
                  <div id="name-wrapper" className="text-center text-gray-600 text-2xl" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>
                    <span id="name">{staffProfile.user.first_name} {staffProfile.user.last_name}</span>
                  </div>
                </div>
                <div id="little-summary" className="w-full h-auto flex flex-col px-10 text-gray-400 space-y-2" style={{fontFamily: ['Inter', 'sans-serif']}}>
                  <div id="summary-city" className="flex flex-row items-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-pin-map-fill" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                      <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                    </svg>  
                    <span id="city" style={{fontWeight: 400}}>{location.county}, {location.country}</span>
                  </div>
                  <div id="summary-email" className="flex flex-row items-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg>
                    <span id="email" style={{ fontWeight: 400 }}>{staffProfile.user.email}</span>
                  </div>
                  <div id="summary-phone" className="flex flex-row items-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-telephone" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <span id="phone" style={{ fontWeight: 400 }}>{staffProfile.user.nohape}</span>
                  </div>
                </div>
                <div id="detail-summary" className="w-full flex flex-col px-10 space-y-5" style={{fontFamily: ['Inter', 'sans-serif']}}>
                  <div id="top-content" className="w-full h-auto flex flex-row justify-between items-center">
                    <span id="detail-summary-title" className="text-lg text-gray-600" style={{ fontWeight: 600 }}>Profile Details</span>
                    <button onClick={() => console.log('modal here')}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-600 fill-current bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </button>
                  </div>
                  <div id="detail-summary-wrapper" className="w-full flex flex-col space-y-2">
                    <div id="summary-firstname" className="w-full flex flex-row justify-between items-center">
                      <span id="first-name" className="text-gray-400">First Name</span>
                      <span id="value" className="text-gray-600">{staffProfile.user.first_name}</span>
                    </div>
                    <div id="summary-lastname" className="w-full flex flex-row justify-between items-center">
                      <span id="last-name" className="text-gray-400">Last Name</span>
                      <span id="value" className="text-gray-600">{staffProfile.user.last_name}</span>
                    </div>
                    <div id="summary-role" className="w-full flex flex-row justify-between items-center">
                      <span id="role" className="text-gray-400">Role</span>
                      <span id="value" className="text-gray-600">{staffProfile.user.role_names[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="right-content" className="flex-grow h-full ml-8 flex items-center justify-center text-gray-400 text-8xl" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>
              <span id="alert">Coming Soon</span>
            </div>  
          </div>
        {/* </div> */}
      </div>  
    )
  }

}

export default StaffProfile;