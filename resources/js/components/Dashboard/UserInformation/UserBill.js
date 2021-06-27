import React from 'react';
import Header from '../../Header';


function UserBill(props) {
  // const { history } = props;

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
      <Header page='User Bill' location={props} />
      <button onClick={() => console.log(props)}>Back</button>
    </div>
  )
}

export default UserBill;