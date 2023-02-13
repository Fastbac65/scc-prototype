import { Box, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCardSingle from '../content/PostExpandCardSingle';
import { memo, useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';

const SharedPostView = ({ documents }) => {
  const { currentUser } = useValue();

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Box component='section' mx={1}>
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
    </div>
  );
};
export default memo(SharedPostView);
