import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';


function UserProfile() {

  return (
    <div id="dashboard-content" className="pl-16 py-10 ml-20 h-full">
      {/* <Header page={`${}`}/> */}
      <Link to='?tab=bukutabungan' >Buku Tabungan</Link>
      <button onClick={() => console.log(props)}></button>
    </div>
  )
}

export default UserProfile;