import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
// import Options from './Options';
import { useValue } from '../context/ContextProvider';
import PostExpandCard from '../content/PostExpandCard';
import CmplxReviewCard from '../content/CmplxReviewCard';
import { Masonry } from '@mui/lab';

const PostsList = ({ documents }) => {
  const {
    state: { lightbox },
    dispatch,
    login,
    currentUser,
  } = useValue();

  console.log(documents);

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
              <PostExpandCard key={doc.id} doc={doc} />
            ))}
            <CmplxReviewCard />
          </Masonry>
        </Box>
      </Box>
    </div>
  );
};
export default PostsList;
