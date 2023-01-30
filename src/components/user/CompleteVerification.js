import React, { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';

// import { initializeApp, deleteApp } from 'firebase/app';
// import { getAuth, signInWithCustomToken, updateProfile } from 'firebase/auth';
// import { setDoc, doc, serverTimestamp, collection, getFirestore } from 'firebase/firestore';
import { Container, Box, Typography, CardMedia } from '@mui/material';
import scc1 from '../../static/imgs/scc-fb-grp.jpeg';
import { auth } from '../context/FireBase';
import { applyActionCode, reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ResetPasswordVerification from './ResetPasswordVerification';
// import axios from 'axios';

const CompleteVerification = () => {
  const {
    imageProxyServer,
    currentUser,
    signOutUser,
    dispatch,
    state: { alert, modal },
  } = useValue();

  const navigate = useNavigate();

  useEffect(() => {
    //
    verifyUser();
  }, []);

  const message = "Just a sec... we're verifing your details";

  async function verifyUser() {
    const queryUrl = window.location.href; // get the browser URL
    console.log(queryUrl);
    if (queryUrl.indexOf('oobCode') >= 0) {
      dispatch({ type: 'START_LOADING' });

      //e.g.  https://192.168.0.220:3000/verify?mode=verifyEmail&oobCode=FAF945mvNdlvlkVIDctQ__KUoUFz92R481LCiTa_ic4AAAGFqKbioQ&apiKey=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&lang=en
      var mode = queryUrl.split('mode=')[1].split('&')[0];
      var oobCode = queryUrl.split('oobCode=')[1].split('&')[0];
      var apiKey = queryUrl.split('apiKey=')[1].split('&')[0];

      console.log(mode, oobCode, apiKey);

      try {
        //
        switch (mode) {
          case 'verifyEmail': {
            // const result = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            await reload(auth.currentUser);
            console.log(auth.currentUser);
            console.log(currentUser);

            navigate('/');
            dispatch({ type: 'END_LOADING' });
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                ...alert,
                open: true,
                severity: 'success',
                message: 'Your email has been verified. You now have full access to SCC Members',
                duration: 8000,
              },
            });
            break;
          }
          case 'verifyAndChangeEmail': {
            // const result = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            // await reload(auth.currentUser);
            // console.log(result);
            console.log(auth.currentUser);
            console.log(currentUser);

            navigate('/');
            dispatch({ type: 'END_LOADING' });
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                ...alert,
                open: true,
                severity: 'success',
                message: 'Your new email has been verified. You now have full access to SCC Members',
                duration: 8000,
              },
            });

            break;
          }
          case 'recoverEmail': {
            // const result = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            // await reload(auth.currentUser);
            dispatch({ type: 'END_LOADING' });
            console.log(auth.currentUser);
            console.log(currentUser);
            navigate('/');
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                ...alert,
                open: true,
                severity: 'success',
                message: `Your email change has been reversed. For security reasons existing sessions have expired. You can sign back in using your original credentials. We strongly recommend you change your password if you did not initiate this email change!`,
                duration: 8000,
              },
            });

            navigate('/');
            signOutUser();

            break;
          }
          case 'resetPassword': {
            dispatch({ type: 'END_LOADING' });

            dispatch({
              type: 'MODAL',
              payload: {
                ...modal,
                open: true,
                title: 'Reset Password',
                content: <ResetPasswordVerification oobCode={oobCode} />,
              },
            });
            // all of this will be done in the modal
            // const result = await checkActionCode(auth, oobCode);
            // // await confirmPasswordReset(auth, oobCode, newPassword);
            // dispatch({ type: 'END_LOADING' });
            // console.log(result);
            // // console.log(auth.currentUser);
            // // console.log(currentUser);
            // dispatch({
            //   type: 'UPDATE_ALERT',
            //   payload: {
            //     ...alert,
            //     open: true,
            //     severity: 'success',
            //     message: 'Your password has been updated. You should be able to login now!',
            //     duration: 8000,
            //   },
            // });
            // navigate('/');

            break;
          }

          default:
            break;
        }
      } catch (error) {
        dispatch({ type: 'END_LOADING' });
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
        navigate('/');
      }
    } else navigate('/');
  }

  return (
    <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Box>
          <CardMedia component='img' src={scc1} height='500' />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h5' component='div'>
              {message}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CompleteVerification;
