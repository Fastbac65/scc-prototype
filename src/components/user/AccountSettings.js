import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useValue } from '../context/ContextProvider';
import { auth } from '../context/FireBase';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import ReAuth from './ReAuth';

const AccountSettings = () => {
  const {
    currentUser,
    dispatch,
    state: { modal, alert },
    reauthenticateInstagram,
  } = useValue();

  const [reAuth, setReAuth] = useState(false);
  const [userAction, setUserAction] = useState(false);
  const passwordRef = useRef();

  var provider = null;
  var isPassword = false;
  // check the auth method
  if (currentUser.providerData.length > 0) {
    // there is a providerID array for all except custom token (Insta)
    switch (currentUser.providerData[0].providerId) {
      case 'google.com': {
        provider = new GoogleAuthProvider();
        break;
      }
      case 'facebook.com': {
        provider = new FacebookAuthProvider();
        break;
      }
      case 'password': {
        isPassword = true;
        break;
      }

      default: {
        throw new Error('bad provider ID');
      }
    }
  } else provider = 'Instagram';

  //and only show change password if the method is 'password' (ie not Google etc)
  const handleChangeAccountSettings = async (action) => {
    if (isPassword) {
      // just set isPassword and the rest is managed in the submit
      setReAuth(true);
      setUserAction(action);
    } else {
      dispatch({ type: 'START_LOADING' });

      try {
        if (provider === 'Instagram') {
          await reauthenticateInstagram();
        } else {
          await reauthenticateWithPopup(currentUser, provider);
        }

        dispatch({ type: 'END_LOADING' });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'success', message: 'User credentials verified!', duration: 4000 },
        });

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
      //end of action with google or facebook or insta
    }
  };

  // handles the email/password re-auth in account settings window

  const handleSubmitAuth = async (e) => {
    dispatch({ type: 'START_LOADING' });
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      currentUser?.email || currentUser?.providerData[0]?.email,
      passwordRef.current.value
    );

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
      <DialogContent>
        <DialogContentText variant='caption'>
          These settings are specific to your account on South Curl Curl SLSC website.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        <Button
          sx={{ borderRadius: 25, color: userAction === 'Change Email' ? '#f9de00' : null }}
          variant='contained'
          onClick={() => handleChangeAccountSettings('Change Email')}
        >
          Change Email
        </Button>
        {isPassword && (
          <Button
            sx={{ borderRadius: 25, color: userAction === 'Change Password' ? '#f9de00' : null }}
            variant='contained'
            onClick={() => handleChangeAccountSettings('Change Password')}
          >
            Change Password
          </Button>
        )}
        <Button
          sx={{ borderRadius: 25, color: userAction === 'Delete Account' ? '#f9de00' : null }}
          variant='contained'
          onClick={() => handleChangeAccountSettings('Delete Account')}
        >
          Delete Account
        </Button>
      </DialogActions>
      <DialogContent>
        <DialogContentText variant='caption'>
          For security reasons you will need to provide credentials to change account settings! If you are logged in via
          social we will attempt to re-authenticate you via pop-up.
        </DialogContentText>
        {/* this from only appears if the re-auth is email/password - this method of passing props is new*/}
        <form onSubmit={handleSubmitAuth}>{reAuth && <ReAuth {...{ passwordRef }} />}</form>
      </DialogContent>
    </div>
  );
};

export default AccountSettings;
