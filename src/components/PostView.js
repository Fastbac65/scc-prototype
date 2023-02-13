import { Box } from '@mui/system';

import { useOutletContext, useParams } from 'react-router-dom';
import SharedPostView from './postsList/SharedPostView';

const PostView = () => {
  let params = useParams();
  const [documents] = useOutletContext();

  var postDoc = documents.filter((doc) => doc.id === params.postId);

  console.log(postDoc);

  return (
    <>
      <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
        {postDoc.length !== 0 && <SharedPostView documents={postDoc} />}
      </Box>
    </>
  );
};

export default PostView;
