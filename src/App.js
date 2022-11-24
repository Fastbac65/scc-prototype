import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, responsiveFontSizes } from '@mui/material';

import PathTrack from './components/PathTrack';
import ResponsiveAppBar from './components/ResponsiveAppBar';
// import HeaderTabs from './components/HeaderTabs';
import Home from './components/Home';
import Blog from './components/Blog';
import SccLogin from './components/SccLogin';
import SccSignup from './components/SccSignup';
import History from './components/History';
import Training from './components/Training';
import { useValue } from './components/context/ContextProvider';

function App() {
  const { login, theme } = useValue();

  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}

export default App;
