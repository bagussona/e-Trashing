import React, { useState } from 'react';
import Header from '../../Header';
import Profile from './Profile';
import History from './History';
import Passbook from './Passbook';

function UserInformation(props) {

  const [role, setRole] = useState('');
    
  return (
    <div id="dashboard-content" className="px-16 py-10 ml-20 h-full">
        {/* <ConditionalRender val={queryParam.tab} data={data} /> */}
      <Header page='User Account' />
      <div id="page-content" className="bg-white shadow-md rounded w-full h-auto flex flex-row">
          <Profile id={props.match.params.id} setRole={setRole} />
          {role === 'bendahara' || role === 'admin' || role === 'staff' || role === 'pengepul' ? <span></span> : 
            <>
              <Passbook id={props.match.params.id} role={role}/>
              <History id={props.match.params.id} role={role}/>
            </>
          }
        </div>
    </div>
  )
}

export default UserInformation;