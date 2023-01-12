import { Alert, Button, Box } from '@mui/material';
import { sendEmailVerification } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useValue } from '../context/ContextProvider';
import { auth } from '../context/FireBase';
import useFirestoreGetUser from '../context/useFirestoreGetUser';
import AccountSettings from './AccountSettings';

const EmailVerification = () => {
  const {
    currentUser,
    login,
    dispatch,
    state: { alert, modal },
  } = useValue();

  const [emailVerified, setEmailVerified] = useState(auth?.currentUser?.emailVerified);
  // const userDoc = useFirestoreGetUser();
  console.log('auth.user', emailVerified, auth?.currentUser?.emailVerified);

  useEffect(() => {
    //
    if (auth?.currentUser?.emailVerified !== undefined) {
      setEmailVerified(auth?.currentUser?.emailVerified);
      console.log('update current user now', auth?.currentUser?.emailVerified);
    }
    console.log('setEmail', auth?.currentUser?.emailVerified);
  }, [auth.currentUser]);

  // useEffect(() => {
  //   console.log(
  //     'current user email verified state:',
  //     currentUser?.emailVerified,
  //     emailVerified,
  //     currentUser.uRole?.email
  //   );
  // }, [currentUser, currentUser.uRole?.email]);

  const [isClicked, setIsClicked] = useState(false);

  const accountSettings = () => {
    dispatch({
      type: 'MODAL',
      payload: { ...modal, open: true, title: 'Update Account', content: <AccountSettings /> },
    });
  };

  const verify = async () => {
    setIsClicked(true);
    dispatch({ type: 'START_LOADING' });

    try {
      await sendEmailVerification(currentUser);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Verification email sent, please follow instructions in your email',
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

    //
  };
  return (
    login &&
    currentUser?.emailVerified === false && (
      // emailVerified === false && (
      <Box>
        {/* <Collapse in={open}> */}
        {currentUser?.email !== null && (
          <Alert
            severity='warning'
            // action={
            //   <IconButton
            //     aria-label='Close'
            //     size='small'
            //     onClick={() => {
            //       setOpen(false);
            //     }}
            //   >
            //     <Close fontSize='inherit' />
            //   </IconButton>
            // }
            sx={{ pt: 2 }}
          >
            Hi {currentUser?.displayName}. Please verify your email:&nbsp;{' '}
            {currentUser?.email || currentUser?.providerData[0]?.email} &nbsp;
            <Button
              variant='contained'
              size='small'
              onClick={verify}
              disabled={isClicked} //avoid double click
              sx={{ lineHeight: 'initial', color: '#f9de00' }}
            >
              Verify Now
            </Button>
          </Alert>
        )}
        {currentUser?.email === null && (
          <Alert
            severity='warning'
            // action={
            //   <IconButton
            //     aria-label='Close'
            //     size='small'
            //     onClick={() => {
            //       setOpen(false);
            //     }}
            //   >
            //     <Close fontSize='inherit' />
            //   </IconButton>
            // }
            sx={{ pt: 2 }}
          >
            Hi {currentUser?.displayName}. Please update your email in 'My Account' then verify your email &nbsp;
            <Button
              variant='contained'
              size='small'
              onClick={accountSettings}
              // disabled={true} //avoid double click
              sx={{ lineHeight: 'initial', color: '#f9de00' }}
            >
              My Account
            </Button>
          </Alert>
        )}
        {/* </Collapse> */}
      </Box>
    )
  );
};
export default EmailVerification;
