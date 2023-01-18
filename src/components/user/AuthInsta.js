import React, { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';

import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, collection, getFirestore } from 'firebase/firestore';
import { Container, Box, Typography, CardMedia, Stack } from '@mui/material';
import scc1 from '../../static/imgs/scc-fb-grp.jpeg';
import instaLogo from '../../static/imgs/Instagram-logo-small.png';
import { firebaseConfig, auth } from '../context/FireBase';
import axios from 'axios';
import uploadFile from '../context/uploadFile';
import { getStorage } from 'firebase/storage';

const AuthInsta = () => {
  const {
    imageProxyServer,
    signOutUser,
    theme,
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
    if (queryUrl.indexOf('&upp=') >= 0) {
      // ui=userID, un=user name, upp= user profile pic, at= access token, ft=firebase token, ra= re authentication
      var displayName = queryUrl.split('?un=')[1].split('&')[0];
      var userId = queryUrl.split('&ui=')[1].split('&')[0];
      var photoURL = queryUrl.split('&upp=')[1].split('&at=')[0];
      var instaAccessToken = queryUrl.split('&at=')[1].split('&')[0];
      var firebaseToken = queryUrl.split('&ft=')[1].split('&')[0];
      var reAuthInsta = queryUrl.split('&ra=')[1].split('&')[0];
      var newUser = queryUrl.split('&nu=')[1].split('&')[0];
    }
    console.log(userId, displayName, instaAccessToken, reAuthInsta, photoURL, newUser);

    var token = firebaseToken;
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
        const tempStorage = getStorage(tempApp);

        try {
          userCredential = await signInWithCustomToken(getAuth(tempApp), token);
          user = userCredential.user;
          const userloginPromises = [];

          // access insta profile pic via server - avoids CORS related issues. We'll get the image and store to avoid the url expiration issues
          const imgUrl = imageProxyServer + photoURL;
          const profileImage = await axios.get(imgUrl, { responseType: 'arraybuffer' });
          const file = new Blob([profileImage.data], { type: 'image/jpeg' });
          // const file = new Blob([profileImage.data], { type: profileImage.headers['content-type'] });
          const storageFilePath = `profile/${userId}/${displayName}_${userId}.jpeg`;
          const instaProfileUrl = await uploadFile(file, storageFilePath, tempStorage);

          // Saving the Instagram API access token in the Realtime Database.
          const docObject = {
            instaAccessToken: instaAccessToken,
            firebaseToken: firebaseToken,
            userId: userId,
            uName: displayName,
            uAvatar: instaProfileUrl,
            uEmail: '',
            uMobile: '',
            uRole: { basic: true },
            provider: 'Instagram',
          };
          // Updating the profile if either displayName or photoURL are blank
          //
          // if (user?.displayName === null || user?.photoURL === null) {
          userloginPromises.push(updateProfile(user, { displayName: `${displayName}`, photoURL: instaProfileUrl }));
          // }
          userloginPromises.push(addInstaUserDocument(tempDb, docObject, user.uid));
          await Promise.all(userloginPromises);
          deleteApp(tempApp); // delete the temp firebase app
          // await signInWithCustomToken(auth, token);
          userCredential = await signInWithCustomToken(auth, token);
          // user = userCredential.user;

          localStorage.setItem('instaLoginState', 'true');
          localStorage.setItem('newUser', 'true');
          window.close();

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
          // user = userCredential.user;   no need to do anything, just carry on login
          localStorage.setItem('instaLoginState', 'true');
          localStorage.setItem('newUser', 'false');
          window.close();
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
        <CardMedia component='img' src={scc1} height='500' />
        <Box
          sx={{
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack>
            <Typography paragraph variant='h5' component='div'>
              Almost there...
            </Typography>
            <div>
              <img src={instaLogo} />
            </div>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default AuthInsta;

// logged in instagram user details    http://www.instagram.com/fastbac65/channel/?__a=1&__d=dis

// https://192.168.0.220:3000/auth?un=fastbac65&ui=17841457277657972&upp=https://scc-auth.cyclic.app/image/https://instagram.fsyd8-1.fna.fbcdn.net/v/t51.2885-19/319599394_1294096694657733_2010438183614683485_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsyd8-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=TymP5-0wtp0AX-axJpD&edm=AAWvnRQBAAAA&ccb=7-5&oh=00_AfDfhE6PGg_FYyPQmvbKOB99ZPlA3sBOlDNupc48oipxFg&oe=63C78D51&_nc_sid=e7738c&at=IGQVJVdlViX3N4RElTbGV2SkFEWkx5bEcyOXV0TzNick9iV1BjMk5iczN4RnZAQSWNGOHlPWUdzZAmJmdUVXbnF0R3k2b24tUXV6YUMxd2FRTUItalZAyaGlJTngxbWlFcWtEcVNlN09UengweENvWVlybGRjVmtVTV9uTGdr&ft=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY3Mzg0NDkxOSwiZXhwIjoxNjczODQ4NTE5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay02enlqekBzY2MtcHJvdG8uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay02enlqekBzY2MtcHJvdG8uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiIxNzg0MTQ1NzI3NzY1Nzk3MiJ9.sRzrZ-TVWXjtDr2jQc505M-HzsvVCNt9ENE8j6doAHuuuTr2xRCnvm5cpgfx72o1tdg3TPNSPTbbmOrkMTRtlEQT5Y2Vh9eA8DqgQkJQwa18xzTHLVo20QyELa-xzy2BD9vPH0o1rOvytbpLJlc7Qzw74Sgr_p-H_TCzV6J3oBA2E1kHIfNyuL-m2MXNIKf8Cdvf59UxtEt4w71rLGktkaMI97ubaWNvGAEDJzVUcxHFfTQ8QUCP3b6qay24qtdq3QBsVMR9hLOuOGSeHivqCY0Lz2F3-BNLfsvVkESXraw_nBRrb_F0Usu29SYeuApEaJxgOYnhvk_wrA7kx6_2Ow&ra=false&nu=false
