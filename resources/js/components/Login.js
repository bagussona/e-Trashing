import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Login() {

  const login = () => {
    const formData = new FormData();
    // formData.append('name', 'customer');
    formData.append('username', 'admin');
    // formData.append('email', 'sayaganteng@gantengsekali.com');
    formData.append('password', 'adminadmin');
    // formData.append('password_confirmation', '123123123')

    fetch(
      'http://localhost:8000/api/login', 
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
      console.log(body)
    })
    .catch(err => console.error(err))
  }

  useEffect(() => {
    login();
  })

  return (
    <>
      <div>Login</div>
      <Link to='/'>Home</Link>
    </>
  )
}

export default Login;
