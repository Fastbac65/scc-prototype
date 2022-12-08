import { CardMedia, ImageList, ImageListItem } from '@mui/material';
import { Fab, Tooltip, Box } from '@mui/material';

import { useEffect, useState } from 'react';
import Lightbox from 'react-spring-lightbox';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useValue } from '../context/ContextProvider';
import PostsLightBox from '../imagesList/PostsLightBox';

// defines how we layout different numbers of images. Each entry is column count
// const layout = [1, 2, 3, 4, 5, 6];
// const height = [120, 120, 120, 120, 120, 120];
// const height = [120, 120, 120, 75, 75, 75];

const PostImagesList = ({ files, collectionName }) => {
  const { theme, imglib } = useValue();
  // const [imageURLs, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // picks an initial photo from the library
    const indx = Math.floor(Math.random() * imglib.length);
    let url = imglib[indx];
    // setImageURLs([url]);
    setImages([{ src: url }]);
    console.log('first effect ran', url);
  }, []);

  useEffect(() => {
    // basically does nothing until there are files

    var imgs = [];
    if (files.length) {
      console.log('if files was true');
      files.map((file, indx) => {
        var url = URL.createObjectURL(file);
        // imgs.push({ src: url, alt: url });
        imgs = [...imgs, { src: url, alt: url }];
      });
      setImages(imgs);
    }
    if (!files.length) {
      console.log('there are no files');
      // may need to reload a default image if all files are deleted in the UI
    }

    console.log('main effect ran');
  }, [files]);

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
      {images.length !== 0 && (
        <ImageList
          gap={1}
          sx={{ width: '100%', height: 'auto', maxHeight: 150, maxWidth: 350 }}
          rowHeight={150}
          // cols={layout[files.length - 1]}
          cols={files.length}
        >
          {images.map(
            (image, indx) =>
              image && (
                <ImageListItem key={indx}>
                  <CardMedia
                    component='img'
                    // height={height[files.length - 1]}
                    height={150}
                    src={image.src}
                    alt={image?.alt}
                    loading='lazy'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentImageIndex(indx);
                      setOpen(true);
                    }}
                  />
                  {/* <img src={image} alt={collectionName} loading='lazy' /> */}
                </ImageListItem>
              )
          )}
          <PostsLightBox
            open={open}
            setOpen={setOpen}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            images={images}
          />
        </ImageList>
      )}
    </div>
  );
};
export default PostImagesList;
