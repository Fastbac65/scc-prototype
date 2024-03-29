import { Avatar, Box, Button, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import { updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useValue } from '../context/ContextProvider';
import uploadFile from '../context/uploadFile';
import deleteFile from '../context/deleteFile';
import updateUserRecords from '../context/updateUserRecords';
import resizeImage from '../context/resizeImage';

const Profile = () => {
  const {
    currentUser,
    dispatch,
    state: { alert, modal },
  } = useValue();
  const [name, setName] = useState(currentUser?.displayName);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);
  var resizedImg = useRef({});

  // getting the new profile image file if one is selected
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      resizedImg.current = await resizeImage(file, 80, 150);

      setFile(file);
      console.log(resizedImg);

      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
    dispatch({ type: 'START_LOADING' });
    let currentUserUpdateObj = { displayName: name, photoURL: photoURL }; // used for updating the auth
    let databaseUpdateObj = { uName: name, uAvatar: photoURL };
    try {
      if (file) {
        // imageName is originalFileName + uuid + originalFileExtension
        // const resizedImg = await resizeImage(file, 80, 150);
        const imageName = file.name.split('.')[0] + '_' + uuidv4() + '.' + file.name.split('.').pop();
        const url = await uploadFile(resizedImg.current.blob, `profile/${currentUser?.uid}/${imageName}`);
        const prevURL = currentUser?.photoURL;

        if (prevURL) {
          const prevProfileImageName = `${prevURL?.split(`${currentUser?.uid}%2F`)[1]?.split('?')[0]}`;
          // will be undefined is there is no previous image within the URL as we're looking for the 'uid' to split on
          const prevProfilePath = `profile/${currentUser?.uid}/${prevProfileImageName}`;
          // full path
          // splitting with uid is more robust -- if there is no prev stored avatar (or its a google avatar) prevProfilePath will be undefined and we wont even try delete
          if (prevProfileImageName !== 'undefined') {
            try {
              await deleteFile(prevProfilePath);
            } catch (error) {
              // this will throw an error if you logged in with google for example.. as we dont have an image stored
              console.log(error.message);
            }
          }
        }
        //firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/profile %2F M6pujkdevmSNNIowQpFPWtAbcPx2 %2F paella_8e96633c-9fb2-4de9-8a84-40bd73993f3e.jpg?alt=media&token=4d303da6-8bab-434b-bc02-f4468aa8563a

        currentUserUpdateObj.photoURL = url;
        databaseUpdateObj.uAvatar = url;
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, severity: 'error', open: true, message: error.message, duration: 3000 },
      });
      console.log(error.message);
    }

    await updateProfile(currentUser, currentUserUpdateObj);
    await updateUserRecords('Gallery', currentUser?.uid, databaseUpdateObj);
    await updateUserRecords('Posts', currentUser?.uid, databaseUpdateObj);

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
            color='info'
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
            <Input
              inputProps={{ accept: 'image/*' }}
              id='profilePhoto'
              type='file'
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <Avatar
              sx={{ width: 80, height: 80, cursor: 'pointer', bgcolor: '#f9de00', color: 'black' }}
              src={photoURL}
              alt={currentUser?.displayName}
              aria-label='profile photo'
            >
              {currentUser?.displayName?.charAt(0)}
            </Avatar>
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
