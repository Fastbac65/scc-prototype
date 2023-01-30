import { Alert, Button, Box } from '@mui/material';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useValue } from '../context/ContextProvider';
import { auth } from '../context/FireBase';
import AccountSettings from './AccountSettings';

const EmailVerification = () => {
  const {
    currentUser,
    dispatch,
    state: { alert, modal },
  } = useValue();

  const [isClicked, setIsClicked] = useState(false);

  const accountSettings = () => {
    setIsClicked(true);
    dispatch({
      type: 'MODAL',
      payload: {
        ...modal,
        open: true,
        title: 'Update Account',
        content: <AccountSettings />,
      },
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
          message:
            'Verification email sent, please click on verify link in your email. You will be re-directed back here with full access to SCC Members!',
          duration: 10000,
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
    currentUser &&
    auth?.currentUser?.emailVerified === false && (
      // auth.currentUser will be updated after email verification process via reload(auth.currentUser)
      // unless we write the code currentUser maybe out of sync..   not sure yet as the clone process was a reference base
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
            {isClicked
              ? `Verification email sent! Please check your email to complete account setup. `
              : `Members access restricted! Please verify your email to complete account setup: ${currentUser?.email} `}
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
            Members access restricted. Please update and verify your email to complete account setup.&nbsp;
            <Button
              variant='contained'
              size='small'
              onClick={accountSettings}
              // disabled={isClicked} //avoid double click or is disabled
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
