import React from 'react';
import Header from '../../Header';


function Chat() {
  return (
    <div id="dashboard-content" className="px-16 py-10 ml-20 h-full flex flex-col">
      <Header page="Chat" />
      <div id="page-content" className="w-full h-full flex flex-row px-16 py-10">
        <span>Chat App</span>
        
      </div>
    </div>
  )
}

export default Chat;