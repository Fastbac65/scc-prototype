import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useValue } from '../context/ContextProvider';
import { updateEmail } from 'firebase/auth';

const ChangeEmail = () => {
  const {
    dispatch,
    state: { alert, modal, currentUser },
  } = useValue();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    dispatch({ type: 'START_LOADING' });
    try {
      await updateEmail(currentUser, email);
      dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Email succesfully updated!',
          duration: 4000,
        },
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
      });
    }

    dispatch({ type: 'END_LOADING' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <DialogContentText>Current email:&nbsp; </DialogContentText>
        <TextField size='small' inputRef={emailRef} defaultValue={currentUser.email} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
export default ChangeEmail;
