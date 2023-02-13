import { createContext, useContext, useEffect, useState, useReducer, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { createTheme } from '@mui/material';

import { db, auth, providerGoogle, providerFacebook } from './FireBase';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  updateProfile,
} from 'firebase/auth';

import reducer from './reducer';
import { addDocument } from './addDocument';
import { doc, getDoc } from 'firebase/firestore';
import updateUserRecords from './updateUserRecords';
import getGoogleCals from './getGoogleCals';

export const GlobalContext = createContext();

export const useValue = () => {
  return useContext(GlobalContext);
};

export function ScrollTop(props) {
  const { children, window, id } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 2200,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(id);

    if (anchor) {
      anchor.scrollIntoView({
        block: 'start',
        behaviour: 'smooth',
      });
    }
  };
  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,

    window: PropTypes.func,
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Fade>
  );
}

export const ContextProvider = ({ children }) => {
  const initialstate = {
    alert: { open: false, severity: 'info', message: '', variant: 'filled', duration: 1000 },
    modal: { open: false, title: '', content: '' },
    loading: false,
    lightbox: { open: false, currentIndx: 0 },
  };
  const [state, dispatch] = useReducer(reducer, initialstate);

  const [currentUser, setCurrentUser] = useState({});
  const [mode, setMode] = useState('light');
  const [login, setLogin] = useState(false);
  var globalDocs = useRef([]);
  var [calEvents, setCalEvents] = useState([]);

  // const instagramLoginServer = 'https://192.168.0.220:5001';
  const instagramLoginServer = 'https://scc-auth.cyclic.app';
  // const imageProxyServer = 'https://192.168.0.220:5001/image/';
  const imageProxyServer = 'https://scc-auth.cyclic.app/image/';

  var theme = createTheme({
    breakpoints: {
      values: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1400 },
    },
    palette: {
      primary: {
        main: '#004c98',
      },
      secondary: {
        // main: '#f44336',
        main: '#336fac',
      },
      mode: mode,
    },
    typography: {
      fontFamily: 'Quicksand, Roboto',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  const imglib = [
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader8.jpeg?alt=media&token=a1f8999d-3a8e-4e92-ac46-40c7298fe80a',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2FBattleOfTheDitch-1-1-1024x598.jpeg?alt=media&token=e351ddbc-1738-4d2b-a0a7-b16f18f455c0',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader7.jpeg?alt=media&token=9ff47599-4360-4649-bf48-a60730cea6c5',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader5.jpeg?alt=media&token=8acd48ec-9c4c-404b-b242-9031eb2c7a0a',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader4.jpeg?alt=media&token=f2ede123-a80e-468a-bff7-ce5c26d094c9',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader3.jpeg?alt=media&token=fac14bdd-3a36-49f7-ad50-07f414230716',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader2.jpeg?alt=media&token=5994312f-ace7-45a9-af74-da5264a184d5',
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fscc-beach-sunrise.jpeg?alt=media&token=9bc45d92-b866-4905-b199-7f751f8b5175',
  ];

  // The user original account creation info and roles are in the User doc
  const getUserDoc = async (uid) => {
    //
    const docRef = doc(db, 'Users', uid);
    return getDoc(docRef);
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.id, docSnap.data());
  };
  //sets the currentUser global object when authentication changes. Logging In(full user object from auth provider) or Out(null)
  //sets the login global true when logged in. Used for routing and conditional rendering - its Boolean
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      authUser && authUser?.emailVerified === true ? setLogin(true) : setLogin(false);

      if (authUser) {
        getUserDoc(authUser.uid).then((userDoc) => {
          // let user = authUser;
          // deep copy of authUser with functions but creates a reference so user is effectively same
          let user = Object.assign(authUser, userDoc.data());

          // setCurrentUser(authUser);
          setCurrentUser(user);
          console.log('auth state login', user);
          //TODO fix this
          if (user?.emailVerified && user?.uRole?.createPost === undefined) {
            // let x = { uRole: { ...user?.uRole, createPost: true, nippersEditor: false } };
            updateUserRecords('Users', user.uid, {
              uRole: { ...user?.uRole, createPost: true, nippersEditor: false, email: false },
            })
              .then((result) => console.log('User role updated', result))
              .catch((error) => console.log('Error updated user roles', error));
          }
        });
      } else setCurrentUser(null);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const googleCalColors = [
    `${theme.palette.info.main}`,
    `${theme.palette.secondary.main}`,
    `${theme.palette.error.main}`,
    `${theme.palette.success.main}`,
  ];

  const allCalEvents = useRef([]);
  useMemo(() => {
    console.log('getting cals');
    getGoogleCals(googleCalColors).then((events) => {
      allCalEvents.current = [...events];
      // setCalEvents(events);
    });
  }, []);

  const toggleLogin = () => {
    setLogin(!login);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const signUpEmail = (fname, email, password, mobile) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        const randomAvatar = 'https://i.pravatar.cc/250?u=' + email;
        const updatePromises = [];
        updatePromises.push(
          updateProfile(user, {
            displayName: fname,
            photoURL: randomAvatar,
          })
        );
        // updatePromises.push(updateEmail(auth.currentUser, email));

        const docObject = {
          userId: user.uid,
          uName: fname,
          uAvatar: randomAvatar,
          uEmail: user?.email || '',
          uMobile: mobile,
          uRole: { basic: true },
        };
        updatePromises.push(addDocument('Users', docObject, user.uid));
        await Promise.all(updatePromises);

        console.log('signin', result);
        resolve(result);
      } catch (error) {
        console.log('signin', error);
        reject(error);
      }
    });
  };
  const signInEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const result = await signInWithEmailAndPassword(auth, email, password);
    //     const user = result.user;
    //     const docObject = {
    //       userId: user.uid,
    //       uName: user.displayName,
    //       uAvatar: user?.photoURL || '',
    //       uEmail: user?.email || '',
    //       uMobile: '',
    //       uRole: { basic: true },
    //     };
    //     await addDocument('Users', docObject, user.uid);
    //     console.log('signin', result);
    //     resolve(result);
    //   } catch (error) {
    //     console.log('signin', error);
    //     reject(error);
    //   }
    // });
  };
  const signInGoogle = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await signInWithPopup(auth, providerGoogle);
        // localStorage.setItem('login', true);
        console.log('signin', result);
        const userInfo = getAdditionalUserInfo(result);
        if (userInfo.isNewUser) {
          // first time FB login we need to copy the email from providerData into the user
          // write the user record
          const user = result.user;
          const docObject = {
            userId: user.uid,
            uName: user.displayName,
            uAvatar: user.photoURL || '',
            uEmail: user.email || '',
            uMobile: '',
            uRole: {
              basic: true,
            },
            provider: user.providerData[0].providerId,
          };
          await addDocument('Users', docObject, user.uid);
        }
        // we can use this to determine a new user
        resolve(userInfo.isNewUser);
      } catch (error) {
        console.log('signin', error);
        reject(error);
      }
    });
  };
  const signInFacebook = () => {
    return new Promise(async (resolve, reject) => {
      try {
        providerFacebook.addScope('email');
        const result = await signInWithPopup(auth, providerFacebook);
        console.log('signin', result);

        // const credential = FacebookAuthProvider.credentialFromResult(result);
        const userInfo = getAdditionalUserInfo(result);
        if (userInfo.isNewUser) {
          // first time FB login we need to copy the email from providerData into the user
          // UPDATE this will break if a user logged in and verified their email via google
          // if (result.user.email === null) {
          //   await updateEmail(result.user, result.user.providerData[0].email);
          //   console.log('email updated in profile');
          // }

          // write the user record
          const user = result.user;
          const docObject = {
            userId: user.uid,
            uName: user.displayName,
            uAvatar: user?.photoURL || '',
            uEmail: user?.email || user.providerData[0].email,
            uMobile: '',
            uRole: {
              basic: true,
            },
            provider: user.providerData[0].providerId,
          };
          await addDocument('Users', docObject, user.uid);
          let x = { ...currentUser, ...docObject };
          console.log(x);
        }
        // we can use this to determine a new user
        console.log(userInfo);
        // const accessToken = credential.accessToken;
        // userCreds = { ...credential };
        // console.log(userCreds);
        // console.log(accessToken);
        resolve(userInfo.isNewUser);
      } catch (error) {
        console.log('signin', error);
        reject(error);
      }
    });
  };
  const signInInstagram = () => {
    return new Promise((resolve, reject) => {
      console.log('window opening');
      const authWindow = window.open('', 'SCC SLSC', 'height=600, width=400, popup=1');
      authWindow.location.assign(`${instagramLoginServer}/redirect?ra=false`);

      localStorage.setItem('instaLoginState', 'false');
      try {
        var counter = 0;

        let checkAuth = setInterval(() => {
          counter++;
          console.log('ckecking', counter);
          if (authWindow.closed) {
            console.log('win closed', counter);
            // the auth window is going to close for only 1 of 2 reasons..  auth success or user closes
            if (localStorage.getItem('instaLoginState') === 'true') {
              // console.log(currentUser.uid, currentUser.displayName);
              // reauth success
              const newUser = localStorage.getItem('newUser') === 'true' ? true : false;
              localStorage.removeItem('instaLoginState');
              localStorage.removeItem('newUser');
              clearInterval(checkAuth);
              resolve(newUser);
            } else {
              // user closed the window
              localStorage.removeItem('instaLoginState');

              clearInterval(checkAuth);
              reject(new Error('Instagram authentication window closed!'));
            }
            //
            console.log('auth win closed');
          }
        }, 500);
      } catch (error) {
        console.log('error', error.message);
        reject(error);
      }
    });
  };
  const reauthenticateInstagram = () => {
    return new Promise(async (resolve, reject) => {
      localStorage.setItem('instaReauthState', 'false');
      // store the currentUser id so that AuthInsta can check against this when verifying the reAuth
      localStorage.setItem('currentUser', `${currentUser.uid}`);
      const authWindow = window.open('', 'SCC SLSC', 'height=600, width=400, popup=1');

      authWindow.location.assign(`${instagramLoginServer}/redirect?ra=true`);

      let checkAuth = setInterval(() => {
        if (authWindow.closed) {
          // the auth window is going to close for only 1 of 2 reasons..  auth success or user closes
          if (localStorage.getItem('instaReauthState') === 'true') {
            // reauth success
            localStorage.removeItem('instaReauthState');
            localStorage.removeItem('currentUser');
            clearInterval(checkAuth);
            resolve(true);
          } else {
            // user closed the window
            clearInterval(checkAuth);

            reject(new Error('Instagram authentication window closed!'));
          }
          //
          console.log('auth win closed');
        }
      }, 500);
    });
  };
  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      // setLogin(false);
      // navigate('/login');
      console.log('logged out ', currentUser);
    });
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        theme,
        toggleColorMode,
        login,
        setLogin,
        toggleLogin,
        currentUser,
        setCurrentUser,
        signInEmail,
        signUpEmail,
        signInGoogle,
        signInFacebook,
        reauthenticateInstagram,
        signInInstagram,
        signOutUser,
        imglib,
        resetPassword,
        instagramLoginServer,
        imageProxyServer,
        allCalEvents,
        calEvents,
        setCalEvents,
        globalDocs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
