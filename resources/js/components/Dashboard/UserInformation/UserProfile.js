import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


function UserProfile() {

  useEffect(() => {
    // getUserDetailsByID(getCookie('token'), match.params.id)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    console.log()
  }, [])

  return (
    <div>
    {/* <div id="dashboard-content" className="pl-16 py-10 ml-20 h-full"> */}
      {/* <Header page={`${}`}/> */}
      <Link to='?tab=bukutabungan'>Buku Tabungan</Link>
      {/* <button onClick={() => console.log(props.props)}>test</button> */}
    {/* </div> */}
    </div>
  )
}

export default UserProfile;