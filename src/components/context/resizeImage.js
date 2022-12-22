import { Buffer } from 'buffer';
import Resizer from 'react-image-file-resizer';

// upload image management - images are resized to 1200 maxHeight or maxWidth if they are larger
// this function can also compress images based on jpegQuality - 100 is almost lossless

const resizeImage = (imageToResize, jpegQuality = 75) => {
  return new Promise((resolve) => {
    if (imageToResize) {
      const url = URL.createObjectURL(imageToResize);
      console.log(url);

      var img = new Image();
      img.onload = () => {
        var height = img.height;
        var width = img.width;
        var newAspect = 1;
        // set maxwidth (landscape) or maxheight (portrait) if either is greater than 1200px (1200 is 16:9 with 720px)
        if (width > 1200 || height > 1200) {
          width > height ? (newAspect = 1200 / width) : (newAspect = 1200 / height);
        }
        console.log('image dims: ', width, height, 'newAspect:', newAspect);
        Resizer.imageFileResizer(
          imageToResize,
          width * newAspect,
          height * newAspect,
          'JPEG',
          jpegQuality,
          0,
          (uri) => {
            resolve({ uri: uri, blob: dataURItoBlob(uri) });
          },
          'base64'
        );
        console.log('image resized');
        // code here to use the dimensions
      };
      img.src = url;
    }
  });
};

function dataURItoBlob(dataURI) {
  // returns a Blob object
  // convert base64/URLEncoded data component to raw binary data held in a buffer
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

export default resizeImage;
