import React, { useEffect, useState } from 'react';
import { getUserPassbook } from '../../../apis/api';
import Skeleton from 'react-loading-skeleton';
import { getCookie } from '../../../utilities/obtain_cookie';


function Passbook({ id, role }) {

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(false);
  const [data, setData] = useState({})
  
  useEffect(() => {
    if (role !== 'bendahara' || role !== 'admin' || role !== 'staff' || role !== 'pengepul') {
      getUserPassbook(getCookie('token'), id)
      .then(res => {
        setCustomer(true)
        // console.log(res.data.passbook_customer)
        setData(res.data.passbook_customer)
        setLoading(false)
      })
    } else {
      setCustomer(false)
    }
  }, [])


  if (loading) {
    return (
      <div id="user-passbook" className="w-3/5 flex flex-col space-y-4 ml-3 mr-3 py-9" style={{ height: 820 + 'px' }}>
        <div id="skeleton-wrapper" className="flex flex-col h-auto space-y-1.5">
          <div id="skeleton-table-header" className="w-full h-14 bg-white shadow-md flex flex-row">
            <div id="skeleton-title-id" className="h-full w-12 items-center justify-start flex px-4">
              <Skeleton height={24} width={14} />
            </div>
            <div id="skeleton-title-date" className="h-full w-32 items-center justify-start flex px-4">
              <Skeleton height={24} width={96} />
            </div>
            <div id="skeleton-title-detail" className="h-full w-1/2 items-center justify-start flex px-4">
              <Skeleton height={24} width={96} />
            </div>
            <div id="skeleton-money-details" className="h-full flex-grow flex flex-row">
              <div id="skeleton-title-credit" className="h-full w-1/2 items-center justify-start flex  px-4">
                <Skeleton height={24} width={96} />
              </div>
              <div id="skeleton-title-balance" className="h-full w-1/2 items-center justify-start flex  px-4">
                <Skeleton height={24} width={96} />
              </div>
            </div>
          </div>
          <div id="skeleton-table-body" className="flex flex-col space-y-1.5">
            <div id="skeleton-table-row-wrapper" className="w-full h-16 bg-white shadow-md flex flex-row">
              <div id="skeleton-title-id" className="h-full w-12 items-center justify-start flex px-4">
                <Skeleton height={24} width={14} />
              </div>
              <div id="skeleton-title-date" className="h-full w-32 items-center justify-start flex px-4">
                <Skeleton height={24} width={96} />
              </div>
              <div id="skeleton-title-detail" className="h-full w-1/2 items-center justify-start flex px-4">
                <Skeleton height={24} width={400} />
              </div>
              <div id="skeleton-money-details" className="h-full flex-grow flex flex-row">
                <div id="skeleton-title-credit" className="h-full w-1/2 items-center justify-start flex  px-4">
                  <Skeleton height={24} width={120} />
                </div>
                <div id="skeleton-title-balance" className="h-full w-1/2 items-center justify-start flex  px-4">
                  <Skeleton height={24} width={120} />
                </div>
              </div>
            </div>
            <div id="skeleton-table-row-wrapper2" className="w-full h-16 bg-gray-100 shadow-md flex flex-row">
              <div id="skeleton-title-id" className="h-full w-12 items-center justify-start flex px-4">
                <Skeleton height={24} width={14} />
              </div>
              <div id="skeleton-title-date" className="h-full w-32 items-center justify-start flex px-4">
                <Skeleton height={24} width={96} />
              </div>
              <div id="skeleton-title-detail" className="h-full w-1/2 items-center justify-start flex px-4">
                <Skeleton height={24} width={400} />
              </div>
              <div id="skeleton-money-details" className="h-full flex-grow flex flex-row">
                <div id="skeleton-title-credit" className="h-full w-1/2 items-center justify-start flex  px-4">
                  <Skeleton height={24} width={120} />
                </div>
                <div id="skeleton-title-balance" className="h-full w-1/2 items-center justify-start flex  px-4">
                  <Skeleton height={24} width={120} />
                </div>
              </div>
            </div>
            <div id="skeleton-table-row-wrapper" className="w-full h-16 bg-white shadow-md flex flex-row">
              <div id="skeleton-title-id" className="h-full w-12 items-center justify-start flex px-4">
                <Skeleton height={24} width={14} />
              </div>
              <div id="skeleton-title-date" className="h-full w-32 items-center justify-start flex px-4">
                <Skeleton height={24} width={96} />
              </div>
              <div id="skeleton-title-detail" className="h-full w-1/2 items-center justify-start flex px-4">
                <Skeleton height={24} width={400} />
              </div>
              <div id="skeleton-money-details" className="h-full flex-grow flex flex-row">
                <div id="skeleton-title-credit" className="h-full w-1/2 items-center justify-start flex  px-4">
                  <Skeleton height={24} width={120} />
                </div>
                <div id="skeleton-title-balance" className="h-full w-1/2 items-center justify-start flex  px-4">
                  <Skeleton height={24} width={120} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    if (customer) {
      return (
        <div id="user-passbook" className="w-3/5 flex flex-col space-y-4 ml-3 mr-3 py-9" style={{height: 820+'px'}} style={{fontFamily: ['Inter', 'sans-serif']}}>
          <div id="passbook-title" className="w-full h-auto text-left">
            <span className="text-lg text-gray-600" style={{fontWeight: 600}}>Passbook</span>
          </div>
          <div id="passbook-table" className="flex flex-col h-full space-y-1.5">
            <div id="table-header" className="w-full h-14 bg-white shadow-md flex flex-row">
              <div id="header-id" className="h-full w-12 items-center justify-start flex px-4">
                <span className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>ID</span>
              </div>
              <div id="header-date" className="h-full w-32 items-center justify-start flex px-4">
                <span className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>Tanggal</span>
              </div>
              <div id="header-details" className="h-full w-1/2 items-center justify-start flex px-4">
                <span className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>Keterangan</span>
              </div>
              <div id="header-money-wrapper" className="h-full flex-grow flex flex-row">
                <div id="header-credit" className="h-full w-1/2 items-center justify-start flex px-4">
                  <span className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>Kredit</span>
                </div>
                <div id="header-balance" className="h-full w-1/2 items-center justify-start flex px-4">
                  <span className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>Saldo</span>
                </div>
              </div>
            </div>
            <div id="table-body" className="overflow-auto flex-grow flex flex-col space-y-1.5">
              {
                data.length == 0 ? 
                <div id="empty-table-alert" className="w-full h-full items-center justify-center">
                  <span className="text-gray-400 text-2xl">No Passbook Data</span>
                </div> :
                <>
                  {data.map((el, idx) => (
                    <div key={idx} id="table-row-wrapper" className={`w-full h-16 bg-${(idx+1) % 2 == 1 ? 'white' : 'gray-100'} shadow-md flex flex-row`}>
                      <div id="body-row-id" className="h-full w-12 items-center justify-start flex px-4">
                        <span className="text-gray-400 text-sm" style={{ fontWeight: 400 }}>{idx+1}</span>
                      </div>
                      <div id="body-row-date" className="h-full w-32 items-center justify-start flex px-4">
                        <span className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>{el.Tanggal}</span>
                      </div>
                      <div id="body-row-details" className="h-full w-1/2 items-center justify-start flex px-4">
                        <span className="text-gray-600" style={{ fontWeight: 400 }}>{el.Keterangan}</span>
                      </div>
                      <div id="body-row-money-wrapper" className="h-full flex-grow flex flex-row">
                        <div id="body-row-credit" className="h-full w-1/2 items-center justify-start flex px-4">
                          <span className="text-gray-600" style={{ fontWeight: 400 }}>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(el.Credit)}</span>
                        </div>
                        <div id="body-row-balance" className="h-full w-1/2 items-center justify-start flex px-4">
                          <span className="text-gray-600" style={{ fontWeight: 400 }}>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(el.Saldo)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </> 
              }
            </div>
          </div>
        </div>
      )
    } else {
      return <span></span>
    }
  }

}

export default Passbook;