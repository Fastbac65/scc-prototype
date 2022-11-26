import { Box, Button, Card, CardHeader, CardMedia, Grid, TextField, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import scc2 from '../static/imgs/scc-pool-waves.jpeg';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { styled } from '@mui/material/styles';
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import { useValue } from './context/ContextProvider';
import Content2Cards from './Content2Cards';

const RButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
}));

const SccLogin = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const {
    state: { alert },
    dispatch,
    signInGoogle,
  } = useValue();

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  // const { signInGoogle } = useContext(GlobalContext);
  const [height, setHeight] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setEmailErr(false);
    setPasswordErr(false);

    !email && setEmailErr(true);
    !password && setPasswordErr(true);

    if (!email || !password) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: 'Please fill in all required fields', duration: 3000 },
      });
    }
  };
  const navigate = useNavigate();

  const useGoogle = async () => {
    try {
      await signInGoogle();
      navigate(-1);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'success', message: 'Welcome to SCC Members!!', duration: 3000 },
      });
    } catch (error) {
      console.log(error);
    }
    // signInGoogle().then(navigate('/'));
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
            <Card sx={{ height: { height }, minHeight: 660 }}>
              <CardHeader
                title='Members Login'
                action={
                  <RButton component={RouterLink} to='/signup' startIcon={<AppRegistrationIcon />}>
                    Sign Up
                  </RButton>
                }
              />

              <Stack spacing={4} py={4} sx={{ width: '80%', ml: 5 }}>
                <TextField label='Email' required error={emailErr} inputRef={emailRef} />
                <TextField label='Password' type='password' required error={passwordErr} inputRef={passwordRef} />
              </Stack>

              <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
                <RButton type='submit' variant='contained' startIcon={<LoginIcon />}>
                  Sign In
                </RButton>
              </Box>
              <Box sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
                <Stack sx={{ pb: 4, width: '56%' }}>
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
      <Content2Cards />
    </>
  );
};

export default SccLogin;
