import React, { useState } from 'react';
import { useStore } from '../../../utilities/store';


function ChatList({ contacts }) {
  const setChatUser = useStore(state => state.setChatUser);
  const chatUser = useStore(state => state.chatUser);
  const setMessageLoading = useStore(state => state.setMessageLoading);

  const setData = data => {
    setChatUser(data);
    setMessageLoading(true);
  }


  return (
    <div id="chat-list-container" className="flex flex-col w-1/4" style={{fontFamily: ['Inter', 'sans-serif'], height: 813+'px'}}>
      <div id="chat-list-title" className="w-full h-12 flex items-center text-left text-gray-600 text-lg" style={{fontWeight: 600}}>
        <span>Contacts</span>
      </div>
      {/* <button onClick={() => console.log(chatUser === null ? 'null' : chatUser.id)}>Test</button> */}
      <div id="chat-list-wrapper" className="w-full flex-grow overflow-auto scrollbar bg-white rounded shadow-md">
        {contacts && contacts.map((el, idx) => (
          <div key={idx} id="user-box" className={`w-full h-24 flex flex-row px-4 items-center space-x-2 cursor-pointer ${chatUser === null ? 'bg-white hover:bg-gray-100' : el.id === chatUser.id ? "bg-blue-400" : "bg-white hover:bg-gray-100"}`} onClick={() => setData(el)}>
            <img id="user-avatar" src={el.avatar} className="h-14 w-14 rounded-full object-cover bg-white" />
            <div id="user-message-details" className="flex flex-col h-14 flex-grow">
              <div id="user-name-date" className={`${chatUser === null ? 'text-blue-400' : el.id === chatUser.id ?  'text-white' : "text-blue-400"} `} style={{fontWeight: 600}}>
                <span>{el.username}</span>
              </div>
              <div id="user-message" className="flex flex-row flex-grow w-full justify-between items-center">
                <span className={`${chatUser === null ? 'text-gray-600' : el.id === chatUser.id ? 'text-white' : "text-gray-600"}`}>Ini contoh pesan</span>
                {el.unread >= 1 ? 
                 <div id="unread-indicator" className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                   <span className="text-white text-xs">{el.unread}</span>
                 </div> : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className={`${chatUser === null ? 'text-blue-400' : el.id === chatUser.id ? "text-white" : "text-blue-400"} fill-current bi bi-check2-all`} viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                  </svg>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList;