import { Button, DialogActions, DialogContent } from '@mui/material';
import { useRef } from 'react';
import PasswordField from './PasswordField';
import SendIcon from '@mui/icons-material/Send';
import { useValue } from '../context/ContextProvider';
import { checkActionCode, confirmPasswordReset } from 'firebase/auth';
import { auth } from '../context/FireBase';
import { useNavigate } from 'react-router-dom';

const ResetPasswordVerification = ({ oobCode }) => {
  const {
    dispatch,
    state: { alert, modal },
  } = useValue();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  // https://192.168.0.220:3000/verify?mode=passwordReset&oobCode=Lm7KiYbREzAJqAOCkN6CBnyhd5ALHANZpzrwnOZkUPgAAAGFq6_Jmw&apiKey=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&lang=en
  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      // password error boundary

      if (password !== confirmPassword) throw new Error('Passwords do not match!');
      if (password.length < 8) throw new Error('Passwords must be a minimum of 8 characters!');
      dispatch({ type: 'START_LOADING' });
      try {
        // oobCode error boundary
        const result = await checkActionCode(auth, oobCode);
        await confirmPasswordReset(auth, oobCode, password);
        dispatch({ type: 'END_LOADING' });
        console.log(result);
        // console.log(auth.currentUser);
        // console.log(currentUser);
        dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'success',
            message: 'Your password has been updated. You can login now!',
            duration: 8000,
          },
        });
        navigate('/login');
      } catch (error) {
        console.log(error.message, error);
        dispatch({ type: 'MODAL', payload: { ...modal, open: false } });

        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: `SCC authentication error: ${error.code}. Your email link seems to have expired. Please re-start the recovery process!`,
            duration: 8000,
          },
        });
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message, error);

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'error',
          message: error.message,
          duration: 4000,
        },
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
export default ResetPasswordVerification;
