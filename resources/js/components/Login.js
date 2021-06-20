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
    // formData.append('name', 'customer');
    formData.append('username', userCredential.username);
    // formData.append('email', 'sayaganteng@gantengsekali.com');
    formData.append('password', userCredential.password);
    // formData.append('password_confirmation', '123123123')

    // fetch(
    //   'https://bts-id.herokuapp.com/api/login', 
    //   {
    //     method: 'POST',
    //     // headers: {
    //     //   'cors': 'no-cors'
    //     // },
    //     body: formData
    //   }
    // )
    // .then(async res => {
    //   const body = await res.json();
    //   const data = document.querySelector('#data');
    //   data.innerHTML = JSON.stringify(body, null, 2)
    // })
    // .catch(err => console.error(err))
    loginAxios(formData)
    .then(res => {
      document.querySelector('#data').innerHTML = JSON.stringify(res.data, null, 2);
      document.cookie = `current_token=${res.token}`
    })
    .catch(err => console.error(err));
    // loginFetch(formData)
    // .then(res => {
    //   // saveToken(res.token);
    //   document.querySelector('#data').innerHTML = JSON.stringify(res, null, 2);
    //   document.cookie = `current_token=${res.token}`
    //   // console.log(token)
    // })
    // .catch(err => console.error(err));
  }

  // const testButton = (data) => {
  //   saveToken(data);
  //   // console.log(typeof(data.toString()))

  //   document.querySelector('#data').innerHTML = token;
  // }

  // useEffect(() => {
  //   // console.log(userCredential)
  //   userLogin();
  // })

  return (
    <>
      {/* <div>Login</div> */}
      <input type="text" value={userCredential.username} onChange={(ev) => setUserCredential({
        ...userCredential, 
        username: ev.target.value
      })}/>
      <input type="password" value={userCredential.password} onChange={(ev) => setUserCredential({
        ...userCredential,
        password  : ev.target.value
      })}/>
      <button onClick={() => userLogin()}>Masuk
      {/* <button onClick={() => testButton(JSON.stringify(userCredential, null, 2))}>Test Button</button> */}
    </button>
      <Link to='/'>Home</Link>
      <div><pre id="data"></pre></div>
    </>
  )
}

export default Login;
