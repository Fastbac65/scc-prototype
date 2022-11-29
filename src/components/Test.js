import { Container } from '@mui/system';
import React from 'react';
import CoolLightbox from './imagesList/CoolLightBox';
import ImagesList from './imagesList/ImagesList';
import Options from './imagesList/Options';
import Loading from './Loading';
import Form from './upload/Form';
import ProgressList from './upload/progresslist/ProgressList';
import Upload from './upload/Upload';

const Test = () => {
  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
      ************ Component Test Page *****************
      <Loading />
      <Upload />
      <ImagesList />
      <CoolLightbox />
    </Container>
  );
};

export default Test;
