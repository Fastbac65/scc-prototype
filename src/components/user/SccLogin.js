import { Box, Button, Card, CardHeader, CardMedia, Grid, TextField, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import scc2 from '../../static/imgs/scc-pool-waves.jpeg';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { styled } from '@mui/material/styles';
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import { useValue } from '../context/ContextProvider';
import Content2Cards from '../content/Content2Cards';
import PasswordField from './PasswordField';
import ResetPassword from './ResetPassword';

const RButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
}));

const SccLogin = () => {
  const {
    state: { alert, modal },
    dispatch,
    signInGoogle,
    signInFacebook,
    signInInstagram,
    signInEmail,
  } = useValue();

  const navigate = useNavigate();

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [height, setHeight] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setEmailErr(false);
    setPasswordErr(false);

    !email && setEmailErr(true);
    !password && setPasswordErr(true);
    password.length < 8 && setPasswordErr(true);

    try {
      if (emailErr || passwordErr || password.length < 8) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: 'Please check all required fields',
            duration: 3000,
          },
        });
      } else {
        await signInEmail(email, password);
        navigate('/');
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'success',
            message: 'Login Successful - Welcome back!',
            duration: 6000,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'error',
          message:
            'Login unsuccessful : ' + error.code + '. Please use "FORGOT PASSWORD" to recover your membership access',
          duration: 10000,
        },
      });
    }
  };

  const handleResetPassword = () => {
    //
    dispatch({
      type: 'MODAL',
      payload: { ...modal, open: true, content: <ResetPassword />, title: 'Forgot Password' },
    });
  };

  const useGoogle = async () => {
    try {
      await signInGoogle();
      navigate(-1);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'success', message: 'Welcome to SCC Members!!', duration: 6000 },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 6000 },
      });
    }
  };

  const useFacebook = async () => {
    try {
      await signInFacebook();

      navigate(-1);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'success', message: 'Welcome to SCC Members!!', duration: 6000 },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 6000 },
      });
    }
  };

  const useInstagram = async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      await signInInstagram();
      navigate(-1);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'success', message: 'Welcome to SCC Members!!', duration: 6000 },
      });
      dispatch({ type: 'END_LOADING' });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 6000 },
      });
      dispatch({ type: 'END_LOADING' });
    }
  };

  const handleOnload = (e) => {
    setHeight(e.target.offsetHeight);
    console.log('image height', e.target.offsetHeight);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Card sx={{ height: { height }, minHeight: 500 }}>
              <CardHeader
                title='Members Login'
                action={
                  <RButton component={RouterLink} to='/signup' startIcon={<AppRegistrationIcon />}>
                    Sign Up
                  </RButton>
                }
              />
              <Box sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={2} py={1} sx={{ width: '80%' }}>
                  <TextField color='secondary' label='Email' required error={emailErr} inputRef={emailRef} />
                  <PasswordField label='Password' type='password' error={passwordErr} inputRef={passwordRef} />
                  {/* <TextField color='secondary'  label='Password' type='password' required error={passwordErr} inputRef={passwordRef} /> */}
                </Stack>
              </Box>

              <Box sx={{ pb: 3, display: 'flex', justifyContent: 'space-around' }}>
                <RButton onClick={handleResetPassword}>Forgot Password</RButton>
                <RButton type='submit' variant='contained' startIcon={<LoginIcon />}>
                  Sign In
                </RButton>
              </Box>
              <Box sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
                <Stack sx={{ pb: 4, width: '56%' }}>
                  <FacebookLoginButton style={{ fontSize: '14px' }} align='center' size='40px' onClick={useFacebook} />
                  <GoogleLoginButton style={{ fontSize: '14px' }} align='center' size='40px' onClick={useGoogle} />
                  <InstagramLoginButton
                    style={{ fontSize: '14px' }}
                    align='center'
                    size='40px'
                    onClick={useInstagram}
                  />
                </Stack>
              </Box>
            </Card>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia onLoad={handleOnload} sx={{ opacity: 0.6 }} component='img' src={scc2} alt='scc-ocean' />
        </Grid>
      </Grid>
      <Content2Cards />
    </>
  );
};

export default SccLogin;
