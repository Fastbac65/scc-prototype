import { CardMedia, ImageList, ImageListItem } from '@mui/material';
import { Fab, Tooltip, Box } from '@mui/material';

import { useEffect, useState } from 'react';
import Lightbox from 'react-spring-lightbox';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useValue } from '../context/ContextProvider';

// defines how we layout different numbers of images. Each entry is column count
const layout = [1, 2, 3, 4, 5, 6];
const height = [120, 120, 120, 120, 120, 120];
// const height = [120, 120, 120, 75, 75, 75];

const PostImagesList = ({ files, collectionName }) => {
  const { theme, imglib } = useValue();
  const [imageURLs, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // picks an initial photo from the library
    const indx = Math.floor(Math.random() * imglib.length);
    let url = imglib[indx];
    setImageURLs([url]);
    setImages([{ src: url }]);
    console.log('first effect ran', url);
  }, []);

  useEffect(() => {
    // basically does nothing until there are files
    var urls = [];
    var imageSrc = [];
    if (files.length) {
      console.log('if files was true');
      files.map((file, indx) => {
        var url = URL.createObjectURL(file);
        urls = [...urls, url];
        imageSrc.push({ src: url, alt: url });
      });
      setImageURLs(urls);
      setImages(imageSrc);
    }
    if (!files.length) {
      console.log('there are no files');
    }

    console.log('main effect ran');
  }, [files]);

  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentImageIndex(currentImageIndex - 1);
    // lightbox.currentIndx > 0 && dispatch({ type: 'LIGHTBOX-1' });
  };
  const gotoNext = () => {
    currentImageIndex + 1 < imageURLs.length && setCurrentImageIndex(currentImageIndex + 1);
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
            display: currentImageIndex === imageURLs.length - 1 ? 'none' : 'flex',
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

  console.log(imageURLs);
  console.log(images);
  console.log(files);

  const imgtest = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader7.jpeg?alt=media&token=9ff47599-4360-4649-bf48-a60730cea6c5',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader5.jpeg?alt=media&token=8acd48ec-9c4c-404b-b242-9031eb2c7a0a',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader4.jpeg?alt=media&token=f2ede123-a80e-468a-bff7-ce5c26d094c9',
    },
  ];

  return (
    <div>
      {imageURLs.length !== 0 && (
        <ImageList
          gap={1}
          sx={{ width: '100%', height: 'auto', maxHeight: 150, maxWidth: 350 }}
          rowHeight={150}
          // cols={layout[files.length - 1]}
          cols={files.length}
        >
          {imageURLs.map(
            (imageURL, indx) =>
              imageURL && (
                <ImageListItem key={indx}>
                  <CardMedia
                    component='img'
                    // height={height[files.length - 1]}
                    height={150}
                    src={imageURL}
                    alt={collectionName}
                    loading='lazy'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentImageIndex(indx);
                      setOpen(true);
                    }}
                  />
                  {/* <img src={imageURL} alt={collectionName} loading='lazy' /> */}
                </ImageListItem>
              )
          )}
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
        </ImageList>
      )}
    </div>
  );
};
export default PostImagesList;
