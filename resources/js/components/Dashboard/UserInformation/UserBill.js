import React, { useContext, useEffect } from 'react';
import { getUserPassbook } from '../../../apis/api';
import { browserData } from '../../../utilities/context';
import { getCookie } from '../../../utilities/obtain_cookie';
import Header from '../../Header';


function UserBill(props) {
  const data = useContext(browserData);

  useEffect(() => {
    getUserPassbook(getCookie('token'), data.match.params.id)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Header page='User Bill'/>
      {/* <button onClick={() => console.log(props.props)}>Back</button> */}
    </div>
  )
}

export default UserBill;