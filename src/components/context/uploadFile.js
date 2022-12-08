import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { useValue } from './ContextProvider';
import { storage } from './FireBase';

// all error handling will occur in the call function location
// uploading without progress feedback
// returns the URL to the file in storage as resolve

const uploadFile = (file, storageFilePath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, storageFilePath);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error) {
      reject(error.message);
    }
  });
};
export default uploadFile;
