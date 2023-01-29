import { Box, Grid, Tooltip, Typography } from '@mui/material';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCard from '../content/PostExpandCard';
import { Masonry } from '@mui/lab';
import { memo, useState } from 'react';
import PostsLightBox from '../imagesList/PostsLightBox';
import { doc } from 'firebase/firestore';
import SocialPostCard from '../content/SocialPostCard';

const RecentSocialPosts = ({ recentSocialDocs, script }) => {
  return (
    <div>
      <Box component='section' mx={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={{ xs: 1 }}>
            <Grid key={doc.id} item xs={12} sm={6} md={6} lg={4}>
              <SocialPostCard socialUrl={recentSocialDocs[0].postUrl} script={recentSocialDocs[0].script} />
            </Grid>
            <Grid key={doc.id} item xs={12} sm={6} md={6} lg={4}>
              <SocialPostCard socialUrl={recentSocialDocs[1].postUrl} script={recentSocialDocs[1].script} />
            </Grid>
            <Grid key={doc.id} item xs={12} sm={6} md={6} lg={4}>
              <SocialPostCard socialUrl={recentSocialDocs[2].postUrl} script={recentSocialDocs[2].script} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
export default memo(RecentSocialPosts);
