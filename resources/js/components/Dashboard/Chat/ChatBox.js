import React, { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { useStore } from '../../../utilities/store';
import { sendMessageAPI } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';


function ChatBox({messages}) {
  const chatUser = useStore(state => state.chatUser);
  // const messages = useStore(state => state.messages);
  const loading = useStore(state => state.messageLoading);
  const currentUserID = useStore(state => state.currentUserID);

  const [message, setMessage] = useState('');

  const messageHandle = e => {
    setMessage(e.target.value);
  }  

  const sendMessage = () => {
    var formData = new FormData();
    formData.append('from', currentUserID)
    formData.append('receiver_id', chatUser.id);
    formData.append('message', message)

    sendMessageAPI(getCookie('token'), formData)
    .then(res => console.log(res.data))

    setMessage('')
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        sendMessage()
      }
    }

    window.addEventListener('keydown', listener);

    return () => window.removeEventListener('keydown', listener);
  }, [message])

  return (
    <div id="chatbox-container" className="flex-grow bg-white shadow-md rounded" style={{fontFamily: ['Inter', 'sans-serif']}}>
      {chatUser === null ? 
        <div id="empty-chat" className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Select chat to start messaging</span>
        </div> :
        <>
          <div id="current-user-chat-with" className="w-full h-20 border-1 border-gray-200 flex items-center justify-between flex-row px-6">
            <div id="left-details" className="flex flex-row h-full items-center space-x-4">
              <img src={chatUser.avatar} className="h-14 w-14 rounded-full object-cover bg-white" />
              <span className="text-gray-600 text-xl" style={{ fontWeight: 600 }}>{chatUser.first_name}</span>
            </div>
          </div>
          <div id="chatbox" className="w-full" style={{ height: 677 + 'px' }}>
            {/* {userMessages(chatUser.id)} */}
            { loading ? 
              <div id="loading" className="w-full h-full flex items-center justify-center text-gray-400">
                <span>Fetching Messages from Server</span>
              </div> :
              <div className="flex flex-col w-full h-full overflow-auto scrollbar px-4 py-2 space-y-4">
                {messages.map((el, idx) => (
                <div key={idx} id="chat-bubble-container" className={`w-full flex items-center ${el.from == currentUserID ? 'justify-end' : 'justify-start'}`}>
                  <div id="chat-bubble-wrapper" className="max-w-7xl h-auto flex flex-row items-center space-x-4">
                    {el.from === currentUserID ?
                    <>
                      <div className="w-full h-auto text-left bg-gray-100 p-2 rounded">
                        <span>{el.message}</span>
                      </div>
                      <img src={el.from === currentUserID ? null : chatUser.avatar} className="h-12 w-12 rounded-full object-cover"/> 
                    </> : 
                    <>
                      <img src={el.from === currentUserID ? null : chatUser.avatar} className="h-12 w-12 rounded-full object-cover" />
                      <div className="w-full h-auto text-left bg-blue-400 p-2 rounded text-white">
                        <span>{el.message}</span>
                      </div>
                    </>}
                  </div>
                </div>
                ))}
                {/* {console.log(messages)} */}
              </div>
            }
          </div>
          <div id="message-box" className="w-full h-14 bg-gray-100 flex flex-row justify-between items-center text-gray-600">
            <input placeholder="Type any message here..." className="px-4 focus:outline-none bg-transparent w-full h-full" value={message} onChange={messageHandle}/>
            <div id="send-button" className="px-4 h-full items-center justify-center flex cursor-pointer" onClick={() => sendMessage()}>
              <IconContext.Provider value={{ color: '#60A5FA', size: 1.5 + 'em' }}>
                <RiSendPlaneFill />
              </IconContext.Provider>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default ChatBox;