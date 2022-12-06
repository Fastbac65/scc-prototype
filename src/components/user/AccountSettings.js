import { Email } from '@mui/icons-material';
import { Box, Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useValue } from '../context/ContextProvider';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import ReAuth from './ReAuth';

const AccountSettings = () => {
  const {
    currentUser,
    dispatch,
    state: { modal, alert },
  } = useValue();
  const [reAuth, setReAuth] = useState(false);
  const [userAction, setUserAction] = useState(false);
  const passwordRef = useRef();

  // check the auth method and only show change password if the method is 'password' (ie not Google etc)
  const isPassword = currentUser?.providerData[0].providerId === 'password'; // true or false

  const handleAction = async (action) => {
    if (isPassword) {
      setReAuth(true);
      setUserAction(action);
    } else {
      dispatch({ type: 'START_LOADING' });

      try {
        await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
        dispatch({ type: 'END_LOADING' });

        switch (action) {
          case 'Change Email': {
            //
            dispatch({
              type: 'MODAL',
              payload: { ...modal, title: 'Update Email', content: <ChangeEmail /> },
            });
            break;
          }
          case 'Change Password': {
            dispatch({
              type: 'MODAL',
              payload: { ...modal, title: 'Change Password', content: <ChangePassword /> },
            });
            break;
            //
          }
          case 'Delete Account': {
            dispatch({
              type: 'MODAL',
              payload: { ...modal, title: 'Delete Member Account', content: <DeleteAccount /> },
            });
            break;
            //
          }
          default:
            throw new Error('no matching action');
        }
      } catch (error) {
        dispatch({ type: 'END_LOADING' });

        console.log(error.message);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
        });
      }

      //do stuff
    }
  };

  const handleSubmitAuth = async (e) => {
    dispatch({ type: 'START_LOADING' });
    e.preventDefault();
    const credential = EmailAuthProvider.credential(currentUser?.email, passwordRef.current.value);

    try {
      //reauth password
      await reauthenticateWithCredential(currentUser, credential);
      dispatch({ type: 'END_LOADING' });

      switch (userAction) {
        case 'Change Email': {
          //
          dispatch({
            type: 'MODAL',
            payload: { ...modal, title: 'Update Email', content: <ChangeEmail /> },
          });
          break;
        }
        case 'Change Password': {
          dispatch({
            type: 'MODAL',
            payload: { ...modal, title: 'Change Password', content: <ChangePassword /> },
          });
          break;
          //
        }
        case 'Delete Account': {
          dispatch({
            type: 'MODAL',
            payload: { ...modal, title: 'Delete Member Account', content: <DeleteAccount /> },
          });
          break;
          //
        }
        default:
          throw new Error('no matching action');
      }
    } catch (error) {
      dispatch({ type: 'END_LOADING' });

      console.log(error.message);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
      });
    }
  };

  return (
    <div>
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        <Button
          sx={{ borderRadius: 25, color: userAction === 'Change Email' ? '#f9de00' : null }}
          variant='contained'
          onClick={() => handleAction('Change Email')}
        >
          Change Email
        </Button>
        {isPassword && (
          <Button
            sx={{ borderRadius: 25, color: userAction === 'Change Password' ? '#f9de00' : null }}
            variant='contained'
            onClick={() => handleAction('Change Password')}
          >
            Change Password
          </Button>
        )}
        <Button
          sx={{ borderRadius: 25, color: userAction === 'Delete Account' ? '#f9de00' : null }}
          variant='contained'
          onClick={() => handleAction('Delete Account')}
        >
          Delete Account
        </Button>
      </DialogActions>
      <DialogContent>
        <DialogContentText variant='caption'>
          For security reasons you will need to provide credentials to change account settings!
        </DialogContentText>
        <form onSubmit={handleSubmitAuth}>{reAuth && <ReAuth {...{ passwordRef }} />}</form>
      </DialogContent>
    </div>
  );
};

export default AccountSettings;
