import { Box, Paper, Button, Card, CardHeader, CardMedia, Grid, TextField, Stack } from '@mui/material';
import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import scc2 from '../static/imgs/scc-pool-waves.jpeg';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { styled } from '@mui/material/styles';
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import GlobalContext from './context/ContextProvider';

const RButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
}));

const SccLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const { signInGoogle } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailErr(false);
    setPasswordErr(false);
    if (email && password) console.log(email, password);

    !email && setEmailErr(true);
    !password && setPasswordErr(true);
  };
  const navigate = useNavigate();

  const useGoogle = async () => {
    try {
      await signInGoogle();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    // signInGoogle().then(navigate('/'));
  };

  return (
    <Paper sx={{ borderRadius: 0 }}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Card sx={{ boxShadow: 0, height: '100%' }}>
              <CardHeader
                title='Members Login'
                action={
                  <RButton component={RouterLink} to='/signup' startIcon={<AppRegistrationIcon />}>
                    Sign Up
                  </RButton>
                }
              />

              <Stack spacing={4} py={4} sx={{ width: '80%', ml: 5 }}>
                <TextField label='Email' required error={emailErr} onChange={(e) => setEmail(e.target.value)} />
                <TextField
                  label='Password'
                  type='password'
                  required
                  error={passwordErr}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>

              <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
                <RButton type='submit' variant='contained' startIcon={<LoginIcon />}>
                  Sign In
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
          <CardMedia sx={{ opacity: 0.6 }} component='img' src={scc2} alt='scc-ocean' />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SccLogin;
