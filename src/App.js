import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import PathTrack from './components/PathTrack';
import ResponsiveAppBar from './components/ResponsiveAppBar';
// import HeaderTabs from './components/HeaderTabs';
import Home from './components/Home';
import Posts from './components/Posts';
import SccLogin from './components/user/SccLogin';
import SccSignup from './components/user/SccSignup';
import History from './components/History';
import Training from './components/Training';
import { useValue } from './components/context/ContextProvider';
import ScrollRouteTop from './components/utils/ScrollRouteTop';
import Notification from './components/Notification';
import Test from './components/Test';
import Gallery from './components/Gallery';
import VenueHire from './components/VenueHire';
import Loading from './components/Loading';
import Modal from './components/Modal';
import Footer from './components/Footer';
import EmailVerification from './components/user/EmailVerification';
import AuthInsta from './components/user/AuthInsta';
import CompleteVerification from './components/user/CompleteVerification';

function App() {
  const { login, theme } = useValue();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollRouteTop />
        <Loading />
        <Modal />
        <Notification />
        <ResponsiveAppBar />
        <EmailVerification />
        {/* <PathTrack /> */}

        <Routes>
          <Route path='/auth' element={<AuthInsta />}></Route>
          <Route path='/verify' element={<CompleteVerification />}></Route>
          <Route exact path='/posts' element={<Posts />}></Route>
          <Route exact path='/history' element={<History />}></Route>
          <Route exact path='/gallery' element={<Gallery />}></Route>
          <Route exact path='/hire' element={<VenueHire />}></Route>
          {login && <Route exact path='/training' element={<Training />}></Route>}
          {!login && <Route exact path='/login' element={<SccLogin />}></Route>}
          {!login && <Route exact path='/signup' element={<SccSignup />}></Route>}
          <Route exact path='/test' element={<Test />}></Route>
          <Route exact path='/*' element={<Home />}></Route>
          {/* <Route path='*' element={<Home />}></Route> */}
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
