import { React, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <div>Home</div>
      <Link to='/login'>Login</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default Home;