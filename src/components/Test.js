import { Close } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
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

const Test = () => {
  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <p>************ Component Test Page *****************</p>
      <LoadingTest />
      <Footer />
      <SimpleActionCard />
    </Container>
  );
};

export default Test;
