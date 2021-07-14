import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../utilities/store';

// const headerCondition = (location) => {
//   switch (location) {
//     case '/dashboard/userlist/user/:id':
//       return <div>Test</div>
//   }
// }

const isoToDate = iso => {
  const convertedIso = new Date(iso);

  const date = convertedIso.getDate();
  const month = convertedIso.getMonth();
  const year = convertedIso.getFullYear();

  return `${year}-${month+1}-${date}`
}

function Header(props) {
  const { page } = props;
  const [iconColor, setIconColor] = useState(false);
  const [notificationDrop, setNotificationDrop] = useState(false);
  const notification = useStore(state => state.notification);
  
  const icon = v => {
    switch (v) {
      case true:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="text-gray-600 fill-current bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
        );
      case false:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="text-gray-600 fill-current bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
        );
      default:
        throw new Error();
    }
  }

  const process = (ev, a) => {
    switch (ev) {
      case 'Proses':
        return <span className="text-gray-600 text-sm">Meminta penarikan dana sejumlah <span style={{ fontWeight: 600 }} className="text-blue-400">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(a)}</span>.</span>
      case 'Accepted':
        return <span className="text-gray-600 text-sm">Penarikan dana sejumlah <span style={{ fontWeight: 600 }} className="text-blue-400">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(a)}</span> telah disetujui.</span>
      case 'Rejected':
        return <span className="text-gray-600 text-sm">Penarikan dana sejumlah <span style={{ fontWeight: 600 }} className="text-blue-400">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(a)}</span> ditolak.</span>
      default:
        return 
    }
  }

  const statusColor = s => {
    switch (s) {
      case 'Proses':
        return 'gray-400';
      case 'Accepted':
        return 'green-400';
      case 'Rejected':
        return 'red-400'
    }
  }

  const handleMouseEnter = () => {
    setIconColor(true)
    // setNotificationDrop(true)
  }

  const handleMouseLeave = () => {
    setIconColor(false)
    // setNotificationDrop(false)
  }

  useEffect(() => {
    console.log(notification)
  }, [])

  return (
    <div id="page-title" className="w-full flex flex-row h-14 mb-8 justify-between" style={{fontFamily: ['Inter', 'sans-serif']}}>
      <div id="title-left" className="flex flex-row items-center">
        <span id="title" className="text-xl text-gray-600" style={{fontWeight: 600}}>{page}</span>
      </div>
      {localStorage.getItem('role') === 'admin' ? 
        <span></span> :
        <div id="title-right" className="flex items-center justify-center">
          <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setNotificationDrop(!notificationDrop)} className="z-20 p-2 bg-white rounded-full shadow-md   hover:bg-gray-200 focus:outline-none relative" >
            {icon(iconColor)}
            {notification !== null ? 
              <div id="notification-indicator" className="h-3 w-3 rounded-full bg-red-400 shadow-md absolute top-2 right-2 transition-all">
              </div> : 
              <span></span>
            }
          </button>
          <div id="notification-drop" className={`h-auto w-120 absolute transform transition-all duration-300 top-24 right-16 ${notificationDrop ? 'bg-white shadow-md rounded visible' : '-translate-y-12 invisible opacity-0'}`}>
            <div id="notification-wrapper" className="h-auto w-full flex flex-col">
              <div id="notification-title" className="w-full justify-between flex flex-row items-center p-4 border-b-1">
                <span className="text-sm text-gray-600" style={{ fontWeight: 600 }}>Notification</span>
                <span className="text-xs text-blue-400" style={{ fontWeight: 600 }}>Mark all as read</span>
              </div>
              <div id="notification-content" className="h-auto w-full flex flex-col">
                {(notification.reqTarikan).length >= 1 ? notification.reqTarikan.map((el, idx) => (
                  <div key={idx} className="flex flex-col h-auto w-full hover:bg-gray-100 overflow-auto p-4 cursor-pointer transition-colors" onClick={() => console.log('clicked')}>
                    <div id="top-content" className="flex flex-row justify-between items-center w-full h-auto">
                      <span className="text-gray-600" style={{fontWeight: 600}}>{el.name}</span>
                      <span className={`text-sm text-${statusColor(el.status)}`}>{el.status}</span>
                    </div>
                    <div id="bottom-content" className="flex flex-col">
                      {process(el.status, el.jumlah)}
                      <span style={{ fontWeight: 600 }} className="text-blue-400 text-sm"><span className="text-gray-600" style={{ fontWeight: 400 }}>Kode pembayaran :</span> {el.kode_pembayaran}</span>
                    </div>
                  </div>
                )) : 
                <div id="notification-empty" className="h-20 w-full items-center flex justify-center">
                  <span className="text-gray-600">Tidak ada Notifikasi untuk hari ini ^.^</span>
                </div>
                }
              </div>
              <div id="notification-bottom-nav" className="h-auto justify-end flex flex-row items-center px-4 pb-4">
                <Link to="#" className="text-xs text-blue-400" style={{ fontWeight: 600 }}>See all</Link>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Header;