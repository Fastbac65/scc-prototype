import React, { useEffect, useMemo, useState } from 'react';
import { useValue } from '../context/ContextProvider';

// import { initializeApp, deleteApp } from 'firebase/app';
// import { getAuth, signInWithCustomToken, updateProfile } from 'firebase/auth';
// import { setDoc, doc, serverTimestamp, collection, getFirestore } from 'firebase/firestore';
import { Container, Box, Typography, CardMedia } from '@mui/material';
import scc1 from '../../static/imgs/scc-fb-grp.jpeg';
import { firebaseConfig, auth } from '../context/FireBase';
import { applyActionCode, checkActionCode, confirmPasswordReset, reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const CompleteVerification = () => {
  const {
    imageProxyServer,
    currentUser,
    signOutUser,
    dispatch,
    state: { alert },
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

      //  https://192.168.0.220:3000/verify?mode=verifyEmail&oobCode=FAF945mvNdlvlkVIDctQ__KUoUFz92R481LCiTa_ic4AAAGFqKbioQ&apiKey=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&lang=en
      var mode = queryUrl.split('mode=')[1].split('&')[0];
      var oobCode = queryUrl.split('oobCode=')[1].split('&')[0];
      var apiKey = queryUrl.split('apiKey=')[1].split('&')[0];

      console.log(mode, oobCode, apiKey);

      try {
        //
        switch (mode) {
          case 'verifyEmail': {
            const result = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            console.log('b4', auth.currentUser);
            console.log('b4', currentUser);
            await reload(auth.currentUser);
            console.log(result);
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
            const result = await checkActionCode(auth, oobCode);
            // const result = await applyActionCode(auth, oobCode);          await reload(auth.currentUser);
            console.log(result);
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
          case 'recoverEmail': {
            const result = await checkActionCode(auth, oobCode);
            // const result = await applyActionCode(auth, oobCode);          dispatch({ type: 'END_LOADING' });
            dispatch({ type: 'END_LOADING' });
            console.log(result);
            console.log(auth.currentUser);
            console.log(currentUser);

            navigate('/');

            break;
          }
          case 'passwordReset': {
            // we would have to write a modal to get the users new password
            // const result = await confirmPasswordReset(auth, oobCode);
            dispatch({ type: 'END_LOADING' });
            // console.log(result);
            console.log(auth.currentUser);
            console.log(currentUser);
            navigate('/');

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
              bottom: 200,
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
