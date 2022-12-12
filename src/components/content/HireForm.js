import { useState, useRef } from 'react';
import { Box, Button, Card, CardHeader, CardMedia, Grid, TextField, Stack } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { useValue } from '../context/ContextProvider';

const HireForm = () => {
  // const navigate = useNavigate();
  const {
    dispatch,
    state: { alert },
  } = useValue();
  const fnameRef = useRef('');
  const mobileRef = useRef('');
  const emailRef = useRef('');
  const confirmEmailRef = useRef('');
  const [fnameErr, setFnameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [confirmEmailErr, setConfirmEmailErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fname = fnameRef.current.value;
    const mobile = mobileRef.current.value;
    const email = emailRef.current.value;
    const confirmEmail = confirmEmailRef.current.value;
    setFnameErr(false);
    setEmailErr(false);
    setConfirmEmailErr(false);

    // if (email && password) console.log(email, password);
    //user feedback on empty fields - can be enhanced later to test password strength for example
    !fname && setFnameErr(true);
    !email && setEmailErr(true);
    !confirmEmail && setConfirmEmailErr(true);

    try {
      //check for empty fields
      if (!fname || !email || !mobile || !confirmEmail) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: 'Please fill in all required fields',
            duration: 3000,
          },
        });
        //check email match
      } else if (email !== confirmEmail) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: 'Emails do not match!!',
            duration: 3000,
          },
        });
        //send details somewhere
      } else {
        dispatch({ type: 'END_LOADING' });

        // navigate(-1);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'success',
            message: "We'll be back to you in in a tick",
            duration: 6000,
          },
        });
      }
    } catch (error) {
      dispatch({ type: 'END_LOADING', loading: false });
      console.log(error.message);
    }
  };

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Card sx={{ background: 'none', boxShadow: 0 }}>
          <Box sx={{ pb: 1, display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2} py={1} sx={{ width: '80%' }}>
              <Box spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  color='secondary'
                  size='small'
                  label='Full Name'
                  required
                  error={fnameErr}
                  inputRef={fnameRef}
                />
                <TextField
                  color='secondary'
                  size='small'
                  label='Mobile Number'
                  error={mobileErr}
                  inputRef={mobileRef}
                />
              </Box>

              <TextField color='secondary' size='small' label='Email' required error={emailErr} inputRef={emailRef} />
              <TextField
                color='secondary'
                size='small'
                label='Confirm Email'
                type='text'
                required
                error={confirmEmailErr}
                inputRef={confirmEmailRef}
              />
            </Stack>
          </Box>

          <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ borderRadius: 25 }} type='submit' variant='contained' startIcon={<AppRegistrationIcon />}>
              Submit
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};
export default HireForm;
