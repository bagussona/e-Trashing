import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAxios, loginFetch } from '../apis/api';

function Login(props) {
  const { history } = props;

  const [userCredential, setUserCredential] = useState({
    username: '', 
    password: ''
  });

  const userLogin = () => {
    const formData = new FormData();
    formData.append('username', userCredential.username);
    formData.append('password', userCredential.password);

    loginAxios(formData)
    .then(async res => {
      const body = await res;
      const cookies = body.data;

      console.log(cookies)
      // history.push('/dashboard')
    })
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute w-1/4 h-1/2 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded box-border" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
        <div className="relative w-full h-full">
          <div className="flex items-center justify-center h-24">
            <h1 className="text-blue-400 text-2xl subpixel-antialiased" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 500}}>LOGIN | BTS ID</h1>
          </div>
          <div className="flex flex-col w-full h-full items-center p-5">
            <div className="flex flex-row w-full items-center h-10 mb-6 relative">
              <img className="absolute transform -translate-y-1/2" src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624286241/BTS-ID/envelope-fill_3.svg" style={{ top: 45 + '%' }}/>
              <input 
                type="text" 
                className="pl-7 text-base text-gray-400 w-full h-full border-b-3 border-gray-300 placeholder-gray-400 bg-transparent focus:outline-none focus:border-blue-400 transition-colors duration-300 "
                style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }} 
                placeholder="Enter Your Username" 
                value={userCredential.username}
                onChange={e => setUserCredential({
                  ...userCredential, 
                  username: e.target.value
                })}
              />
            </div>
            <div className="flex flex-row w-full items-center h-10 mb-6 relative">
              <img className="absolute transform -translate-y-1/2" src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624286241/BTS-ID/lock-fill_3.svg" style={{ top: 45 + '%' }}/>
              <input 
                type="password" 
                className="pl-7 text-base text-gray-400 w-full h-full border-b-3 border-gray-300 placeholder-gray-400 bg-transparent focus:outline-none focus:border-blue-400 transition-colors duration-300 "
                style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}} 
                placeholder="Password" 
                value={userCredential.password}
                onChange={e => setUserCredential({
                  ...userCredential, 
                  password: e.target.value
                })}
              />
            </div>
            <div className="flex flex-row w-full justify-end items-center h-10 mb-6">
              <span className="text-blue-400"><Link to="#" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Forgot Password?</Link></span>
            </div>
            <div className="flex flex-row w-full justify-end items-center h-10 mb-6 space-x-4">
              <button className="h-full bg-white shadow-md px-6 rounded focus:outline-none hover:bg-gray-200 active:bg-white transition-colors duration-300">
                <span className="text-blue-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>SIGN UP</span>
              </button>
              <button className="h-full bg-blue-400 shadow-md px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300" onClick={() => userLogin()}>
                <span className="text-white" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>SIGN IN</span>
              </button>
            </div>
          </div>
          <div className="absolute w-11/12 bg-blue-400 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded" style={{ height: 25 + '%', bottom: -82, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
          </div>
        </div>
      </div>
      <div className="">

      </div>
    </div>
  )
}

export default Login;
