import { deleteObject, ref } from 'firebase/storage';
import { storage } from './FireBase';

//all error handling will occur in the call function location

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef);
};
export default deleteFile;
