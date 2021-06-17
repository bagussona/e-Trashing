import { React, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <>
      <div>Home</div>
      <Link to='/login'>Login</Link>
    </>
  )
}

export default Home;