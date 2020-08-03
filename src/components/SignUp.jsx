import React from "react";
import { Grid, TextField, Button, Paper, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "../lib/axios";
import { useSnackbar } from "notistack";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.light,
  },
  input: {
    margin: theme.spacing(2),
  },
}));

function SignUp() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const signup = async () => {
    if (name && username && password) {
      try {
        await axios.post("/signup", {
          name,
          username,
          password,
        });
        history.push('/');
      } catch (err) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Please provide all the fields", { variant: "warning" });
    }
  };

  const classes = useStyle();
  return (
    <Grid
      container
      direction="row"
      xs={12}
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Paper elevation={4} className={classes.paper}>
        <TextField
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={classes.input}
        />
        <TextField
          label="Email"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={classes.input}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={classes.input}
        />
        <Button variant="contained" color="primary" onClick={signup}>
          Sign Up
        </Button>
      </Paper>
    </Grid>
  );
}

export default SignUp;
