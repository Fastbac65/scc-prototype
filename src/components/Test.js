import { Container } from '@mui/system';
import React from 'react';
import CoolLightbox from './imagesList/CoolLightBox';
import ImagesList from './imagesList/ImagesList';
import Options from './imagesList/Options';
import Loading from './Loading';
import Form from './upload/Form';

const Test = () => {
  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <Loading />
      <Form />
      <ImagesList />
      <CoolLightbox />
    </Container>
  );
};

export default Test;
