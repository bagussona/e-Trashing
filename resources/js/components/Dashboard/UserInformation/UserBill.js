import React from 'react';
import Header from '../../Header';


function UserBill(props) {

  return (
    <div>
      <Header page='User Bill'/>
      <button onClick={() => console.log(props.props)}>Back</button>
    </div>
  )
}

export default UserBill;