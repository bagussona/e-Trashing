import React, { useEffect } from 'react';


function ComingSoon(props) {

  useEffect(() => console.log(props))

  return (
    <div>Coming Soon</div>
  )
}

export default ComingSoon;