import React from 'react';
import Header from '../Header';


function Admin({data}) {
  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 overflow-auto" stlye={{height: 969+'px'}}>
      <Header page="Dashboard Admin" />
      <div><pre>{JSON.stringify(data, null, 2)}</pre></div>
    </div>
  )
}

export default Admin;