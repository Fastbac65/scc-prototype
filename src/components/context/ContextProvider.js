import { createContext, useContext, useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { createTheme } from '@mui/material';

import { auth, provider } from './FireBase';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import reducer from './reducer';

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
    threshold: 200,
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
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
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
    alert: { open: false, severity: 'info', message: '', duration: 1000 },
    modal: { open: false, title: '', content: '' },
    loading: false,
    lightbox: { open: false, currentIndx: 0 },
  };
  const [state, dispatch] = useReducer(reducer, initialstate);

  const [currentUser, setCurrentUser] = useState({});
  const [mode, setMode] = useState('light');
  const [login, setLogin] = useState(false);

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

  //sets the currentUser global object when authentication changes In(full user object from auth provider) or Out(null)
  //sets the login global true when logged in. Used for routing and conditional rendering - its Boolean
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser);
      authUser ? setLogin(true) : setLogin(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleLogin = () => {
    setLogin(!login);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const signUpEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await signInWithPopup(auth, provider);
        localStorage.setItem('login', true);
        console.log('signin', result);
        resolve(result);
      } catch (error) {
        console.log('signin', error);
        reject(error);
      }
    });
  };

  const signOutUser = async () => {
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
        signInEmail,
        signUpEmail,
        signInGoogle,
        signOutUser,
        imglib,
        resetPassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
