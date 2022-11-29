import { Add } from '@mui/icons-material';
import { Fab, Input } from '@mui/material';
import React, { useRef } from 'react';

const Form = ({ setFiles }) => {
  // const Form = ({ setFiles }) => {
  // const [files, setFiles] = useState([]);
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();

    console.log('form:', fileRef.current.value);
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    console.log('form change:', e.target.files);
    fileRef.current.value = null; //allows the same file to be uploaded twice
  };

  return (
    <form>
      <Input
        type='file'
        inputRef={fileRef}
        sx={{ display: 'flex' }}
        inputProps={{ accept: 'image/jpg, image/png', multiple: true }}
        onChange={handleChange}
      />
      <Fab color='primary' aria-label='add' onClick={handleClick}>
        <Add fontSize='large' />
      </Fab>
    </form>
  );
};

export default Form;
