import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import { getContact } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import { useStore } from '../../../utilities/store';


function ChatList({loading, contacts}) {

  // const [loading, setLoading] = useState(true);
  // const [contacts, setContacts] = useState([]);
  const setClicked = useStore(state => state.setClicked);
  const clickedData = useStore(state => state.clickedData);
  const clicked = useStore(state => state.clicked);

  // useEffect(() => {
  //   getContact(getCookie('token'))
  //   .then(res => {
  //     setContacts(res.data.users);
  //     setLoading(false);   
  //   })
  // }, [])

  return (
    <div id="left-content-wrapper" className="flex-grow h-auto flex flex-col space-y-4" style={{fontFamily: ['Inter', 'sans-serif']}}>
      <div id="title" className="w-full h-auto flex items-center justify-start">
        <span className="text-gray-600 text-lg" style={{fontWeight: 600}}>Contacts</span>
      </div>
      <div id="chat-list" className="flex-grow h-full bg-white shadow-md rounded flex flex-col overflow-auto">
        {loading ? 
          <div>

          </div>
          : 
          
            contacts.map((el, idx) => (
              <button key={idx} id="contact-user" onClick={() => {
                setClicked(el)
                // console.log(clickedData.id);
              }} className={`focus:outline-none h-24 hover:bg-blue-100 transition-colors duration-300 ${clicked ? (clickedData.id === el.id ? "bg-blue-200" : 'bg-white') : 'bg-white text-gray-600'} text-gray-600 p-4 flex flex-row space-x-4 items-center`}>
                {/* <div id="left-wrapper" className="flex h-full w-full items-center"> */}
                  <img src={el.avatar} className="rounded-full h-12 w-12" />
                {/* </div> */}
                <div id="right-wrapper" className="flex flex-col h-12 w-full items-start justify-between">
                  <span style={{fontWeight: 600}}>{el.first_name}</span>
                  <span>Pesan</span>
                </div>
              </button>
            ))
          }
      </div>
    </div>
  )
}

export default ChatList;