import React, { useState, useEffect  } from 'react';
import { browserData } from '../../../utilities/context';
import Header from '../../Header';
import UserBill from './UserBill';
import UserProfile from './UserProfile'; 


const queryString = require('query-string');

// const ConditionalRender = (props) => {
const conditionalRender = (val) => {
  // switch (props.val) {
  switch (val) {
    case 'bukutabungan':
      return <UserBill />
    default:
      // return <UserProfile data={props.data} />
      return <UserProfile />
  }
}

function UserInformation(props) {
  const queryParam = queryString.parse(props.location.search);

  const [data, setData] = useState({})

  // useEffect(() => {
  //   console.log(props)
  // }, [])

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
        {/* <ConditionalRender val={queryParam.tab} data={data} /> */}
        <Header page='User Profile' />
        <div id="page-content">
          <browserData.Provider value={props}>
            {conditionalRender(queryParam.tab)}
          </browserData.Provider>
        </div>
    </div>
  )
}

export default UserInformation;