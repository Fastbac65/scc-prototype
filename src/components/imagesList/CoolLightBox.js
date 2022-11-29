// import { Backdrop, Box } from '@mui/material';
// import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import Lightbox from 'react-spring-lightbox';
import { useValue } from '../context/ContextProvider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const test = [
  {
    src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    loading: 'lazy',
    alt: 'Breakfast',
  },
  {
    src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    loading: 'lazy',
    alt: 'Burger',
  },
  {
    src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    loading: 'lazy',
    alt: 'Camera',
  },
  {
    src: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    loading: 'lazy',
    alt: 'Coffee',
  },
  {
    src: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    loading: 'lazy',
    alt: 'Hats',
  },
  {
    src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    loading: 'lazy',
    alt: 'Honey',
    author: '@arwinneil',
  },
  {
    src: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    loading: 'lazy',
    alt: 'Basketball',
  },
  {
    src: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    loading: 'lazy',
    alt: 'Fern',
  },
  {
    src: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    loading: 'lazy',
    alt: 'Mushrooms',
  },
  {
    src: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    loading: 'lazy',
    alt: 'Tomato basil',
  },
  {
    src: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    loading: 'lazy',
    alt: 'Sea star',
  },
  {
    src: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    loading: 'lazy',
    alt: 'Bike',
  },
];

const CoolLightbox = ({ documents }) => {
  const {
    state: { lightbox },
    dispatch,
    theme,
  } = useValue();
  const [images, setImages] = useState([]);
  // initialise the images array to pass into lightbox
  useEffect(() => {
    var imageArray = [];
    documents.map((doc) => {
      imageArray.push({ src: doc.data.imageURL, alt: doc.data.uName, loading: 'lazy' });
      setImages(imageArray);
    });
    console.log(images);
  }, [documents]);

  const gotoPrevious = () => {
    // currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
    lightbox.currentIndx > 0 && dispatch({ type: 'LIGHTBOX-1' });
  };
  const gotoNext = () => {
    // currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);
    lightbox.currentIndx + 1 < images.length && dispatch({ type: 'LIGHTBOX+1' });
  };

  const Prev = () => {
    return (
      <>
        <Fab
          color='primary'
          onClick={gotoPrevious}
          sx={{
            display: lightbox.currentIndx === 0 ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            boxShadow: 'none',
            position: 'absoulte',
            left: 20,
            zIndex: theme.zIndex.modal + 2,
            '&:hover': {
              // color: ${({ theme }) => theme.pageContentLinkHoverColor};
              color: '#f9de00',
              background: 'none',
            },
          }}
        >
          <ArrowBackIosRoundedIcon fontSize='large' />
        </Fab>
      </>
    );
  };
  const Next = () => {
    return (
      <>
        <Fab
          color='primary'
          onClick={gotoNext}
          sx={{
            display: lightbox.currentIndx === images.length - 1 ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            boxShadow: 'none',
            position: 'absoulte',
            right: 20,
            zIndex: theme.zIndex.modal + 2,
            '&:hover': {
              // color: ${({ theme }) => theme.pageContentLinkHoverColor};
              color: '#f9de00',
              background: 'none',
            },
          }}
        >
          <ArrowForwardIosRoundedIcon fontSize='large' />
        </Fab>
      </>
    );
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LIGHTBOX' });
  };
  return (
    <>
      <Lightbox
        isOpen={lightbox.open}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={images}
        currentIndex={lightbox.currentIndx}
        /* Add your own UI */
        // renderHeader={() => (<CustomHeader />)}
        // renderFooter={() => (<CustomFooter />)}
        renderPrevButton={() => <Prev />}
        renderNextButton={() => <Next />}
        // renderImageOverlay={() => (<ImageOverlayComponent >)}

        /* Add styling */
        // className="cool-class"
        // style={{ background: "grey" }}
        style={{ zIndex: theme.zIndex.modal + 1, background: 'rgb(0,0,0,.8)', width: '100%' }}
        //sx={{ zIndex: (theme) => theme.zIndex.modal + 1}}

        /* Handle closing */
        onClose={handleClose}
        /* Use single or double click to zoom */
        singleClickToZoom
        /* react-spring config for open/close animation */
        // pageTransitionConfig={{
        //   from: { transform: 'scale(0.3)', opacity: 0.5 },
        //   enter: { transform: 'scale(1)', opacity: 1 },
        //   leave: { transform: 'scale(0.3)', opacity: 0 },
        //   config: { mass: 1, tension: 320, friction: 32 },
        // }}
      ></Lightbox>
    </>
  );
};

export default CoolLightbox;
