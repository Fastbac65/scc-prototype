import { CheckCircleOutline } from '@mui/icons-material';
import { ImageListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../context/uploadFileProgress';
import { addDocument } from '../../context/addDocument';
import { useValue } from '../../context/ContextProvider';

const ProgressItem = ({ file, collectionName }) => {
  const { currentUser } = useValue();
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  // const currentUser = { uid: 'td' };

  useEffect(() => {
    // critical first step..  creating a local object url (blobs)
    const url = URL.createObjectURL(file);

    console.log(file, url);
    setImageURL(url);
    const uploadImage = async () => {
      //FILE_NAME AND DATABASE DOCUMENT ID ARE THE SAME
      // ** THIS IS HOW WE ADD / DELETE SAME FILE / IMAGE AND DATABASE DOC REFERENCE **
      //create unique image and doc names by inserting uuid
      const imageName = file.name.split('.')[0] + '_' + uuidv4() + '.' + file.name.split('.').pop();
      try {
        //upload the file to storage
        const url = await uploadFileProgress(file, `gallery/${currentUser.uid}`, imageName, setProgress);
        console.log(url);
        //use the url from storage update to populate the imageURL field along with currentUser (or sccUser *future) info
        const databaseDoc = {
          //TODO create sccUser db which will init on first signin/up and use this info when currentUser is ''
          userId: currentUser?.uid || '',
          uName: currentUser?.displayName || '',
          uEmail: currentUser?.email || '',
          uAvatar: currentUser?.photoURL || '',
          uMobile: currentUser?.phoneNumber || '',
          albumName: collectionName,
          title: file.name.split('.')[0],
          imageURL: url,
          thumbnailUrl: '',
        };
        const docRef = await addDocument(collectionName, databaseDoc, imageName);
        console.log(`${collectionName} updated:`, docRef, databaseDoc);

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
        <img src={imageURL} alt={collectionName} loading='lazy' />
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
