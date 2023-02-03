import { Button, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useValue } from '../context/ContextProvider';
import { sendEmailVerification, updateEmail } from 'firebase/auth';

const ChangeEmail = () => {
  const {
    dispatch,
    currentUser,
    state: { alert, modal },
  } = useValue();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    dispatch({ type: 'START_LOADING' });
    try {
      await updateEmail(currentUser, email);
      await sendEmailVerification(currentUser);

      dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message:
            'Your email has been updated. A verification email has been sent to your new email address. Your access will be restricted until you are verified',
          // message: 'Email succesfully updated!',
          duration: 4000,
        },
      });
    } catch (error) {
      console.log(error.message);
      let errorMsg = '';
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        //
        errorMsg =
          'An account with this email already exists. You may already have another account using a different sign in method.';
      } else if (error.message === 'Firebase: Error (auth/requires-recent-login).') {
        //
        errorMsg = 'For security reasons a recent reauthentication is required. Please restart the update process';
      }

      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: errorMsg, duration: 6000 },
      });
    }

    dispatch({ type: 'END_LOADING' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ minWidth: 350, justifyContent: 'center' }}>
        {/* <DialogContentText noWrap> Email:&nbsp; </DialogContentText> */}
        <TextField
          color='info'
          fullWidth
          size='small'
          inputRef={emailRef}
          defaultValue={currentUser?.email || currentUser?.providerData[0]?.email}
          label='New Email'
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Button type='submit' sx={{ mb: 1, borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
        <Typography variant='caption'>Each account must have a unique email.</Typography>
      </DialogActions>
    </form>
  );
};
export default ChangeEmail;
