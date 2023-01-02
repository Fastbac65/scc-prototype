import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './FireBase';

const uploadFileProgress = (file, storageFilePath, setProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, storageFilePath);
    // TODO: resize file if needed and compress then upload the new resized Blob.
    const upload = uploadBytesResumable(storageRef, file);
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
