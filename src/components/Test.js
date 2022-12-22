import { Close } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { ImageCarousel } from './content/ImageCarousel';
import SimpleActionCard from './content/SimpleActionCard';
import { useValue } from './context/ContextProvider';

import scc1 from '../static/imgs/scc-fb-grp.jpeg';
import ImageResize from './context/ImageResize';

import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const Test = () => {
  const { theme } = useValue();
  // function addDocument(db, documentObj, documentId) {
  //   const docRef = doc(collection(db, 'Users'), documentId);
  //   return setDoc(docRef, { ...documentObj, timestamp: serverTimestamp() });
  // }

  const queryUrl = window.location.href.split('#_')[0]; // remove the trailing #_ if present
  if (queryUrl.indexOf('?') >= 0) {
    var userId = queryUrl.split('ui=')[1].split('&')[0];
    var displayName = queryUrl.split('un=')[1].split('&')[0];
    var accessToken = queryUrl.split('at=')[1].split('&')[0];
    var firebaseToken = queryUrl.split('ft=')[1].split('&')[0];
    var reAuthInsta = queryUrl.split('ra=')[1].split('&')[0];
  }
  console.log(userId, displayName, accessToken, reAuthInsta);

  const loginClient = () => {
    var token = `${firebaseToken}`;
    const firebaseConfig = {
      apiKey: 'AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM',
      authDomain: 'scc-proto.firebaseapp.com',
      projectId: 'scc-proto',
      storageBucket: 'scc-proto.appspot.com',
      messagingSenderId: '254746155478',
      appId: '1:254746155478:web:703ef003cd09fa621bec77',
    };
    // We sign in via a temporary Firebase app to update the profile.
    //var tempApp = initializeApp(firebaseConfig, '_temp_');
    var app = initializeApp(firebaseConfig);
    var auth = getAuth(app);
    var db = getFirestore(app);
    console.log(app, auth, db);
    const email = 'bob@bob.com';
    const password = 'qwaszx';
    // signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    signInWithCustomToken(auth, token).then((userCredential) => {
      const user = userCredential.user;

      console.log(user);
      // Saving the Instagram API access token in the Realtime Database.
      // const docObject = {
      //   instaAccessToken: '${instaAccessToken}',
      //   firebaseToken: '${firebaseToken}',
      //   userId: '${userId}',
      // };
      //const tasks = [addDocument(db, docObject, user.uid)];

      // Updating the displayname if needed.
      //if ('${displayName}' !== user?.displayName || user?.email === null){
      //  tasks.push(updateProfile(user, { displayName: '${displayName}', email: 'test@test.com' }));
      //}

      // Wait for completion of above tasks.
      //return Promise.all(tasks).then(async function () {
      // Delete temporary Firebase app and sign in the default Firebase app, then close the popup.
      //await deleteApp(tempApp);
      //const app = initializeApp(firebaseConfig);
      //const promise = await signInWithCustomToken(getAuth(app), token);
      //window.close(); // We're done! Closing the popup.
      //const user = promise.user;
      console.log(user.uid, user.displayName, user.email, user.metadata);
      console.log('we made it');
    });
    // });
  };

  return (
    <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ backgroundImage: `url(${scc1})` }}>
          <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)' }}>
            <p>************ Component Test Page *****************</p>

            <div>
              <p>
                Sign In a Firebase app with Instagram.
                <br />
                <br />
                <br />
                <br />
                <strong>Now sign in!</strong>
              </p>
              <button id='demo-sign-in-button' onClick={loginClient}>
                Sign in with Instagram
              </button>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Test;
