import React, { useEffect, useState } from 'react';
import { getUser } from '../../../apis/api';
import Skeleton from 'react-loading-skeleton';
import { getCookie } from '../../../utilities/obtain_cookie';
import Header from '../../Header';
import ComingSoon from './ComingSoon';


const query = require('query-string');

function Settings(props) {

  const [loading, setLoading] = useState(true)
  const param = query.parse(props.location.search);
  const [data, setData] = useState({})

  const conditionalRender = param => {
    switch (param.tab) {
      case 'resetpassword':
        return <ComingSoon data={data} />
      default:
        return null
    }
  }

  useEffect(() => {
    getUser(getCookie('token'))
      .then(res => {
        console.log(res)
        setLoading(false)
        setData(res.data.user)
      })
  }, [])

  return (
    <div id="dashboard-content" className="px-16 pt-10 pb-16 ml-20 h-full overflow-auto">
      {loading ?
        <>
          <Skeleton />
        </> :
        <>
          <Header page="Settings" />
          <div id="page-content" className="w-full h-full flex flex-row" style={{ fontFamily: ['Inter', 'sans-serif'] }}>
            {/* <pre id="test"></pre> */}
            <div id="nav" className="h-auto w-1/4 flex flex-col">
              <button id="setting-button" className="text-left h-16 w-full hover:bg-gray-200 active:bg-gray-100 focus:outline-none transition-colors duration-200 px-6">
                <span className="text-gray-600" style={{ fontWeight: 400 }}>
                  Lorem Ipsum
                </span>
              </button>
              <button id="setting-button" className="text-left h-16 w-full hover:bg-gray-200 active:bg-gray-100 focus:outline-none transition-colors duration-200 px-6">
                <span className="text-gray-600" style={{ fontWeight: 400 }}>
                  Lorem Ipsum
                </span>
              </button>
              <button id="setting-button" className="text-left h-16 w-full hover:bg-gray-200 active:bg-gray-100 focus:outline-none transition-colors duration-200 px-6">
                <span className="text-gray-600" style={{ fontWeight: 400 }}>
                  Lorem Ipsum
                </span>
              </button>
              <button onClick={() => props.history.push('?tab=resetpassword')} id="setting-button" className="text-left h-16 w-full hover:bg-gray-200 active:bg-gray-100 focus:outline-none transition-colors duration-200 px-6">
                <span className="text-gray-600" style={{ fontWeight: 400 }}>
                  Reset Password
                </span>
              </button>
            </div>
            <div id="content" className="flex-grow bg-red-400 h-auto">
              {conditionalRender(param)}
            </div>
          </div>
        </>
      }
    </div>
  )


}

export default Settings;