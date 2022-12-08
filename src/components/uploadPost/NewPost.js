import { Box, Button, DialogActions, DialogContent, DialogContentText, Paper, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddImages from './AddImages';
import PostImagesList from './PostImageList';
import { useValue } from '../context/ContextProvider';
import { uuidv4 } from '@firebase/util';
import uploadFile from '../context/uploadFile';

const NewPost = () => {
  const { theme, currentUser, dispatch } = useValue();
  const [files, setFiles] = useState([]);
  let postImagesURLs = [];

  const titleRef = useRef();
  const subtitleRef = useRef();
  const mainRef = useRef();
  const collectionName = 'Posts';
  const storageName = 'posts';
  const postDocumentId = currentUser.uid + '_' + uuidv4();

  const uploadPostImages = () => {
    //FILE_NAME AND DATABASE DOCUMENT ID ARE THE SAME
    // ** THIS IS HOW WE ADD / DELETE SAME FILE / IMAGE AND DATABASE DOC REFERENCE **
    //create unique image and doc names by inserting uuid

    return new Promise(async (resolve, reject) => {
      // this array should contain all the URLs of the Post images
      let imageUploadPromises = [];
      const images = []; // our standard arry of objects [{src: url, alt: url,},.. ]

      try {
        //upload Post images to storage

        files.forEach((file, indx) => {
          const imageName = postDocumentId + '_' + indx + '.' + file.name.split('.').pop();
          const storageFilePath = `${storageName}/${currentUser.uid}/` + imageName;

          imageUploadPromises.push(uploadFile(file, storageFilePath));
        });
        const urls = await Promise.all(imageUploadPromises);
        urls.map((url) => {
          images.push({ src: url, alt: url });
        });

        resolve(images); // send back array of URLs of Post images in [{src: url, alt: url,},.. ]
      } catch (error) {
        console.log(error.message);
        reject(error);
      }
    });
  };

  const setDefaultImageURL = (url) => {
    postImagesURLs = [url];
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const main = mainRef.current.value;

    dispatch({ type: 'START_LOADING' });

    // upload post images if there are any
    if (files.length) {
      postImagesURLs = await uploadPostImages();

      console.log(postImagesURLs);
    } else console.log('default url is - ', postImagesURLs);

    const databaseDoc = {
      //TODO create sccUser db which will init on first signin/up and use this info when currentUser is ''
      userId: currentUser?.uid || '',
      uName: currentUser?.displayName || '',
      uEmail: currentUser?.email || '',
      uAvatar: currentUser?.photoURL || '',
      uMobile: currentUser?.phoneNumber || '',
      albumName: collectionName,
      postType: '',
      title: title,
      subtitle: subtitle,
      main: main.split(/\r?\n/),
      imageURLs: postImagesURLs,
      thumbnailUrl: '',
      tags: {},
      likes: 0,
    };

    // const addDocument = (collectionName, documentObj, documentId);   // also adds timestamp automatically

    dispatch({ type: 'END_LOADING' });
  };

  return (
    <form onSubmit={handleSubmitPost}>
      <DialogContent sx={{ pt: 0, px: { xs: 1, sm: 2 }, width: { xs: 300, sm: 350 }, minHeight: 420 }}>
        <Paper elevation={15} sx={{ pt: 0, border: theme.palette.mode === 'dark' ? 0 : 1, borderColor: 'lightgray' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PostImagesList files={files} setDefaultImageURL={setDefaultImageURL} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={0} sx={{ width: '92%' }}>
              <TextField
                color='secondary'
                // sx={{ mb: 0 }}
                variant='standard'
                size='small'
                type='text'
                fullWidth
                inputRef={titleRef}
                label='Title'
                required
                multiline
                InputProps={{ style: { fontSize: 20 } }}
              />
              <TextField
                color='secondary'
                sx={{ mb: 1 }}
                variant='standard'
                size='small'
                type='text'
                fullWidth
                inputRef={subtitleRef}
                label='Subtitle or Date'
                required
                InputProps={{ style: { fontSize: 14 } }}
              />
              {/* <TextField size='small' type='text' fullWidth inputRef={summaryRef} label='Summary' required multiline /> */}
              <TextField
                color='secondary'
                sx={{ mb: 3 }}
                variant='standard'
                size='small'
                type='text'
                fullWidth
                inputRef={mainRef}
                label='Main'
                required
                multiline
                InputProps={{ style: { fontSize: 14 } }}
              />
            </Stack>
          </Box>
        </Paper>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <AddImages files={files} setFiles={setFiles} />

          <Button type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
            Submit
          </Button>
        </DialogActions>
        <DialogContentText variant='caption'>Click on photo to zoom.</DialogContentText>
        <DialogContentText variant='caption'>Add photos or go with the library option.</DialogContentText>
      </DialogContent>
    </form>
  );
};
export default NewPost;
