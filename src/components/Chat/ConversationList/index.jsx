import React, { useState, useEffect } from "react";
// import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import axios from "../../../lib/axios";
import UserSearch from "../UserSearch";
import "./ConversationList.css";

export default function ConversationList({ setSelectedConversation }) {
  const [conversations, setConversations] = useState([]);
  const [userSearchView, setUserSearchView] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      const response = await axios.get("/conversations/list");
      let newConversations = response?.data?.map((result) => {
        return {
          id: result._id,
          photo:
            result?.picture?.large ||
            "https://pbs.twimg.com/profile_images/857490466572443648/c05JqEgo.jpg",
          name: `${result.name}`,
          text: "",
        };
      });
      if (newConversations) {
        setConversations([...conversations, ...newConversations]);
      }
    };
    
    getConversations();
  }, []);

  

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          // <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" onClick={() => setUserSearchView(true)} />,
        ]}
      />
      {/* <ConversationSearch /> */}
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.name}
          {...conversation}
          setSelectedConversation={setSelectedConversation}
        />
      ))}

      <UserSearch isOpen={userSearchView} handleClose={() => setUserSearchView(false)} />
    </div>
  );
}
