import React, { useState } from 'react';
import Lightbox from 'react-spring-lightbox';
import { useValue } from '../context/ContextProvider';

const images = [
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

const CoolLightbox = () => {
  const { lightbox } = useValue();
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const gotoNext = () => currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);

  return (
    <Lightbox
      isOpen={false}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      // renderHeader={() => (<CustomHeader />)}
      // renderFooter={() => (<CustomFooter />)}
      // renderPrevButton={() => (<CustomLeftArrowButton />)}
      // renderNextButton={() => (<CustomRightArrowButton />)}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      // onClose={handleClose}

      /* Use single or double click to zoom */
      // singleClickToZoom

      /* react-spring config for open/close animation */
      // pageTransitionConfig={{
      //   from: { transform: "scale(0.75)", opacity: 0 },
      //   enter: { transform: "scale(1)", opacity: 1 },
      //   leave: { transform: "scale(0.75)", opacity: 0 },
      //   config: { mass: 1, tension: 320, friction: 32 }
      // }}
    />
  );
};

export default CoolLightbox;
