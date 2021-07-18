import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import { useStore } from '../../../utilities/store';
import { getContact, getMessage } from '../../../apis/api';
// import { useStore } from '../../../utilities/store';
import { getCookie } from '../../../utilities/obtain_cookie';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const setUnclicked = useStore(state => state.setUnclicked)
  const clicked = useStore(state => state.clicked);
  const clickedData = useStore(state => state.clickedData);
  // const currentUserID = useStore(state => state.currentUserID);

  const updateContacts = bool => {
    getContact(getCookie('token'))
      .then(res => {
        setContacts(res.data.users);
        if (bool) {
          setLoading(false);
        }
      })
  }

  useEffect(() => {
    updateContacts(true);

    const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
      cluster: process.env.MIX_PUSHER_APP_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      getMessage(getCookie('token'), data.to)
      .then(res => setMessages(res.data.messages))

      updateContacts(false);
      // console.log(data)
    })
    // console.log(process.env.MIX_PUSHER_APP_KEY, process.env.MIX_PUSHER_APP_CLUSTER)

    return () => {
      setUnclicked()
    }
  }, [])

  useEffect(() => {
    if (clicked) {
      getMessage(getCookie('token'), clickedData.id)
        .then(res => setMessages(res.data.messages))
    }
  }, [clickedData])

  return (
    <div id="dashboard-content" className="px-16 py-10 ml-20 h-full flex flex-col">
      <Header page="Chat" />
      <div id="page-content" className="w-full flex flex-row space-x-8">
        <ChatList loading={loading} contacts={contacts} />
        <ChatBox loading={loading} messages={messages} />
      </div>
    </div>
  )
}

export default Chat;