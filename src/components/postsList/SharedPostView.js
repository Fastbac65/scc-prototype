import { Box, Skeleton, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCardSingle from '../content/PostExpandCardSingle';
import { memo, useEffect, useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';

const SharedPostView = ({ documents }) => {
  const { currentUser } = useValue();
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Box width='100%' sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box width={500} sx={{ mt: 4 }}>
            <Skeleton />
            <Skeleton />
            <Skeleton variant='rounded' height={200} />
            <Skeleton />
            <Skeleton variant='rounded' height={100} />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        </Box>
      ) : (
        <Box component='section' mx={1} pb={3}>
          <Typography variant='h6' pt={1} mx={2}>
            Posted by {documents[0].data.uName}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'left' }}>
            <PostExpandCardSingle
              user={currentUser}
              doc={documents[0]}
              setOpen={setOpen}
              setCurrentImageIndex={setCurrentImageIndex}
              setImages={setImages}
              maxWidth={500}
            />

            <PostsLightBox
              open={open}
              setOpen={setOpen}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              images={images}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default memo(SharedPostView);
