import { Link as RouterLink } from 'react-router-dom';

import { Box, Fab, Stack, Tooltip, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCard from '../content/PostExpandCard';
import { Masonry } from '@mui/lab';
import { useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';

import RecentSocialPosts from './RecentSocialPosts';
import { Collections, Navigation } from '@mui/icons-material';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const RecentPostsList = ({ documents }) => {
  const { currentUser, theme } = useValue();

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const recentSocialDocs = [
    {
      postUrl:
        'https://www.facebook.com/permalink.php?story_fbid=pfbid0xJbBbDzP1juDtCUvcMknnSC5x3KSvxqK81z3Wx8ftvoeeyjQ8uM8diiJJextVprTl&id=792346234174867',
      postType: 'facebook',
      script: true,
    },
    { postUrl: 'https://www.instagram.com/p/CoSrZ6pBx-P/', postType: 'instagram', script: true },
    { postUrl: 'https://www.instagram.com/p/CoQg4OdSzNs/', postType: 'instagram', script: true },
  ];

  const recentPosts = documents.slice(0, 6);

  return (
    <div>
      <Box component='section' mx={1} pb='1px'>
        <Typography variant='h4' pt={1} mx={2}>
          The Latest News & Upcoming Activities
        </Typography>
        <Typography variant='h6' color='text' mx={2}>
          ..from our members, boaties and nippers
        </Typography>
        <Typography variant='h6' py={1} mx={2}>
          Our Recent Members Posts
        </Typography>
        <Box pr={{ xs: 0, sm: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Masonry
            // sx={{ border: '1px dotted red' }}
            columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            spacing={{ xs: 1 }}
          >
            {recentPosts.map((doc, indx) => (
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
        <Stack spacing={1} direction='row' sx={{ pb: 2, display: 'flex', justifyContent: 'center' }}>
          {/* <Box component='div' sx={{ pb: 1, display: 'flex', justifyContent: 'center' }}> */}
          <Tooltip arrow placement='top-start' title='Show all posts' enterDelay={2000}>
            <Fab
              variant='extended'
              component={RouterLink}
              to='/posts'
              size='small'
              color='secondary'
              aria-label='see all posts'
            >
              <DynamicFeedIcon sx={{ mr: 1 }} />
              All Posts
            </Fab>
          </Tooltip>
          <Tooltip arrow placement='top-start' title='View Galleries' enterDelay={2000}>
            <Fab
              variant='extended'
              component={RouterLink}
              to='/gallery'
              size='small'
              color='secondary'
              aria-label='see all posts'
            >
              <Collections sx={{ mr: 1 }} />
              View Galleries
            </Fab>
          </Tooltip>
        </Stack>
        <Box
          sx={{
            mx: -1,
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
          }}
        >
          <Typography variant='h6' py={1} mx={2}>
            Our Recent Social Posts
          </Typography>
          <RecentSocialPosts recentSocialDocs={recentSocialDocs} />
        </Box>
      </Box>
    </div>
  );
};
export default RecentPostsList;
