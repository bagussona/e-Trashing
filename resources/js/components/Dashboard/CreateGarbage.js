import React from 'react';
import Header from '../Header';
// import { useStore } from '../../utilities/store';


function CreateGarbage() {
  // const data = useStore(state => state.data);

  return (
    <div id="dashboard-content" className="px-16 pt-10 ml-20 h-full">
      <Header page='Create Garbage' />
      <div>Create Garbage</div>
      {/* <button onClick={() => console.log(data)}>Lihat zustand</button> */}
    </div>
  )
}

export default CreateGarbage;