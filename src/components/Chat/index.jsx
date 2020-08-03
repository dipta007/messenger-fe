import React from "react";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import "./Messenger.css";

export default function Messenger(props) {
  const [selectedConversation, setSelectedConversation] = React.useState(null);
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList setSelectedConversation={setSelectedConversation} />
      </div>

      <div className="scrollable content">
        <MessageList selectedConversation={selectedConversation} />
      </div>
    </div>
  );
}
