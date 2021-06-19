import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const login = () => {
    const formData = new FormData();
    // formData.append('name', 'customer');
    formData.append('username', 'admin');
    // formData.append('email', 'sayaganteng@gantengsekali.com');
    formData.append('password', 'adminadmin');
    // formData.append('password_confirmation', '123123123')

    fetch(
      'https://bts-id.herokuapp.com/api/login', 
      {
        method: 'POST',
        headers: {
          'cors': 'no-cors'
        },
        body: formData
      }
    )
    .then(async res => {
      const body = await res.json();
      const data = document.querySelector('#data');
      data.innerHTML = JSON.stringify(body, null, 2)
    })
    .catch(err => console.error(err))
    // axios.post('http://bts-id.herokuapp.com', {
    //   data: formData, 
    //   headers: {
    //     'cors': 'no-cors'
    //   }
    // })
    // .then(res => console.log(res))
    // .catch(err => console.error(err))
  }

  useEffect(() => {
    login();
  })

  return (
    <>
      <div>Login</div>
      <Link to='/'>Home</Link>
      <div><pre id="data"></pre></div>
    </>
  )
}

export default Login;
