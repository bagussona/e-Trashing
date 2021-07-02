import React, { useState, useEffect  } from 'react';
import Header from '../../Header';
import UserBill from './UserBill';
import UserProfile from './UserProfile';


const queryString = require('query-string');

// const ConditionalRender = (props) => {
const conditionalRender = (val, data, props) => {
  // switch (props.val) {
  switch (val) {
    case 'bukutabungan':
      return <UserBill props={props} />
    default:
      // return <UserProfile data={props.data} />
      return <UserProfile data={data} props={props}/>
  }
}

function UserInformation(props) {
  const queryParam = queryString.parse(props.location.search);

  const [data, setData] = useState({})

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
        {/* <ConditionalRender val={queryParam.tab} data={data} /> */}
        <Header page='User Profile' />
        {conditionalRender(queryParam.tab, data,)}
    </div>
  )
}

export default UserInformation;