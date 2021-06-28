import React, { useEffect } from 'react';
// import { useStore } from '../../utilities/store';
import Header from '../Header';


function CreateAccount() {
  // const manipulate = useStore(state => state.setData);

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
      <Header page="Create Account" />
      <div>Create Account</div>

      {/* <button onClick={manipulate('data')}>Tambah zustand</button> */}
    </div>
  )
}

export default CreateAccount;