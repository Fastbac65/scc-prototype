import { CheckCircleOutline } from '@mui/icons-material';
import { ImageListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../context/uploadFileProgress';
import { db } from '../../context/FireBase';
// import { collection, addDoc, } from 'firebase/firestore';
import { addDocument } from '../../context/addDocument';

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const currentUser = { uid: 'td' };

  useEffect(() => {
    const url = URL.createObjectURL(file);
    console.log(file, url);
    setImageURL(url);
    const uploadImage = async () => {
      const imageName = file.name + '_' + uuidv4();
      //  const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        const url = await uploadFileProgress(file, `gallery/${currentUser.uid}`, imageName, setProgress);
        console.log(url);
        const galleryDoc = {
          userId: currentUser.uid,
          uName: 'Terry',
          uEmail: 'test@this.com',
          uAvatar: '',
          albumName: 'Gallery',
          title: file.name.split('.')[0],
          imageURL: url,
          thumbnailUrl: '',
        };
        const docRef = await addDocument('Gallery', galleryDoc, imageName);
        console.log('gallery updated:', docRef);

        setImageURL(null);
      } catch (error) {
        console.log(error.message);
      }
    };
    uploadImage();
  }, [file]);

  return (
    imageURL && (
      <ImageListItem cols={1} row={1}>
        <img src={imageURL} alt='gallery' loading='lazy' />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline sx={{ width: 25, height: 25, color: '#f9de00' }} />
          )}
        </Box>
      </ImageListItem>
    )
  );
};
export default ProgressItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.5)',
};
