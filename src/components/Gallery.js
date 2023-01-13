import { Container } from '@mui/system';
import React from 'react';
import { useValue } from './context/ContextProvider';
import useFirestore from './context/useFirestore';
import CoolLightbox from './imagesList/CoolLightBox';
import ImagesList from './imagesList/ImagesList';
import Upload from './upload/Upload';

const Gallery = () => {
  const { login } = useValue();

  // useFirestore to retrieve an array of Docs each with .id & .data
  const { documents } = useFirestore('Gallery');

  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
      {login && <Upload collectionName={'Gallery'} />}
      <ImagesList documents={documents} collectionName={'Gallery'} />
      <CoolLightbox documents={documents} collectionName={'Gallery'} />
    </Container>
  );
};

export default Gallery;
