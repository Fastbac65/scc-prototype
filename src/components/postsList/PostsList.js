import { Box, Tooltip, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCard from '../content/PostExpandCard';
import { Masonry } from '@mui/lab';
import { useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';

import RecentSocialPosts from './RecentSocialPosts';

const PostsList = ({ documents }) => {
  const { dispatch, login, currentUser } = useValue();

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const recentSocialDocs = [
    'https://www.facebook.com/permalink.php?story_fbid=pfbid0xJbBbDzP1juDtCUvcMknnSC5x3KSvxqK81z3Wx8ftvoeeyjQ8uM8diiJJextVprTl&id=792346234174867',
    'https://www.instagram.com/p/CndCI7hhIVe/',
    'https://www.instagram.com/p/CmVLatKPpip/',
  ];

  return (
    <div>
      <Box component='section' mx={1}>
        <Typography variant='h4' pt={1} mx={2}>
          The Latest & Upcoming Activities
        </Typography>
        <Typography variant='h6' color='text' m={2} mb={4}>
          ..from our members, boaties and nippers
        </Typography>
        {/* <SocialPostCard /> */}
        <Typography variant='h6' pt={1} mx={2}>
          Our Recent Social Posts
        </Typography>{' '}
        <RecentSocialPosts recentSocialDocs={recentSocialDocs} />
        <Typography variant='h6' pt={1} mx={2}>
          Our Recent Members Posts
        </Typography>
        <Box pr={{ xs: 0, sm: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Masonry
            // sx={{ border: '1px dotted red' }}
            columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
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
