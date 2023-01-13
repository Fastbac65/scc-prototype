import { Button, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { useRef } from 'react';
import { useValue } from '../context/ContextProvider';
import SendIcon from '@mui/icons-material/Send';

const ResetPassword = () => {
  const {
    dispatch,
    state: { alert, modal },
    resetPassword,
  } = useValue();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'START_LOADING' });
    try {
      await resetPassword(emailRef.current.value);
      console.log('Reset password email sent!');
      //close the modal
      dispatch({ type: 'MODAL', payload: { ...modal, open: false } });

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Reset link sent to your inbox, please check your email',
          duration: 5000,
        },
      });
    } catch (error) {
      console.log(error, error.message);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'error',
          message: error.message,
          duration: 5000,
        },
      });
    }
    dispatch({ type: 'END_LOADING' });
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ minWidth: 350 }}>
        <TextField color='secondary' size='small' fullWidth inputRef={emailRef} label='Email' />
        <DialogContentText mt={1}>Please confirm your email address:</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type='submit' sx={{ mb: 2, borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
export default ResetPassword;
