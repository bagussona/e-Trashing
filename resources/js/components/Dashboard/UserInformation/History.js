import React, { useState, useEffect } from 'react';
import { getSetoranByID } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import Skeleton from 'react-loading-skeleton';


function History({ id, role }) {
  const [loading, setLoading] = useState(true);
  // const [customer, setCustomer] = useState(false);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    getSetoranByID(getCookie('token'), id)
    .then(res => {
      // console.log(res)
      setDeposits(res.data.setoran_customer);
      setLoading(false)
      // document.querySelector('#test').innerHTML = JSON.stringify(res, null, 2)
    })
  }, [])

  if (loading) {
    return (
      <div id="skeleton-loading-wrapper" className="flex flex-col space-y-4 ml-3 pr-3 flex-grow py-9" style={{height: 820 + 'px'}}>
        <Skeleton height={24} width={140} />
        <div id="skeleton-loading-body" className="flex flex-col w-full h-full">
          <div id="top-body" className="w-full flex flex-row items-center justify-between">
            <Skeleton height={16} width={80} />
            <Skeleton height={20} width={64} />
          </div>
          <div id="bottom-body" className="flex flex-col w-full">
            <Skeleton height={20} width={160}/>
            <div id="bottom-body-bottom" className="flex flex-row items-center justify-between">
              <Skeleton height={16} width={140} />
              <Skeleton height={16} width={100} />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div id="user-deposit-history" className="ml-3 h-auto flex-grow py-9 flex flex-col space-y-4 pr-3" style={{ height: 820 + 'px', fontFamily: ['Inter', 'sans-serif']}}>
        <div id="deposit-history-title" className="w-full h-auto text-left">
          <span className="text-lg text-gray-600" style={{fontWeight: 600}}>Deposit History</span>
        </div>
        <div id="deposit-history-wrapper" className="w-full h-full flex flex-col overflow-auto">
          {deposits.map((el, idx) => (
            <div key={idx} id="deposits" className="flex flex-col h-auto w-full border-1 border-gray-100 pb-2">
              <div id="top" className="w-full h-8 flex flex-row items-center justify-between">
                <div id="deposits-date" className="flex items-center justify-center h-full text-gray-400 text-sm" style={{fontWeight: 600}}>
                  <span>{el.Tanggal}</span>
                </div>
                <div id="status" className="flex items-center justify-center h-6 w-16 text-xs text-blue-400 border-1 border-blue-400 rounded-md" style={{fontWeight: 600}}>
                  <span>{el.Keterangan}</span>
                </div>
              </div>
              <div id="bottom" className="w-full h-auto flex flex-col text-gray-600">
                <div id="bottom-top" className="w-full">
                  <span>{el.Jenis}</span>
                </div>
                <div id="bottom-bottom" className="w-full flex flex-row justify-between text-sm" style={{fontWeight: 600}}>
                  <div id="price-times-amount" className="flex flex-row">
                    <span>{new Intl.NumberFormat('id-Id', {style: 'currency', currency: 'IDR'}).format(el['@KG'])} x</span>
                    <span>&nbsp;{el.Berat} kg</span>
                  </div>
                  <span id="total-price">{new Intl.NumberFormat('id-Id', {style: 'currency', currency: 'IDR'}).format(el.Subtotal)}</span>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </div>
    )
  }

}

export default History;