import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import profile from '../../static/imgs/fastbac-sq.png';
import Options from './Options';
import { useValue } from '../context/ContextProvider';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
export default function ImagesList() {
  const {
    state: { lightbox },
    dispatch,
    login,
  } = useValue();

  const handleImgClick = (e) => {
    const src = e.target.src.split('?')[0];
    let indx = 0;
    while (src !== images[indx].img) indx++;

    dispatch({
      type: 'OPEN_LIGHTBOX',
      payload: { ...lightbox, open: true, currentIndx: indx },
    });
    console.log(src, lightbox.currentIndx, lightbox.open, indx);
  };

  return (
    <>
      <ImageList variant='quilted' cols={4} rowHeight={150}>
        {images.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{
              opacity: '0.8',
              transition: 'opacity 0.3s linear',
              cursor: 'pointer',
              '&:hover': { opacity: 1 },
            }}
          >
            <img
              {...srcset(item.img, 150, item.rows, item.cols)}
              alt={item.title}
              onClick={handleImgClick}
              loading='lazy'
            />
            <Typography
              variant='body2'
              component='span'
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                p: '3px',
                borderTopRightRadius: 10,
              }}
            >
              {moment(new Date() - Math.random() * 50000 * 3600).fromNow()}
            </Typography>
            {login && (
              <Tooltip title='TezD' placement='top'>
                <Avatar
                  sx={{
                    position: 'absolute',
                    bottom: '3px',
                    right: '3px',
                  }}
                  src={profile}
                  alt='TezD'
                />
              </Tooltip>
            )}
            <Options />
          </ImageListItem>
        ))}
      </ImageList>
      {/* <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}> */}
      {/* <ImageList cols={3} gap={4}>
        {images.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&h=160&fit=crop&auto=format`}
              // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList> */}
      {/* </Box> */}
    </>
  );
}

const images = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];

const images2 = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
