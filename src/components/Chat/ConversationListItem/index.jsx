import React, { useEffect } from "react";
import shave from "shave";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import "./ConversationListItem.css";

export default function ConversationListItem({ id, photo, name, text }) {
  useEffect(() => {
    shave(".conversation-snippet", 20);
  });

  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { room } = params;

  return (
    <div
      className={`conversation-list-item ${room === id ? 'active' : ''}`}
      onClick={() => history.push(`/chat?room=${id}`)}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  );
}
