import React from 'react';
import { BounceLoader, ClimbingBoxLoader } from 'react-spinners';


function ClimbingBoxLoading(props) {
  const { height, width } = props

  return (
    <div id="loading-page" className={`h-${height ? height : 'screen'} w-${width ? width : 'screen'} bg-transparent flex items-center justify-center`}>
      <ClimbingBoxLoader color="#60A5FA" size={12}/>
    </div>
  )
}

function BounceLoading() {

  return (
    <div id="loading-page" className="h-screen w-screen absolute z-100 top-0 right-0">
      <div id="loading-page-wrapper" className="h-full -w-full bg-gray-400 opacity-50">
      </div>
      <div id="bounce" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BounceLoader color="#60A5FA" size={48} />
      </div>
    </div>
  )
}

export {
  ClimbingBoxLoading,
  BounceLoading
};