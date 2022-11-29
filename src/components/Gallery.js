import { Container } from '@mui/system';
import React from 'react';
import useFirestore from './context/useFirestore';
import CoolLightbox from './imagesList/CoolLightBox';
import ImagesList from './imagesList/ImagesList';
import Options from './imagesList/Options';
import Loading from './Loading';
import Form from './upload/Form';
import ProgressList from './upload/progresslist/ProgressList';
import Upload from './upload/Upload';

const Gallery = () => {
  const { documents } = useFirestore('Gallery');

  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <Loading />
      <Upload />
      <ImagesList documents={documents} collectionName={'Gallery'} />
      <CoolLightbox documents={documents} collectionName={'Gallery'} />
    </Container>
  );
};

export default Gallery;
