import React, { useEffect } from 'react';
import { getCookie } from '../../utilities/obtain_cookie';
import Header from '../Header';


function Treasurer({data}) {
  // useEffect(() => {
  //   // console.log(data);
  // }, [])

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 overflow-auto" stlye={{height: 969+'px'}}>
      <Header page="Dashboard Bendahara" />
      <div><pre>{JSON.stringify(data, null, 2)}</pre></div>
    </div>  
  )
}

export default Treasurer;