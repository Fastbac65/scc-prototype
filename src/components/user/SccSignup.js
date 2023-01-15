import { Box, Button, Card, CardHeader, CardMedia, Grid, TextField, Stack } from '@mui/material';
import { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import scc2 from '../../static/imgs/scc-pool-waves.jpeg';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { styled } from '@mui/material/styles';
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import { useValue } from '../context/ContextProvider';
import PasswordField from './PasswordField';
import { updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../context/FireBase';

// import { async } from '@firebase/util';

const RButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
}));

const SccSignup = () => {
  const navigate = useNavigate();
  const fnameRef = useRef('');
  const mobileRef = useRef('');
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
    signInFacebook,
    signInInstagram,
    signUpEmail,
  } = useValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const fname = fnameRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    setFnameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setConfirmPasswordErr(false);

    // if (email && password) console.log(email, password);
    //user feedback on empty fields - can be enhanced later to test password strength for example
    !fname && setFnameErr(true);
    !email && setEmailErr(true);
    !password && setPasswordErr(true);
    password.length < 8 && setPasswordErr(true);
    !confirmPassword && setConfirmPasswordErr(true);
    confirmPassword.length < 8 && setConfirmPasswordErr(true);

    try {
      //check for empty fields
      if (!fname || !email || !password || !confirmPassword || password.length < 8) {
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
        //check passwords match
      } else if (password !== confirmPassword) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: 'Passwords do not match!!',
            duration: 3000,
          },
        });
        //sign up
      } else {
        dispatch({ type: 'START_LOADING' });
        await signUpEmail(email, password, mobile);
        const randomAvatar = 'https://i.pravatar.cc/250?u=' + email;
        const updatePromises = [];
        updatePromises.push(
          updateProfile(auth.currentUser, {
            displayName: fname,
            photoURL: randomAvatar,
          })
        );
        updatePromises.push(updateEmail(auth.currentUser, email));
        await Promise.all(updatePromises);
        dispatch({ type: 'END_LOADING' });

        navigate(-1);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'success', message: 'Registration Successful', duration: 6000 },
        });
      }
    } catch (error) {
      dispatch({ type: 'END_LOADING', loading: false });
      console.log(error.message);
    }
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

  // get the size of the image to the right of login
  const handleOnload = (e) => {
    setHeight(e.target.offsetHeight);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Card sx={{ height: { height }, minHeight: 560 }}>
              <CardHeader
                title='Members Access'
                action={
                  <RButton component={RouterLink} to='/login' startIcon={<LoginIcon />}>
                    Existing Member
                  </RButton>
                }
              />
              <Box sx={{ pb: 1, display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={2} py={1} sx={{ width: '90%' }}>
                  <Box spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      color='secondary'
                      size='small'
                      label='Full Name'
                      required
                      error={fnameErr}
                      inputRef={fnameRef}
                    />
                    <TextField color='secondary' size='small' label='Mobile Number' inputRef={mobileRef} />
                  </Box>

                  <TextField
                    color='secondary'
                    size='small'
                    label='Email'
                    required
                    error={emailErr}
                    inputRef={emailRef}
                  />
                  {/* <TextField color='secondary'  label='Password' type='password' required error={passwordErr} inputRef={passwordRef} /> */}
                  <PasswordField
                    size='small'
                    label='Password'
                    type='password'
                    required
                    error={passwordErr}
                    inputRef={passwordRef}
                  />
                  <PasswordField
                    size='small'
                    label='Confirm Password'
                    type='password'
                    required
                    error={confirmPasswordErr}
                    inputRef={confirmPasswordRef}
                    helperText={'minimum 8 characters'}
                  />

                  {/* <TextField color='secondary' 
                  label='Confirm Password'
                  type='password'
                  required
                  error={confirmPasswordErr}
                  inputRef={confirmPasswordRef}
                /> */}
                </Stack>
              </Box>

              <Box sx={{ pb: 2, display: 'flex', justifyContent: 'center' }}>
                <RButton type='submit' variant='contained' startIcon={<AppRegistrationIcon />}>
                  Sign Up with Email
                </RButton>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Stack sx={{ pb: 4, width: '60%' }}>
                  <FacebookLoginButton style={{ fontSize: '14px' }} align='center' size='40px' onClick={useFacebook}>
                    Sign up with Facebook
                  </FacebookLoginButton>
                  <GoogleLoginButton style={{ fontSize: '14px' }} align='center' size='40px' onClick={useGoogle}>
                    Sign up with Google
                  </GoogleLoginButton>
                  <InstagramLoginButton style={{ fontSize: '14px' }} align='center' size='40px' onClick={useInstagram}>
                    Sign up with Instagram
                  </InstagramLoginButton>
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
