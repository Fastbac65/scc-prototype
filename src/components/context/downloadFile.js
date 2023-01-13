import axios from 'axios';
// import { getDownloadURL, uploadBytes, ref, getBlob } from 'firebase/storage';
// import { useValue } from './ContextProvider';
// import { storage } from './FireBase';

// all error handling will occur in the call function location
// uploading without progress feedback
// returns the URL to the file in storage as resolve

const downloadFile = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await axios.get(url, { responseType: 'arraybuffer' });
      const filename = url.split('?')[0].split('scc-proto.appspot.com/o/')[1];

      //  https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/posts%2F3a1eMEclPhVyl84rAjbNaZm7vr12%2F3a1eMEclPhVyl84rAjbNaZm7vr12_05e16034-cf24-4f9c-8950-8f1243049624_0.jpeg?alt=media&token=87692cbf-066d-405a-a741-7d53b8651e9b

      // const file = new Blob([img.data], { type: img.headers['content-type'] });
      const file = new File([img.data], filename, { type: img.headers['content-type'] });
      console.log(file);
      resolve(file);
    } catch (error) {
      reject(error.message, error);
    }
  });
};
export default downloadFile;
