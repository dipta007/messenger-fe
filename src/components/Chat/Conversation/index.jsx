import React from 'react'
import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui';

function Conversation() {
  const [messages, setMessages] = React.useState([]);
  return (
    <ChatFeed
        showSenderName
        messages={messages}
        showSenderName
      />
  )
}

export default Conversation
