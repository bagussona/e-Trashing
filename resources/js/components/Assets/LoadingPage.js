import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';


function LoadingPage(props) {
  const { height, width } = props

  return (
    <div id="loading-page" className={`h-${height ? height : 'screen'} w-${width ? width : 'screen'} bg-transparent flex items-center justify-center`}>
      <ClimbingBoxLoader color="#60A5FA" size={15}/>
    </div>
  )
}

export default LoadingPage;