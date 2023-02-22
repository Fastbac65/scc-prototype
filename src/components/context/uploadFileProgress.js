import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './FireBase';

const uploadFileProgress = (file, storageFilePath, setProgress) => {
  const newMetadata = {
    cacheControl: 'public,max-age=31536000',
  };
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, storageFilePath);
    // resized file passed in
    const upload = uploadBytesResumable(storageRef, file, newMetadata);
    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
export default uploadFileProgress;
