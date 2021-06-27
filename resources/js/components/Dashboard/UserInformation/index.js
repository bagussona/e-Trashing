import React, { useState, useEffect  } from 'react';
import UserBill from './UserBill';
import UserProfile from './UserProfile';


const queryString = require('query-string');

function UserInformation(props) {
  const queryParam = queryString.parse(props.location.search);

  const [data, setData] = useState({})

  useEffect(() => {
    console.log(props)
  }, [])

  switch (queryParam.tab) {
    case 'bukutabungan':
      return <UserBill />
    default: 
      return <UserProfile data={data} />
  }
}

export default UserInformation;