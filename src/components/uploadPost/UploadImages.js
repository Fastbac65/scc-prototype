import { Box } from '@mui/material';
import React, { useState } from 'react';

const UploadImages = ({ collectionName }) => {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}></Box>
    </div>
  );
};

export default UploadImages;
