import { Box, Grid, Tooltip, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCard from '../content/PostExpandCard';
import { Masonry } from '@mui/lab';
import { memo, useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';
import { doc } from 'firebase/firestore';
import SocialPostCard from '../content/SocialPostCard';

const RecentSocialPosts = ({ recentSocialDocs }) => {
  const { dispatch, login, currentUser } = useValue();
  // const PostTypeSelect = ({ doc, user }) => {
  //   //
  //   if (doc.data.postType === '') {
  //     return null;
  //   } else if (doc.data.postType === 'Instagram') {
  //     console.log('insta post:');
  //     return <SocialPostCard user={user} doc={doc} />;
  //   } else return null;
  // };

  return (
    <div>
      <Box component='section' mx={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={{ xs: 1 }}>
            <Grid key={doc.id} item xs={12} sm={6} md={4} lg={4}>
              <SocialPostCard socialUrl={recentSocialDocs[0]} />
            </Grid>
            <Grid key={doc.id} item xs={12} sm={6} md={4} lg={4}>
              <SocialPostCard socialUrl={recentSocialDocs[1]} />
            </Grid>
            <Grid key={doc.id} item xs={12} sm={6} md={4} lg={4}>
              <SocialPostCard socialUrl={recentSocialDocs[2]} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
export default memo(RecentSocialPosts);
