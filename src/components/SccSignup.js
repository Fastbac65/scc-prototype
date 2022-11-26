import { Box, Button, Card, CardHeader, CardMedia, Grid, TextField, Stack } from '@mui/material';
import { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import scc2 from '../static/imgs/scc-pool-waves.jpeg';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { styled } from '@mui/material/styles';
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import { useValue } from './context/ContextProvider';
import { async } from '@firebase/util';

const RButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
}));

const SccSignup = () => {
  const navigate = useNavigate();
  const fnameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [fnameErr, setFnameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [height, setHeight] = useState(0);
  const {
    state: { alert },
    dispatch,
    signInGoogle,
  } = useValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const fname = fnameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    setFnameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setConfirmPasswordErr(false);

    if (email && password) console.log(email, password);

    !fname && setFnameErr(true);
    !email && setEmailErr(true);
    !password && setPasswordErr(true);
    !confirmPassword && setConfirmPasswordErr(true);

    if (!fname || !email || !password || !confirmPassword) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: 'Please fill in all required fields', duration: 3000 },
      });
    }
  };

  const useGoogle = () => {
    signInGoogle()
      .then((res) => {
        navigate('/');
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { open: true, severity: 'success', message: 'Login Successful!!', duration: 6000 },
        });
      })
      .catch((error) => console.log(error));
  };
  // get the size of the image to the right of login
  const handleOnload = (e) => {
    setHeight(e.target.offsetHeight);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Card sx={{ height: { height }, minHeight: 660 }}>
              <CardHeader
                title='Members Access'
                action={
                  <RButton component={RouterLink} to='/login' startIcon={<LoginIcon />}>
                    Existing Member
                  </RButton>
                }
              />

              <Stack spacing={2} py={4} sx={{ width: '80%', ml: 5 }}>
                <TextField label='Full Name' required error={fnameErr} inputRef={fnameRef} />
                <TextField label='Email' required error={emailErr} inputRef={emailRef} />
                <TextField label='Password' type='password' required error={passwordErr} inputRef={passwordRef} />
                <TextField
                  label='Confirm Password'
                  type='password'
                  required
                  error={confirmPasswordErr}
                  inputRef={confirmPasswordRef}
                />
              </Stack>

              <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
                <RButton type='submit' variant='contained' startIcon={<AppRegistrationIcon />}>
                  Sign Up with Email
                </RButton>
              </Box>
              <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
                <Stack sx={{ pb: 4, width: '40%' }}>
                  <FacebookLoginButton style={{ fontSize: '14px' }} align='center' size='40px' />
                  <GoogleLoginButton style={{ fontSize: '14px' }} align='center' size='40px' onClick={useGoogle} />
                  <InstagramLoginButton style={{ fontSize: '14px' }} align='center' size='40px' />
                </Stack>
              </Box>
            </Card>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia onLoad={handleOnload} sx={{ opacity: 0.6 }} component='img' src={scc2} alt='scc-ocean' />
        </Grid>
      </Grid>
    </>
  );
};

export default SccSignup;
