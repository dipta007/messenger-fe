import React, { useEffect } from "react";
import shave from "shave";

import "./ConversationListItem.css";

export default function ConversationListItem({
  id,
  photo,
  name,
  text,
  setSelectedConversation,
}) {
  useEffect(() => {
    shave(".conversation-snippet", 20);
  });

  return (
    <div
      className="conversation-list-item"
      onClick={() => setSelectedConversation(id)}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  );
}
