import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@material-ui/core";
import axios from '../../../lib/axios';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function UserSearch({ isOpen, handleClose }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('')
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const findUser = async () => {
    try {
      const ret = await axios.post("/conversations/open", { name, username: email });
      if (ret?.data?._id) {
        handleClose();
        history.push(`/chat?room=${ret.data._id}`);
      } else {
        enqueueSnackbar('User Not Found', { variant: 'warning' })
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Find your Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Type in the conversation name and friends email address
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          label="Conversation Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={findUser} color="primary">
          Find
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserSearch;
