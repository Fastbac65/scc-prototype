import { Fab, Tooltip } from '@mui/material';
import Lightbox from 'react-spring-lightbox';
import { useValue } from '../context/ContextProvider';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useEffect, useState } from 'react';
import CloseLightBox from './CloseLightBox';

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
            // border: 1,
            // borderColor: 'red',
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
          <ArrowBackIosRoundedIcon fontSize='medium' />
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
          <ArrowForwardIosRoundedIcon fontSize='medium' />
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
        renderFooter={() => <CloseLightBox />}
        renderPrevButton={() => <Prev />}
        renderNextButton={() => <Next />}
        // renderImageOverlay={() => <CloseLightBox />}
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
        pageTransitionConfig={{
          from: { transform: 'scale(0.3)', opacity: 0.5 },
          enter: { transform: 'scale(1)', opacity: 1 },
          leave: { transform: 'scale(0.3)', opacity: 0 },
          config: { mass: 1, tension: 320, friction: 32 },
        }}
      ></Lightbox>
    </>
  );
};

export default CoolLightbox;
