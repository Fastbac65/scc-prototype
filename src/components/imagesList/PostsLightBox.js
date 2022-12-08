import { CardMedia, ImageList, ImageListItem } from '@mui/material';
import { Fab, Tooltip, Box } from '@mui/material';

import Lightbox from 'react-spring-lightbox';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useValue } from '../context/ContextProvider';

const PostsLightBox = ({ open, setOpen, currentImageIndex, setCurrentImageIndex, images }) => {
  const { theme } = useValue();

  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentImageIndex(currentImageIndex - 1);
    // lightbox.currentIndx > 0 && dispatch({ type: 'LIGHTBOX-1' });
  };
  const gotoNext = () => {
    currentImageIndex + 1 < images.length && setCurrentImageIndex(currentImageIndex + 1);
    // lightbox.currentIndx + 1 < images.length && dispatch({ type: 'LIGHTBOX+1' });
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
            display: currentImageIndex === 0 ? 'none' : 'flex',
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
            display: currentImageIndex === images.length - 1 ? 'none' : 'flex',
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
  const CloseLightBox = () => {
    return (
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Tooltip enterDelay={2000} title='Close' placement='right'>
          <Fab
            size='small'
            color='primary'
            onClick={handleClose}
            sx={{
              background: 'none',
              boxShadow: 'none',
              zIndex: theme.zIndex.modal + 2,
              '&:hover': {
                color: '#f9de00',
                background: 'none',
              },
            }}
          >
            <ArrowBackIcon fontSize='medium' />
          </Fab>
        </Tooltip>
      </Box>
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Lightbox
      isOpen={open}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      renderHeader={() => <CloseLightBox />}
      // renderFooter={() => <CloseLightBox />}
      renderPrevButton={() => <Prev />}
      renderNextButton={() => <Next />}
      // renderImageOverlay={() => <CloseLightBox />}
      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}
      style={{ zIndex: theme.zIndex.modal + 1, background: 'rgb(0,0,0,.8)' }}
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
    />
  );
};
export default PostsLightBox;
