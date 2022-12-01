import { Avatar, Box, Button, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useValue } from '../context/ContextProvider';
import { auth } from '../context/FireBase';
import uploadFile from '../context/uploadFile';

const Profile = () => {
  const {
    currentUser,
    dispatch,
    state: { alert, modal },
  } = useValue();
  const [name, setName] = useState(currentUser?.displayName);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);

  // getting the new profile image file if one is selected
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
    dispatch({ type: 'START_LOADING' });
    let currentUserObj = { displayName: name, photoURL: photoURL };
    let imagesObj = { uName: name, uAvatar: photoURL };
    try {
      if (file) {
        const imageName = file.name.split('.')[0] + '_' + uuidv4() + '.' + file.name.split('.').pop();
        const url = await uploadFile(file, `profile/${currentUser?.displayName}/${imageName}`);

        if (currentUser?.photoURL) currentUserObj.photoURL = url;
        imagesObj.uAvatar = url;
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, severity: 'error', open: true, message: error.message, duration: 3000 },
      });
    }
    try {
      await updateProfile(auth.currentUser, currentUserObj);
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, severity: 'error', open: true, message: error.message, duration: 3000 },
      });
      console.log(error.message);
    }

    dispatch({ type: 'END_LOADING' });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { ...alert, severity: 'success', open: true, message: 'Profile updated successfully', duration: 3000 },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Box sx={{ mt: -2, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <TextField
            // autoFocus
            color='secondary'
            margin='normal'
            type='text'
            inputProps={{ minLength: 2 }}
            required
            label='Display Name'
            value={name || ''}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor='profilePhoto'>
            <Input accept='image/*' id='profilePhoto' type='file' style={{ display: 'none' }} onChange={handleChange} />
            <Avatar src={photoURL} sx={{ width: 60, height: 60, cursor: 'pointer' }} />
          </label>
        </Box>
        <DialogContentText sx={{ mt: 2 }}>Edit display name, click on avatar to update photo </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type='submit' variant='contained' sx={{ mb: 1, mr: 1, borderRadius: 25 }}>
          Update Profile
        </Button>
      </DialogActions>
    </form>
  );
};
export default Profile;
