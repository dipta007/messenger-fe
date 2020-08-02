import React from 'react'
import { Grid, TextField, Button, Paper, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  container: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.light,
  },
  input: {
    margin: theme.spacing(2),
  }
}))

function LogIn() {
  const [id, setId] = React.useState('');
  const [room, setRoom] = React.useState('');
  const history = useHistory();

  const login = () => {
    if (id && room) {
      history.replace(`/chat?room=${room}&id=${id}`)
    }
  }

  const classes = useStyle();
  return (
    <Grid container direction="row" xs={12} alignItems="center" justify="center" className={classes.container}>
      <Paper elevation={4} className={classes.paper}>
        <TextField label="ID" onChange={(e) => setId(e.target.value)} value={id} className={classes.input} />
        <TextField label="Room" onChange={(e) => setRoom(e.target.value)} value={room} className={classes.input} />
        <Button variant="contained" color="primary" onClick={login}>Log In</Button>
      </Paper>
    </Grid>
  )
}

export default LogIn
