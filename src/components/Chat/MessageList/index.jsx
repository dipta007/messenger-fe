import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import useSWR, { mutate } from "swr";
import "./MessageList.css";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { TextField } from "@material-ui/core";
import { WS_URL, WS_PATH } from "../../../lib/constants";

let socket;

export default function MessageList() {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState("");
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { room } = params;
  const { data: messages } = useSWR(room ? `/message/all/${room}` : null);
  const { data: roomDetails } = useSWR(
    room ? `conversations/get/${room}` : null
  );
  const MY_USER_ID = localStorage.getItem("userId");
  const ref = useRef(null);

  useEffect(() => {
    setMsgs(messages || []);
  }, [messages]);

  useEffect(() => {
    if (ref) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  useEffect(() => {
    if (room) {
      // socket = io(WS_URL, { path: WS_PATH });
      socket = io(WS_URL, { path: WS_PATH });

      socket.on("connect", () => {
        socket.emit("JoinRoom", { room, id: MY_USER_ID }, (roomId) => {
          history.replace(`/chat?room=${roomId}`);
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [room]);

  useEffect(() => {
    if (room) {
      socket.on("Message", (payload) => {
        console.log("Got msg", payload);
        setMsgs((msgs) => [...msgs, payload]);
      });
    }
  }, [room]);

  const sendMessage = (e) => {
    e.preventDefault();
    const payload = { message: msg, sender: MY_USER_ID, roomId: room };
    console.log("sent msg payload", payload);
    socket.emit("Message", payload);
    setMsg("");
    setMsgs((msgs) => [...msgs, payload]);
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = (msgs || []).length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = msgs[i - 1];
      let current = msgs[i];
      let next = msgs[i + 1];
      let isMine = current.sender === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.sender === current.sender;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.sender === current.sender;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title={roomDetails?.name}
        rightItems={[
          <ToolbarButton
            key="info"
            icon="ion-ios-information-circle-outline"
          />,
          // <ToolbarButton key="video" icon="ion-ios-videocam" />,
          // <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]}
      />
      <div className="message-list-container">
        {room ? renderMessages() : <p>Select a conversation from left side.</p>}
        <div style={{ float: "left", clear: "both" }} ref={ref} />
      </div>

      <form className="compose" onSubmit={sendMessage}>
        <TextField
          fullWidth
          placeholder="Type your message...."
          className="box-input"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
      </form>

      {/* <Compose
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
      /> */}
    </div>
  );
}
