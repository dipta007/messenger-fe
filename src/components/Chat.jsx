import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Grid } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { WS_URL } from '../lib/constants';

let socket;

function Chat() {
  const [msgs, setMsgs] = useState([]); 
  const [msg, setMsg] = useState('');
  const location = useLocation();
  const history = useHistory();

  const params = queryString.parse(location.search);
  const { room, id: username } = params;

  useEffect(() => {
    socket = io(WS_URL, { path: '/chat/socket.io' });
    
    socket.on('connect', () => {
      socket.emit('JoinRoom', { room: params.room, id: params.id }, (data) => {
        console.log("dddd", data)
        history.replace(`/chat?room=${data}&id=${username}`);
      })
    })
    return () => {
      socket.disconnect();
    }
  }, []);
  
  useEffect(() => {
    socket.on("Message", data => {
      console.log('tcl', data, msgs);
      setMsgs(msgs => [...msgs, data]);
    });
  }, [])

  const sendMessage = () => {
    const payload = { message: msg, username, room }
    socket.emit('Message', payload)
    setMsgs(msgs => [...msgs, payload])
    setMsg('')
  }

  console.log(msgs);

  const msgComponents = msgs.map(ele => (
    <Grid item>
      <strong>{ele.username}:</strong>
      {ele.message}
    </Grid>
  ));

  return (
    <Grid container>
      <Grid container direction="column">
        {msgComponents}
      </Grid>

      <input onChange={(e) => setMsg(e.target.value)} value={msg} />
      <button onClick={sendMessage}>Send</button>

    </Grid>
  );
}

export default Chat;
