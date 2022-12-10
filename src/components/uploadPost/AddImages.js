import { Add } from '@mui/icons-material';
import { Box, Button, Fab, Input } from '@mui/material';
import React, { useRef } from 'react';

const AddImages = ({ files, setFiles }) => {
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const allFiles = [...files, ...e.target.files];
    console.log(allFiles);

    setFiles(allFiles);
    fileRef.current.value = null; //allows the same file to be uploaded twice
  };

  return (
    <div>
      <Input
        type='file'
        inputRef={fileRef}
        sx={{ display: 'none' }}
        inputProps={{ accept: 'image/jpg, image/png', multiple: true }}
        onChange={handleChange}
      />
      <Button variant='contained' startIcon={<Add />} sx={{ borderRadius: 25 }} onClick={handleClick}>
        Photo
      </Button>
    </div>
  );
};

export default AddImages;
