import { Close } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { ImageCarousel } from './content/ImageCarousel';
import SimpleActionCard from './content/SimpleActionCard';
import { useValue } from './context/ContextProvider';
import Footer from './Footer';
import CoolLightbox from './imagesList/CoolLightBox';
import ImagesList from './imagesList/ImagesList';
import Options from './imagesList/Options';
import LoadingTest from './LoadingTest';
import Form from './upload/Form';
import ProgressList from './upload/progresslist/ProgressList';
import Upload from './upload/Upload';
import PasswordField from './user/PasswordField';
import scc1 from '../static/imgs/scc-fb-grp.jpeg';
import ChangeEmail from './user/ChangeEmail';
import ChangePassword from './user/ChangePassword';

const Test = () => {
  const { theme } = useValue();
  return (
    <>
      <ChangeEmail />
      <ChangePassword />

      <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ backgroundImage: `url(${scc1})` }}>
          <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)' }}>
            <p>************ Component Test Page *****************</p>
            <ImageCarousel />
            {/* <SimpleActionCard /> */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Test;
