import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, responsiveFontSizes } from '@mui/material';
import { ContextProvider } from './components/context/ContextProvider';
import PathTrack from './components/PathTrack';
import ResponsiveAppBar from './components/ResponsiveAppBar';
// import HeaderTabs from './components/HeaderTabs';
import Home from './components/Home';
import Blog from './components/Blog';
import SccLogin from './components/SccLogin';
import SccSignup from './components/SccSignup';
import History from './components/History';
import Training from './components/Training';

function App() {
  const [mode, setMode] = useState('dark');
  const [login, setLogin] = useState(false);
  const toggleLogin = () => {
    setLogin(!login);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContextProvider
          theme={theme}
          toggleColorMode={toggleColorMode}
          login={login}
          setLogin={setLogin}
          toggleLogin={toggleLogin}
        >
          <CssBaseline />
          <Router>
            <PathTrack />
            <ResponsiveAppBar />
            <Routes>
              <Route exact path='/blog' element={<Blog />}></Route>
              <Route exact path='/history' element={<History />}></Route>
              {login && <Route exact path='/training' element={<Training />}></Route>}
              <Route exact path='/login' element={login ? <Home /> : <SccLogin />}></Route>
              <Route exact path='/signup' element={<SccSignup />}></Route>
              <Route exact path='/' element={<Home />}></Route>
              <Route path='*' element={<Home />}></Route>
            </Routes>
          </Router>
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
