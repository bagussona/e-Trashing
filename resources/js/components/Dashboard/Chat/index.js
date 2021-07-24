import React, { useEffect, useState } from 'react';
import { useStore } from '../../../utilities/store';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import Header from '../../Header';
import Pusher from 'pusher-js';
import { getContacts, getMessage } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';


function Chat() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatUser = useStore(state => state.chatUser);
  // const setMessages = useStore(state => state.setMessages);
  const setMessageLoading = useStore(state => state.setMessageLoading);
  // const [initialArray, setInitialArray] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getContacts(getCookie('token'))
    .then(res => {
      setContacts(res.data.users);
      setLoading(false);      
    })
    const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
      cluster: process.env.MIX_PUSHER_APP_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      setMessages(currentMessages => [...currentMessages, data])
    })
  }, [])

  useEffect(() => {
    chatUser === null ? 'null' : getMessage(getCookie('token'), chatUser.id).then(res => {
      setMessages(res.data.messages)
      setMessageLoading(false);
    })
  }, [chatUser])
  
  // useEffect(() => console.log(chatUser));

  return (
    <div id="dashboard-content" className="px-16 py-10 ml-20 h-full flex flex-col">
      <Header page="Chat App" />
      <div id="page-content" className="w-full flex-grow flex flex-row space-x-8">
        {
          loading ? <div>Loading</div> :
          <>
            <ChatList contacts={contacts} />
            <ChatBox messages={messages} />
          </>
        }
      </div>
    </div>
  )
}

export default Chat;