import React, { useEffect } from 'react';

// const headerCondition = (location) => {
//   switch (location) {
//     case '/dashboard/userlist/user/:id':
//       return <div>Test</div>
//   }
// }


function Header(props) {
  const { page } = props;

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div id="page-title" className="w-full flex flex-row h-14 mb-8 justify-between">
      <div id="title-left" className="flex flex-row items-center">
        {/* <span id="title" className="text-xl text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>{page}</span> */}
      </div>
      <div id="title-right"></div>
    </div>
  )
}

export default Header;