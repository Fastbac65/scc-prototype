import React, { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';

import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, collection, getFirestore } from 'firebase/firestore';
import { Container, Box, Typography, CardMedia } from '@mui/material';
import scc1 from '../../static/imgs/scc-fb-grp.jpeg';
import { firebaseConfig, auth } from '../context/FireBase';
// import axios from 'axios';

const AuthInsta = () => {
  const {
    imageProxyServer,
    signOutUser,
    dispatch,
    state: { alert },
  } = useValue();

  function addInstaUserDocument(db, documentObj, documentId) {
    //  because we are using a tmp instance of firebase for new insta user we need this version of addDocument
    const docRef = doc(collection(db, 'Users'), documentId);
    return setDoc(docRef, { ...documentObj, timestamp: serverTimestamp() });
  }

  useEffect(() => {
    loginClient();
  }, []);

  const loginClient = async () => {
    dispatch({ type: 'START_LOADING' });
    const queryUrl = window.location.href.split('#_')[0]; // remove the trailing #_ if present
    console.log(queryUrl);
    if (queryUrl.indexOf('?') >= 0) {
      // ui=userID, un=user name, upp= user profile pic, at= access token, ft=firebase token, ra= re authentication
      var displayName = queryUrl.split('?un=')[1].split('&')[0];
      var userId = queryUrl.split('&ui=')[1].split('&')[0];
      var photoURL = queryUrl.split('&upp=')[1].split('&at')[0];
      var instaAccessToken = queryUrl.split('&at=')[1].split('&')[0];
      var firebaseToken = queryUrl.split('&ft=')[1].split('&')[0];
      var reAuthInsta = queryUrl.split('&ra=')[1].split('&')[0];
      var newUser = queryUrl.split('&nu=')[1].split('&')[0];
    }
    console.log(userId, displayName, instaAccessToken, reAuthInsta, photoURL, newUser);

    var token = `${firebaseToken}`;
    var userCredential = null;
    var user = null;

    if (reAuthInsta === 'true') {
      // we are reauthenticating an insta user in Account Settings
      console.log('Second phase of reAuth');
      // const tempApp = initializeApp(firebaseConfig, '_temp_');
      try {
        userCredential = await signInWithCustomToken(auth, token);
        // userCredential = await signInWithCustomToken(getAuth(tempApp), token);
        user = userCredential.user;
        // compare user.uid to the original currentUser.uid written to local storage in first phase
        if (localStorage.getItem('currentUser') === user.uid) {
          console.log('reauth success');
          localStorage.setItem('instaReauthState', 'true');
          window.close();
        } else {
          console.log('reauth failed');
          signOutUser();
        }
        // await deleteApp(tempApp);
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
      // were logging in an Insta user
      // We sign in via a temporary Firebase app to update the profile if its a new user.
      if (newUser === 'true') {
        const tempApp = initializeApp(firebaseConfig, '_temp_');
        const tempDb = getFirestore(tempApp);

        try {
          userCredential = await signInWithCustomToken(getAuth(tempApp), token);
          user = userCredential.user;
          const userloginPromises = [];

          // access insta profile pic via server - avoids CORS related issues
          const instaProfileUrl = imageProxyServer + photoURL;

          // Saving the Instagram API access token in the Realtime Database.
          const docObject = {
            instaAccessToken: `${instaAccessToken}`,
            firebaseToken: `${firebaseToken}`,
            userId: `${userId}`,
            uName: displayName,
            uAvatar: instaProfileUrl,
            uEmail: '',
            uMobile: '',
            uRole: { basic: true },
            provider: 'Instagram',
          };
          // Updating the profile if either displayName or profileURL are blank
          //
          if (user?.displayName === null || user?.photoURL === null) {
            userloginPromises.push(updateProfile(user, { displayName: `${displayName}`, photoURL: instaProfileUrl }));
          }
          userloginPromises.push(addInstaUserDocument(tempDb, docObject, user.uid));
          await Promise.all(userloginPromises);
          deleteApp(tempApp); // delete the temp firebase app
          // await signInWithCustomToken(auth, token);
          userCredential = await signInWithCustomToken(auth, token);
          // user = userCredential.user;

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
      } else {
        // simple re-login of insta user
        try {
          userCredential = await signInWithCustomToken(auth, token);
          // user = userCredential.user;

          localStorage.setItem('instaLoginState', 'true');
          window.close();
          console.log('Existing user auth success');
        } catch (error) {
          dispatch({ type: 'END_LOADING' });
          dispatch({
            type: 'UPDATE_ALERT',
            payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
          });
        }
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

// logged in instagram user details    http://www.instagram.com/fastbac65/channel/?__a=1&__d=dis

//  https://192.168.0.215:3000/auth?un=fastbac65&ui=17841457277657972&at=IGQVJXVmNqSndCeXdKTkdsZAmVtVENHaUZAYa3UweFAyZA2FucDVmV3U0Ynh2dmZAIMmtvcXA3UlhfenVGbGN6by1xYW9iczFDVTdYdU9GQ3R2ZAjE5Y2hudGQ3b0tadjVESkhlRWw1QlpVQWR1ZA0dvZAjJHRTZAiQnZAJUk04YVhR&ft=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY3MjcyMjMyNywiZXhwIjoxNjcyNzI1OTI3LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay02enlqekBzY2MtcHJvdG8uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay02enlqekBzY2MtcHJvdG8uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiIxNzg0MTQ1NzI3NzY1Nzk3MiJ9.d3guoqONDaob-VnxRQGMLDDFj3SkGLFJZmH1kuzOEyROas8466DPZ41ukJ13WtJ9H65vvhbS0Zw7mUk2nTmAcKxWIMxb_IQtP1vQhrZUdg-ObOlJEZuoUDfqchveDg5JmsmYcy9Q2cdH6wGoiZD51OFmOdzq8nFb2FHIo8QzH6ygore1C8uG4EcGD7jyisViFpXOsFQEuos5L9lbvUxEn6VcQuulnDRKlvtOwSRUTY7YQu7reh1J_sbYe2yw_ph9SwhpMMVr8HSvwqHnxPxxkJDA3Txd6whiQDTwyKuwaEIz-3cjkmya9nSWm8h6gZjfCVj8vPMbn_3Ce_b0w21wDQ&ra=true
