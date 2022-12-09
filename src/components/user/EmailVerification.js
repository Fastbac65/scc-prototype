import { Alert, Button, Box } from '@mui/material';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useValue } from '../context/ContextProvider';

const EmailVerification = () => {
  const {
    currentUser,
    dispatch,
    state: { alert },
  } = useValue();

  const [isClicked, setIsClicked] = useState(false);

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
    currentUser?.emailVerified === false && (
      <Box>
        {/* <Collapse in={open}> */}
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
          Hi {currentUser?.displayName}. Please verify your email:&nbsp;{currentUser?.email}&nbsp;
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
        {/* </Collapse> */}
      </Box>
    )
  );
};
export default EmailVerification;
