import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';

import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import SharedPostView from './postsList/SharedPostView';

const Test = () => {
  let params = useParams();
  const [documents] = useOutletContext();

  var postDoc = documents.filter((doc) => doc.id === params.postId);

  console.log(postDoc);

  return (
    <>
      <Container maxWidth='lg' sx={{ px: '6px', textAlign: 'center', justifyContent: 'center' }}>
        {postDoc.length !== 0 && <SharedPostView documents={postDoc} />}
      </Container>
    </>
  );
};

export default Test;
