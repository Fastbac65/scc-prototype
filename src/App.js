import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

// import PathTrack from './components/PathTrack';
import ResponsiveAppBar from './components/ResponsiveAppBar';
// import HeaderTabs from './components/HeaderTabs';
import Home from './components/Home';
import { useValue } from './components/context/ContextProvider';
import ScrollRouteTop from './components/utils/ScrollRouteTop';
import Notification from './components/Notification';
// import Test from './components/Test';
import Loading from './components/Loading';
import Modal from './components/Modal';
import Footer from './components/Footer';
import CompleteVerification from './components/user/CompleteVerification';
import ContentCompetitors from './components/content/ContentCompetitors';
import ContentCompetitorsSwim from './components/content/ContentCompetitorsSwim';
import ContentCompetitorsCLS from './components/content/ContentCompetitorsCLS';

// page imports
import PostView from './components/PostView';
import PageLoading from './components/utils/Loading';

// lazy pages
const VenueHire = lazy(() => import('./components/VenueHire'));
const Nippers = lazy(() => import('./components/Nippers'));
const Competitors = lazy(() => import('./components/Competitors'));
const History = lazy(() => import('./components/History'));
const Patrol = lazy(() => import('./components/Patrol'));
const Members = lazy(() => import('./components/Members'));
const Posts = lazy(() => import('./components/Posts'));
const SccLogin = lazy(() => import('./components/user/SccLogin'));
const SccSignup = lazy(() => import('./components/user/SccSignup'));
const Gallery = lazy(() => import('./components/Gallery'));
const AuthInsta = lazy(() => import('./components/user/AuthInsta'));
const EmailVerification = lazy(() => import('./components/user/EmailVerification'));

// lazy major components - trying to break up the initial bundle for parallel downloads
const RecentPosts = lazy(() => import('./components/RecentPosts'));

function App() {
  const { login, theme, currentUser } = useValue();
  let location = useLocation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollRouteTop />
        <Loading />
        <Modal />
        <Notification />
        <ResponsiveAppBar />
        {!currentUser && <EmailVerification />}
        {/* <PathTrack /> */}

        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path='/auth' element={<AuthInsta />}></Route>
            <Route path='/verify' element={<CompleteVerification />}></Route>
            <Route exact path='posts' element={<Posts />}>
              <Route path=':postId' element={<PostView />}></Route>
            </Route>
            <Route exact path='nippers' element={<Nippers />}></Route>
            <Route exact path='competitors/*' element={<Competitors />}>
              <Route index element={<ContentCompetitors />} />
              <Route path='boaties' element={<ContentCompetitors />}></Route>
              <Route path='swimmers' element={<ContentCompetitorsSwim />}></Route>
              <Route path='champs' element={<ContentCompetitorsCLS />}></Route>
            </Route>

            <Route exact path='/history' element={<History />}></Route>
            <Route exact path='/gallery' element={<Gallery />}></Route>
            <Route exact path='/hire' element={<VenueHire />}></Route>
            {login && <Route exact path='/members' element={<Members />}></Route>}
            {login && <Route exact path='/patrol' element={<Patrol />}></Route>}
            {!currentUser && <Route exact path='/login' element={<SccLogin />}></Route>}
            {!currentUser && <Route exact path='/signup' element={<SccSignup />}></Route>}
            {/* <Route exact path='/test' element={<Test />}></Route> */}
            <Route exact path='/*' element={<Home />}></Route>
            {/* <Route path='*' element={<Home />}></Route> */}
          </Routes>
        </Suspense>
        {!location.pathname.includes('/posts') && <RecentPosts />}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
