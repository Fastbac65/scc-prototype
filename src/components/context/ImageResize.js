import { useState } from 'react';
import ImageResizer from './ImageResizer';
import { Buffer } from 'buffer';
import Resizer from 'react-image-file-resizer';

const ImageResize = () => {
  // const [imageToResize, setImageToResize] = useState(undefined);
  const [resizedImage, setResizedImage] = useState(undefined);
  const jpegQuality = 75; // compression quality 1-100, 100 is almost no cmopression

  const onUploadFile = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const resizedImageUri = await resizeImage(event.target.files[0], jpegQuality);
      setResizedImage(resizedImageUri);
      const newBlob = dataURItoBlob(resizedImageUri);
      console.log(newBlob);
    }
  };

  const resizeImage = (imageToResize, resizeQuality) =>
    new Promise((resolve) => {
      if (imageToResize) {
        const url = URL.createObjectURL(imageToResize);
        console.log(url);

        var img = new Image();
        img.onload = () => {
          var height = img.height;
          var width = img.width;
          var newAspect = 1;
          // set maxwidth (landscape) or maxheight (portrait) if either is greater than 1000
          if (width > 1000 || height > 1024) {
            width > height ? (newAspect = 1000 / width) : (newAspect = 1000 / height);
          }
          console.log('image dims: ', width, height, 'newAspect:', newAspect);
          Resizer.imageFileResizer(
            imageToResize,
            width * newAspect,
            height * newAspect,
            'JPEG',
            resizeQuality,
            0,
            (uri) => {
              resolve(uri);
            },
            'base64'
          );
          console.log('image resized');
          // code here to use the dimensions
        };
        img.src = url;
      }
    });

  function dataURItoBlob(dataURI) {
    // returns a Blob object
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    var buffer;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      // check that its base64
      //byteString = atob(dataURI.split(',')[1]);     deprecated so using the node Buffer API
      buffer = Buffer.from(dataURI.split(',')[1], 'base64');
    }
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    return new Blob([buffer], { type: mimeString });
  }

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
