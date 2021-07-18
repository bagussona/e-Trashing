import React, { useEffect, useState } from 'react';
import { getLocation, getUserDetailsByID } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import Skeleton from 'react-loading-skeleton';


function Profile({ id, setRole }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})
  const [dataLocation, setDataLocation] = useState({});

  useEffect(() => {
    getUserDetailsByID(getCookie('token'), id)
    .then(res => {
      console.log(res)
      setData(res.data.user)
      setRole((res.data.user.role_names).toString())
      const coordinate = (res.data.user.location).split(', ')

      getLocation(coordinate[0], coordinate[1])
      .then(res => setDataLocation(res.data.address))
      setLoading(false)
    })
  }, [])

  return (
    <div id="user-profile" className="w-80 h-auto py-9 flex flex-col space-y-4" style={{fontFamily: ['Inter', 'sans-serif']}}>
      <div id="picture-wrapper" className="w-80 h-80">{
        loading ? 
        <Skeleton height="100%" /> :
        <picture className="w-full h-full">
          <img src={data.avatar} className="object-cover w-full h-full" />
        </picture>
      }</div>
      <div id="detail-wrapper" className="w-80 h-auto flex flex-col text-gray-600 items-center space-y-10 px-6">
        {
          loading ? 
          <>
            <div className="flex flex-col space-y-4">
              <Skeleton height={32-4} width={296} />
              <Skeleton height={64-4} width={296} />
            </div>
            <div className="flex flex-col space-y-10">
              <div className="flex flex-col space-y-2">
                <Skeleton height={24-4} width={296}/>
                <Skeleton height={24-4} width={296}/>
                <Skeleton height={24-4} width={296} />
              </div>
              <div className="flex flex-col space-y-4">
                <Skeleton height={28-4} width={148} />
                <div className="flex flex-col space-2">
                  <Skeleton height={24-4} width={296} />
                  <Skeleton height={24-4} width={296} />
                  <Skeleton height={24-4} width={296} />
                </div>
              </div>
            </div>
          </> :
          <>
            <div id="user-name-balance-wrapper" className="w-full h-auto flex flex-col space-y-4">  
              <span id="user-name" className="text-2xl text-center" style={{ fontWeight: 600 }}>{data.first_name} {data.last_name}</span>
              <div id="user-balance" className="w-full h-12 bg-blue-400 rounded-full shadow-md flex flex-row items-center justify-center space-x-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-white fill-current bi bi-wallet" viewBox="0 0 16 16">
                    <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                  </svg>
                <span className="text-white text-lg" style={{fontWeight: 400}}>Balance : {new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.saldo)}</span>
              </div>
            </div>
            <div id="user-detail" className="w-full h-auto flex flex-col space-y-10">
              <div id="user-contact" className="w-full h-auto flex flex-col space-y-2">
                <div id="user-address" className="flex flex-row items-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-pin-map-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                    <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                  </svg>
                  <span className="text-gray-400" style={{ fontWeight: 400 }}>{dataLocation.county || dataLocation.city}, {dataLocation.country}</span>
                </div>
                <div id="user-email" className="flex flex-row items-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                  </svg>
                  <span className="text-gray-400" style={{ fontWeight: 400 }}>{data.email}</span>
                </div>
                <div id="user-phone" className="flex flex-row items-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-400 fill-current bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                    <span className="text-gray-400" style={{ fontWeight: 400 }}>{data.nohape}</span>
                </div>
              </div>
              <div id="user-identity" className="w-full h-auto flex flex-col space-y-4">
                <div id="title" className="w-full h-auto flex flex-col justify-between items-start">
                  <span className="text-gray-600 text-lg" style={{ fontWeight: 600}}>Profile Details</span>
                </div>
                <div id="identity-details" className="w-full h-auto flex flex-col space-y-2">
                  <div id="first-name-detail" className="w-full flex flex-row h-auto justify-between">
                    <span className="text-gray-400">First Name</span>
                    <span className="text-gray-600">{data.first_name}</span>
                  </div>
                  <div id="last-name-detail" className="w-full flex flex-row h-auto justify-between">
                    <span className="text-gray-400">Last Name</span>
                    <span className="text-gray-600">{data.last_name}</span>
                  </div>
                  <div id="role-detail" className="w-full flex flex-row h-auto justify-between">
                    <span className="text-gray-400">Role</span>
                    <span className="text-gray-600">{(data.role_names).toString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      {/* <button onClick={() => setLoading(!loading)}>On - Off</button> */}
    </div>
  )
}

export default Profile;