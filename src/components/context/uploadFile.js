import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { storage } from './FireBase';

// all error handling will occur in the call function location
// uploading without progress feedback
// returns the URL to the file in storage as resolve
// updates cache control metadata

const uploadFile = (file, storageFilePath, defStorage = storage) => {
  const newMetadata = {
    cacheControl: 'public,max-age=31536000',
  };
  // allowing for a temp instance of storage to be provided
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(defStorage, storageFilePath);
    try {
      await uploadBytes(storageRef, file, newMetadata);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error) {
      reject(error.message);
    }
  });
};
export default uploadFile;
