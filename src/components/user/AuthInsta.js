import React, { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';

import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, collection, getFirestore } from 'firebase/firestore';
import { Container, Box, Typography, CardMedia } from '@mui/material';
import scc1 from '../../static/imgs/scc-fb-grp.jpeg';
import { firebaseConfig, db, auth } from '../context/FireBase';

const AuthInsta = () => {
  const {
    theme,
    currentUser,
    dispatch,
    state: { alert },
  } = useValue();
  function addDocument(db, documentObj, documentId) {
    const docRef = doc(collection(db, 'Users'), documentId);
    return setDoc(docRef, { ...documentObj, timestamp: serverTimestamp() });
  }

  const queryUrl = window.location.href.split('#_')[0]; // remove the trailing #_ if present
  if (queryUrl.indexOf('?') >= 0) {
    var userId = queryUrl.split('ui=')[1].split('&')[0];
    var displayName = queryUrl.split('un=')[1].split('&')[0];
    var instaAccessToken = queryUrl.split('at=')[1].split('&')[0];
    var firebaseToken = queryUrl.split('ft=')[1].split('&')[0];
    var reAuthInsta = queryUrl.split('ra=')[1].split('&')[0];
  }
  console.log(userId, displayName, instaAccessToken, reAuthInsta);

  useEffect(() => {
    loginClient();
  }, []);

  const loginClient = async () => {
    dispatch({ type: 'START_LOADING' });

    var token = `${firebaseToken}`;
    var userCredential = null;
    var user = null;

    if (reAuthInsta === 'true') {
      // we are reauth an insta user in account settings
      console.log('were in second phase');
      const tempApp = initializeApp(firebaseConfig, '_temp_');
      try {
        userCredential = await signInWithCustomToken(getAuth(tempApp), token);
        user = userCredential.user;
        if (localStorage.getItem('currentUser') === user.uid) {
          console.log('reauth success');
          localStorage.setItem('instaReauthState', 'true');
          window.close();
        } else {
          console.log('reauth failed');
        }
        await deleteApp(tempApp);
        dispatch({ type: 'END_LOADING' });
      } catch (error) {
        dispatch({ type: 'END_LOADING' });

        console.log(error.message);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
        });
      }
    } else {
      // were loggin in an Insta user
      // We sign in via a temporary Firebase app to update the profile.

      const tempApp = initializeApp(firebaseConfig, '_temp_');
      const tempDb = getFirestore(tempApp);

      const opener = window.opener;
      const winObj = window;
      const name = window.name;

      // const app = initializeApp(firebaseConfig);
      try {
        userCredential = await signInWithCustomToken(getAuth(tempApp), token);
        user = userCredential.user;
        const userloginPromises = [];
        // Saving the Instagram API access token in the Realtime Database.
        const docObject = {
          instaAccessToken: `${instaAccessToken}`,
          firebaseToken: `${firebaseToken}`,
          userId: `${userId}`,
        };
        // Updating the displayname if needed.
        if ((`${displayName}` !== user?.displayName) === null) {
          userloginPromises.push(updateProfile(user, { displayName: `${displayName}` }));
        }
        userloginPromises.push(addDocument(tempDb, docObject, user.uid));
        await Promise.all(userloginPromises);
        deleteApp(tempApp); // delete the temp firebase app
        // await signInWithCustomToken(auth, token);
        userCredential = await signInWithCustomToken(auth, token);
        user = userCredential.user;

        localStorage.setItem('instaLoginState', 'true');
        window.close();
        console.log('auth success');
        // window.close(); // We're done! Closing the popup.
        // console.log(user.uid, user.displayName, user.email, user.metadata);
        // dispatch({ type: 'END_LOADING' });

        //
      } catch (error) {
        dispatch({ type: 'END_LOADING' });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
        });
      }
    }
  };

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
              Almost there...
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AuthInsta;
