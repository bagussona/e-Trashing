import React, { useEffect } from 'react';
// import { useStore } from '../../utilities/store';
import Header from '../Header';


function CreateAccount() {
  // const manipulate = useStore(state => state.setData);

  return (
    <div id="dashboard-content" className="flex flex-col px-16 py-10 ml-20 h-full">
      <Header page="Add Staff" />
      <div id="page-content" className="w-full flex-grow bg-white shadow-md rounded">

      </div>
    </div>
  )
}

export default CreateAccount;