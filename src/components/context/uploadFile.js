import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { useValue } from './ContextProvider';
import { storage } from './FireBase';

//all error handling will occur in the call function location

const uploadFile = (fileName, filePath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filePath);
    try {
      await uploadBytes(storageRef, fileName);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error) {
      reject(error.message);
    }
  });
};
export default uploadFile;
