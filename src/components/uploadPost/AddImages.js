import { Add } from '@mui/icons-material';
import { Button, Input } from '@mui/material';
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
        inputProps={{ accept: 'image/*', multiple: true }}
        onChange={handleChange}
      />
      <Button size='small' variant='contained' startIcon={<Add />} sx={{ borderRadius: 25 }} onClick={handleClick}>
        Photo
      </Button>
    </div>
  );
};

export default AddImages;
