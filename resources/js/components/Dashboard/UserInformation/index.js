import React from 'react';
import Header from '../../Header';
import Profile from './Profile';
import History from './History';
import Passbook from './Passbook';

function UserInformation(props) {
    
  return (
    <div id="dashboard-content" className="px-16 py-10 ml-20 h-full">
        {/* <ConditionalRender val={queryParam.tab} data={data} /> */}
      <Header page='User Account' />
        <div id="page-content" className="w-full h-auto flex flex-row">
          <Profile id={props.match.params.id} />
          <Passbook />
          <History />
        </div>
    </div>
  )
}

export default UserInformation;