import React, { useEffect, useState } from 'react';
import { sendMessageAPI } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import { useStore } from '../../../utilities/store';


function ChatBox({messages}) {

  const clicked = useStore(state => state.clicked);
  const currentData = useStore(state => state.currentData);
  const clickedData = useStore(state => state.clickedData);
  const [message, setMessage] = useState('');

  const handleMessage = e => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {
    const formData = new FormData();
    formData.append('from', currentData.id)
    formData.append('receiver_id', clickedData.id)
    formData.append('message', message);

    sendMessageAPI(getCookie('token'), formData)
    .then(res => console.log(res))

    setMessage('');
  }

  useEffect(() => {
    const listener = e => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault()
        sendMessage()
      }
    }

    window.addEventListener('keydown', listener);

    return () => window.removeEventListener('keydown', listener);
  }, [message])

  return (
    <div id="chat-box" className="w-3/4 h-full bg-white shadow-md rounded flex flex-col justify-between" style={{fontFamily: ['Inter', 'sans-serif']}}>
      {clicked ? 
        <>
          <div id="user" className="w-full border-b-1 border-gray-100 h-20 flex flex-row items-center px-4">
            <img src={clickedData.avatar} className="rounded-full h-12 w-12 object-cover mr-2" />
            <span className="text-gray-600 text-lg" style={{ fontWeight: 600 }} >{clickedData.first_name} {clickedData.last_name}</span>
          </div>
          <div id="messages-container" className="flex flex-col w-full px-6 pt-4 pb-8 space-y-2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-gray-100" style={{height: 684}}>
            {messages.map((el, idx) => (
              el.from == currentData.id ? 
              <div id="message-box" className="flex flex-row w-full h-auto justify-end items-start space-x-4">
                <div id="message-bubble" className="max-w-2xl min-h-14 px-4 flex items-center rounded bg-white bg-blue-200">
                  {el.message}
                </div>
                <img src={currentData.avatar} className="h-12 w-12 rounded-full object-cover" />
              </div> : 
              <span>uh!</span>
            ))}
          </div>
        </> :
        <span></span>
      }
      <div id="input-wrapper" className="flex flex-row h-12 w-full bg-gray-100 items-center justify-between">
        <input value={message} onChange={handleMessage} className="h-full w-full focus:outline-none px-4 bg-transparent" placeholder="Type a message..."/>
        <button id="send-button" className="h-auto w-auto pr-4" onClick={sendMessage}>
          <svg enableBackground="new 0 0 24 24" height="24" className="text-blue-400 fill-current" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z" /><path d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatBox;