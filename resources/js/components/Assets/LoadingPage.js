import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';


function LoadingPage() {
  return (
    <div id="loading-page" className="h-full w-full bg-transparent flex items-center justify-center">
      <ClimbingBoxLoader color="#60A5FA" size={15}/>
    </div>
  )
}

export default LoadingPage;