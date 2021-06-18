import { React, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <>
      <div>Home</div>
      <Link to='/login'>Login</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </>
  )
}

export default Home;