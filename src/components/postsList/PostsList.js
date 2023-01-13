import { Box, Tooltip, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCard from '../content/PostExpandCard';
import { Masonry } from '@mui/lab';
import { useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';

const PostsList = ({ documents }) => {
  const { dispatch, login, currentUser } = useValue();

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Box component='section' mx={1}>
        <Typography variant='h4' pt={1} mx={2}>
          Our Recent Posts & Upcoming Activities
        </Typography>
        <Typography variant='body1' color='text' m={2} mb={4}>
          The latest from our members, boaties and nippers
        </Typography>
        <Box pr={{ xs: 0, sm: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Masonry
            // sx={{ border: '1px dotted red' }}
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={{ xs: 1 }}
          >
            {documents.map((doc, indx) => (
              <PostExpandCard
                key={doc.id}
                user={currentUser}
                doc={doc}
                setOpen={setOpen}
                setCurrentImageIndex={setCurrentImageIndex}
                setImages={setImages}
              />
            ))}
          </Masonry>
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
export default PostsList;
