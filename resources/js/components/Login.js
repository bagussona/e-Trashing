import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAxios, loginFetch } from '../apis/api';

function Login() {
  const [userCredential, setUserCredential] = useState({
    username: '', 
    password: ''
  })

  const userLogin = () => {
    const formData = new FormData();
    formData.append('username', userCredential.username);
    formData.append('password', userCredential.password);

    loginAxios(formData)
    .then(res => {
      document.querySelector('#data').innerHTML = JSON.stringify(res, null, 2);

      if (res.name === 'Error') {
        document.cookie = "current_token = ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      } else {
        document.cookie = `current_token = ${res.data.token}`
        document.cookie = `logged_in = ${res.data.logged_in}`
      }
    })
  }

  return (
    <div className="box-content flex flex-col items-center">
      {/* <div>Login</div> */}
      <input type="text" value={userCredential.username} onChange={(ev) => setUserCredential({
        ...userCredential, 
        username: ev.target.value
      })} className="p-2 m-4 w-80 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-md"/>
      <input type="password" value={userCredential.password} onChange={(ev) => setUserCredential({
        ...userCredential,
        password  : ev.target.value
      })} className="p-2 m-4 w-80 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-md"/>
      <button onClick={() => userLogin()} className="font-extralight p-2 bg-green-600 hover:bg-green-700 active:bg-green-600 focus:outline-none text-white w-20 text-lg tracking-widest" style={{fontFamily: ['Inter', 'sans-serif']}}>Masuk</button>
      <Link to='/'>Home</Link>
      <div className="shadow-2xl w-1/2 overflow-x-auto bg-green-100 text-green-600 rounded-sm p-2"><pre id="data"></pre></div>
    </div>
  )
}

export default Login;
