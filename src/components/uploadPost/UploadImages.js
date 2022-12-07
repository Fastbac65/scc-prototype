import { Box } from '@mui/material';
import React, { useState } from 'react';
import AddImages from './AddImages';
import PostImagesList from './PostImageList';

const UploadImages = ({ collectionName }) => {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AddImages files={files} setFiles={setFiles} />
      </Box>
      <PostImagesList files={files} collectionName={collectionName} />
    </div>
  );
};

export default UploadImages;
