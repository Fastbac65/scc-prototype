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
import Patrol from './components/Patrol';
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
import Nippers from './components/Nippers';
import Members from './components/Members';
import Competitors from './components/Competitors';
import Content2CardsBoaties from './components/content/Content2CardsBoaties';
import Content2CardsChamps from './components/content/Content2CardsChamps';
import Content2CardsSwimmers from './components/content/Content2CardsSwimmers';
import ContentCompetitors from './components/content/ContentCompetitors';
import RecentPosts from './components/RecentPosts';

function App() {
  const { login, theme, currentUser } = useValue();

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
          <Route exact path='nippers' element={<Nippers />}></Route>
          <Route exact path='competitors/*' element={<Competitors />}>
            <Route index element={<ContentCompetitors />} />
            <Route path='boaties' element={<Content2CardsBoaties />}></Route>
            <Route path='swimmers' element={<Content2CardsSwimmers />}></Route>
            <Route path='champs' element={<Content2CardsChamps />}></Route>
          </Route>

          <Route exact path='/history' element={<History />}></Route>
          <Route exact path='/gallery' element={<Gallery />}></Route>
          <Route exact path='/hire' element={<VenueHire />}></Route>
          {login && <Route exact path='/members' element={<Members />}></Route>}
          {login && <Route exact path='/patrol' element={<Patrol />}></Route>}
          {!currentUser && <Route exact path='/login' element={<SccLogin />}></Route>}
          {!currentUser && <Route exact path='/signup' element={<SccSignup />}></Route>}
          <Route exact path='/test' element={<Test />}></Route>
          <Route exact path='/*' element={<Home />}></Route>
          {/* <Route path='*' element={<Home />}></Route> */}
        </Routes>
        <RecentPosts />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
