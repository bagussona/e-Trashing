import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAxios, loginFetch } from '../apis/api';
import Footer from './Footer';


const dayParser = (day) => {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      break;
  }
}

const monthParser = (num) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  for (let month in months) {
    if (num == month) {
      return months[month]
    }
  }
}

const timeDigitParser = (num) => {
  var newNum = num.toString()
  if (newNum.length === 1) {
    return '0'+num
  } else {
    return num
  }
}

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
      // console.log('executed first');

      if (res.status === 200) {
        const cookies = body.data;
        // console.log('executed second');
  
        const date = new Date();
        document.cookie = `token = ${cookies.token}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        document.cookie = `logged_in = ${cookies.logged_in}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        document.cookie = `role = ${cookies.role}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        document.cookie = `username = ${cookies.username}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        
        history.push('/dashboard')
      } else {
        alert(res)
      }
    })
  }

  return (
    <>
      <div className="flex items-center justify-center flex-grow">
        <div className="w-1/4 h-4/6 bg-gray-100 rounded box-border" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
          <div className="relative w-full h-full">
            <div className="flex items-center justify-center h-24">
              <h1 className="text-blue-400 text-2xl subpixel-antialiased tracking-wider" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>WELCOME BACK :)</h1>
            </div>
            <div className="flex flex-col w-full h-full items-center p-5">
              <div className="flex flex-row w-full items-center h-10 mb-6 relative">
                <img className="absolute transform -translate-y-1/2" src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624286241/BTS-ID/envelope-fill_3.svg" style={{ top: 45 + '%' }}/>
                <input 
                  type="text" 
                  className="pl-7 text-base w-full h-full border-b-3 border-gray-300 placeholder-gray-400 bg-transparent focus:outline-none focus:border-blue-400 transition-colors duration-300 "
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
                  className="pl-7 text-base w-full h-full border-b-3 border-gray-300 placeholder-gray-400 bg-transparent focus:outline-none focus:border-blue-400 transition-colors duration-300 "
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
                <span className="text-blue-400"><Link to="#" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Forgot Password?</Link></span>
              </div>
              <div className="flex flex-row w-full justify-end items-center h-10 mb-6 space-x-4">
                <button className="h-full bg-white px-6 rounded focus:outline-none hover:bg-gray-200 active:bg-white transition-colors duration-300 shadow-md">
                  <span className="text-blue-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>SIGN UP</span>
                </button>
                <button className="h-full bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-md" onClick={() => userLogin()}>
                  <span className="text-white" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>SIGN IN</span>
                </button>
              </div>
            </div>
            <div className="absolute w-11/12 bg-blue-400 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded" style={{ height: 23 + '%', bottom: -82, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-row items-center space-x-5">
                  <span className="inline-block text-white mr-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Sign in With</span>
                  <a href="https://google.com">
                    <img src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624329645/BTS-ID/google.svg" style={{ height: 24 + 'px', width: 24 + 'px' }}/>
                  </a>
                  <a href="https://facebook.com">
                    <img src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624329645/BTS-ID/facebook.svg" style={{ height: 24 + 'px', width: 24 + 'px' }} />
                  </a>
                  <a href="https://twitter.com">
                    <img src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624329645/BTS-ID/twitter.svg" style={{ height: 24 + 'px', width: 24 + 'px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer height="25%" />
    </>
  )
}

export default Login;
