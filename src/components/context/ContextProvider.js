import { createContext, useContext, useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { createTheme } from '@mui/material';

//firestore testing
// import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, provider, imageref } from './FireBase';
// import { db,  storage } from './FireBase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getDownloadURL, ref } from 'firebase/storage';

// import { async } from '@firebase/util';
import reducer from './reducer';

export const GlobalContext = createContext();

export const useValue = () => {
  return useContext(GlobalContext);
};

// var post1 = {
//   firstn: 'Ada',
//   lastn: 'Lovelace',
//   content:
//     'Images formed and reformed: a flickering montage of the Sprawl’s towers and ragged Fuller domes, dim figures moving toward him in the center of his closed left eyelid. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the blowers and the amplified breathing of the fighters. He woke and found her stretched beside him in the tunnel’s ceiling. Her cheekbones flaring scarlet as Wizard’s Castle burned, forehead drenched with azure when Munich fell to the Tank War, mouth touched with hot gold as a paid killer in the tunnel’s ceiling. Still it was a long strange way home over the black water and the amplified breathing of the previous century. They floated in the dark, curled in his devotion to esoteric forms of tailor-worship. Then a mist closed over the black water and the amplified breathing of the arcade showed him broken lengths of damp chipboard and the drifting shoals of waste. Case had never seen him wear the same suit twice, although his wardrobe seemed to consist entirely of meticulous reconstruction’s of garments of the car’s floor. The two surviving Founders of Zion were old men, old with the movement of the train, their high heels like polished hooves against the gray metal of the blowers and the amplified breathing of the fighters.',
//   img: img,
// };

// addDoc(collection(db, 'posts'), post)
//   .then((docRef) => console.log('Document written with ID: ', docRef.id))
//   .catch((e) => console.error('Error adding document: ', e));

// const query = getDocs(collection(db, 'posts')).then((query) => {
//   query.forEach((post) => {
//     let x = post.data();
//     // console.log(`${post.id} => `, post.data());
//     // console.log(`${post.id} => ${x.firstn} and ${post1}`);
//   });
// });

export function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 400,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'start',
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
    loading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialstate);

  const [user, setUser] = useState({});
  const [mode, setMode] = useState('dark');
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
        main: '#f44336',
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      currentuser ? setLogin(true) : setLogin(false);
      console.log('useState', user, currentuser);
    });
    return () => {
      unsubscribe();
    };
  });

  const toggleLogin = () => {
    setLogin(!login);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
      console.log('logged out ', user);
    });
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
        user,
        setUser,
        signOutUser,
        signInGoogle,
        imageref,
        imglib,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
