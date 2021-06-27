import React from 'react';
import Header from '../../Header';


function UserBill(props) {

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
      <Header page='User Bill'/>
      <button onClick={() => console.log(props)}>Back</button>
    </div>
  )
}

export default UserBill;