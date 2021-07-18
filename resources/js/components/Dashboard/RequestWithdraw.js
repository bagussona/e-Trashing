import React, { useEffect, useState } from 'react';
import { getWithdrawDetail } from '../../apis/api';
import { getCookie } from '../../utilities/obtain_cookie';


function RequestWithdraw({ match }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWithdrawDetail(getCookie('token'), match.params.withdrawid)
    .then(res => {
      console.log(res)
      setLoading(false)
    })
  }, [])

  return (
    loading ? 
    <span>Loading</span> : 
    <div>RequestWithdraw, ke: {match.params.withdrawid}</div>
  )
}

export default RequestWithdraw;