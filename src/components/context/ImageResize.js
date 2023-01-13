import { useState } from 'react';
import { Buffer } from 'buffer';
import Resizer from 'react-image-file-resizer';
import resizeImage from './resizeImage';
import uploadFile from './uploadFile';
import { useValue } from './ContextProvider';

const ImageResize = () => {
  const { currentUser } = useValue();
  const [resizedImage, setResizedImage] = useState(undefined);

  const onUploadFile = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const { uri, blob } = await resizeImage(event.target.files[0]);
      setResizedImage(uri);
      console.log(blob);
      const storageFilePath = `test/${currentUser.uid}/` + event.target.files[0].name;
      const storageUrl = await uploadFile(blob, storageFilePath);
      console.log(storageUrl);
    }
  };

  return (
    <div>
      <h1>Image Resizer</h1>
      <p>Please, upload an image and it will be showed both original and resized by 50%</p>
      <input type='file' accept='image/*' onChange={onUploadFile} />
      <div>
        {/* <ImageResizer
          imageToResize={imageToResize}
          onImageResized={(resizedImage) => resizedImageComplete(resizedImage)}
        /> */}
      </div>
      {resizedImage && (
        <div>
          <h2>Resized Image</h2>
          <img alt='Resize Image' src={resizedImage} />
        </div>
      )}
    </div>
  );
};
export default ImageResize;
