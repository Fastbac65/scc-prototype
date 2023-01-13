import { Button, DialogActions, DialogContent, DialogContentText, Modal, TextField } from '@mui/material';
import { useRef } from 'react';
import PasswordField from './PasswordField';
import SendIcon from '@mui/icons-material/Send';
import { useValue } from '../context/ContextProvider';
import { updatePassword } from 'firebase/auth';
import { auth } from '../context/FireBase';

const ChangePassword = () => {
  const {
    currentUser,
    dispatch,
    state: { alert, modal },
  } = useValue();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'START_LOADING' });
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    try {
      if (password !== confirmPassword) throw new Error('Passwords do not match!');
      await updatePassword(currentUser, password);
      dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Password succesfully updated!',
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
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* <DialogContentText>New password:</DialogContentText> */}
        <PasswordField sx={{ mb: 2 }} size='small' inputRef={passwordRef} label='New Password' />
        {/* <DialogContentText>Confirm new password:</DialogContentText> */}
        <PasswordField size='small' inputRef={confirmPasswordRef} label='Confirm Password' />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
export default ChangePassword;
