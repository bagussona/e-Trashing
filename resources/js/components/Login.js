import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginAxios } from '../apis/api';
import { getCookieValue } from '../utilities/obtain_cookie';
import Footer from './Footer';
import { useStore } from '../utilities/store';


/** Custom External Functions */
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
/** End of Functions */

/** React Functional Component */
function Login(props) {
  /** Token */
  const { history } = props;
  /** End of Token */
  
  /** States */
  const [userCredential, setUserCredential] = useState({
    username: '',
    password: ''
  });
  const [invalidCredential, setInvalidCredential] = useState({
    username: false,
    password: false
  });
  /** End of State */

  /** Cookies and Login related Methods */
  const userLogin = (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    loginAxios(formData)
    .then(async res => {
      const body = await res;
      // console.log('executed first');

      if (res.status === 200) {
        const data = body.data;

        // set
        (data.id);
        // console.log('executed second');

        const date = new Date();
        document.cookie = `token = ${data.token}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        document.cookie = `logged_in = ${data.logged_in}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        document.cookie = `role = ${data.role}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`
        document.cookie = `username = ${data.username}; expires = ${dayParser(date.getDay() + 1)}, ${date.getDate() + 1} ${monthParser(date.getMonth())} ${date.getFullYear()} ${timeDigitParser(date.getHours())}:${timeDigitParser(date.getMinutes())}:${timeDigitParser(date.getSeconds())} GMT; path=/;`

        const isLoggedIn = getCookieValue('logged_in');
        const userRole = getCookieValue('role');

        const toLocalStorage = [{ 'logged_in': isLoggedIn }, { 'role': userRole }];
        for (let i in toLocalStorage) {
          localStorage.setItem(Object.keys(toLocalStorage[i]).toString(), Object.values(toLocalStorage[i]).toString())
        }

        history.push('/dashboard')
      } else {
        setInvalidCredential({
          username: true,
          password: true
        })
      }
    })

    // for (var pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    // console.log(userCredential.username);
    // console.log(userCredential.password);
  }
  /** End of Cookie and related Methods */

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        userLogin(userCredential);
        // console.log(userCredential)
      }
    }

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [userCredential])

  // useEffect(() => {
  //   console.log(userCredential);
  // })

  if (getCookieValue('logged_in') === 'true') {
    return <Redirect to='/dashboard' />
  } else {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex items-center justify-center flex-grow">
          <div className="w-1/4 h-4/6 bg-white rounded box-border" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <div className="relative w-full h-full">
              <div className="flex items-center justify-center h-24">
                <h1 className="text-blue-400 text-2xl subpixel-antialiased tracking-wider" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>WELCOME</h1>
              </div>
              <div className="flex flex-col w-full h-full items-center p-5">
                <div className="flex flex-row w-full items-center h-10 mb-6 relative">
                  <img alt="username" className="absolute transform -translate-y-1/2 h-4 w-4" src={invalidCredential.username ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624669105/BTS-ID/random/person-fill-red.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624669105/BTS-ID/random/person-fill.svg"} style={{ top: 45 + '%' }}/>
                  <input
                    type="text"
                    className={`pl-7 text-gray-600 w-full h-full border-b-3 ${invalidCredential.username ? "border-red-400" : "border-gray-300"} placeholder-gray-400 bg-transparent focus:outline-none focus:border-blue-400 transition-colors duration-300` }
                    style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}
                    placeholder="Enter Your Username"
                    value={userCredential.username}
                    onFocus={() => setInvalidCredential(
                      {...invalidCredential,
                        username: false
                      }
                    )}
                    onChange={e => {
                      setUserCredential({
                        ...userCredential,
                        username: e.target.value
                      })
                    }}
                  />
                </div>
                <div className="flex flex-row w-full items-center h-10 mb-6 relative">
                  <img alt="password" className="absolute transform -translate-y-1/2" src={invalidCredential.password ? 'https://res.cloudinary.com/tookoo-dil/image/upload/v1624342696/BTS-ID/lock-red.svg' : 'https://res.cloudinary.com/tookoo-dil/image/upload/v1624286241/BTS-ID/lock-fill_3.svg'} style={{ top: 45 + '%' }}/>
                  <input
                    type="password"
                    className={`pl-7 text-gray-600 w-full h-full border-b-3 ${invalidCredential.password ? "border-red-400" : "border-gray-300"} placeholder-gray-400 bg-transparent focus:outline-none focus:border-blue-400 transition-colors duration-300`}
                    style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}
                    placeholder="Password"
                    value={userCredential.password}
                    onFocus={() => setInvalidCredential(
                      {...invalidCredential,
                        password: false
                      }
                    )}
                    onChange={e => {setUserCredential({
                      ...userCredential,
                      password: e.target.value
                    })
                    }
                  }
                  />
                </div>
                {/* <div className="flex flex-row w-full justify-end items-center h-10 mb-6">
                  <span className="text-blue-400"><Link to="/resetpassword-email-verification" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Forgot Password?</Link></span>
                </div> */}
                <div className="h-24 flex flex-row w-full justify-end items-center h-10 mb-6 space-x-4">
                  <button className="w-30 h-10 bg-white px-6 rounded focus:outline-none hover:bg-gray-100 active:bg-white transition-colors duration-300 shadow-lg">
                    <span className="text-blue-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>SIGN UP</span>
                  </button>
                  <button className="w-30 h-10 bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg" onClick={() => {
                    userLogin(userCredential)
                    // console.log(userCredential)
                    }
                  }>
                    <span className="text-white" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>SIGN IN</span>
                  </button>
                </div>
              </div>
              <div className="absolute w-11/12 bg-blue-400 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded" style={{ height: 23 + '%', bottom: -82, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* <div className="flex flex-row items-center space-x-5"> */}
                    {/* <span className="inline-block text-white mr-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Staff Login Form</span> */}
                    {/* <a target="_blank" rel="noopener norefferer" href="https://google.com">
                      <img alt="google" src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624627048/BTS-ID/google_2.svg" style={{ height: 24 + 'px', width: 24 + 'px' }}/>
                    </a>
                    <a target="_blank" rel="noopener norefferer" href="https://facebook.com">
                      <img alt="facebook" src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624627048/BTS-ID/facebook_2.svg" style={{ height: 24 + 'px', width: 24 + 'px' }} />
                    </a>
                    <a target="_blank" rel="noopener norefferer" href="https://twitter.com">
                      <img alt="twitter" src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624627048/BTS-ID/twitter_2.svg" style={{ height: 24 + 'px', width: 24 + 'px' }} />
                    </a> */}
                  {/* </div> */}
                  <div id="accessories" className="w-16 h-16">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white fill-current bi bi-shield-lock-fill" viewBox="0 0 16 16">
                      <path className=" shadow-md " fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer height="25%" />
      </div>
    )
  }
}
/** End of React Functional Component */


export default Login;
