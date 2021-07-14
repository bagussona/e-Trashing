import React, { useEffect, useState } from 'react';
import { getUserDetailsByID } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import Skeleton from 'react-loading-skeleton';


function Profile({ id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})

  useEffect(() => {
    getUserDetailsByID(getCookie('token'), id)
    .then(res => {
      console.log(res)
      setData(res.data.user)
      setLoading(false)
    })
  }, [])

  return (
    <div id="user-profile" className="w-80 h-auto bg-white shadow-md rounded py-10 flex flex-col space-y-4" style={{fontFamily: ['Inter', 'sans-serif']}}>
      <div id="picture-wrapper" className="w-80 h-80">{
        loading ? 
        <Skeleton height="100%" /> :
        <picture className="w-full h-full">
          <img src={data.avatar} className="object-cover w-full h-full" />
        </picture>
      }</div>
      <div id="detail-wrapper" className="w-80 h-auto flex flex-col text-gray-600">
        {
          loading ? 
          <Skeleton height={32} width="100%" /> :
          <span id="user-name" className="text-2xl text-center">{data.first_name} {data.last_name}</span>
        }
      </div>
    </div>
  )
}

export default Profile;