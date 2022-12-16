import React, { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';

const ImageResizer = (props) => {
  const { imageToResize, onImageResized, resizeAspect, resizeQuality } = props;

  const [imageToResizeUri, setImageToResizeUri] = useState();
  const [imageToResizeWidth, setImageToResizeWidth] = useState();
  const [imageToResizeHeight, setImageToResizeHeight] = useState();

  ImageResizer.defaultProps = {
    onImageResized: () => {},
    resizeAspect: 0.25,
    resizeQuality: 75,
  };

  useEffect(() => {
    if (imageToResize) {
      const url = URL.createObjectURL(imageToResize);
      setImageToResizeUri(url);
      console.log(url);

      var img = new Image();
      img.onload = function () {
        var height = img.height;
        var width = img.width;
        var newAspect;
        // set maxwidth (landscape) or maxheight (portrait)
        width > height ? (newAspect = 1000 / width) : (newAspect = 1000 / height);
        console.log('image dims: ', width, height, 'newAspect:', newAspect);
        Resizer.imageFileResizer(
          imageToResize,
          width * newAspect,
          height * newAspect,
          'JPEG',
          resizeQuality,
          0,
          (uri) => {
            onImageResized(uri);
          },
          'base64'
        );
        console.log('useEffect2: image resized');
        // code here to use the dimensions
      };

      img.src = url;

      // const reader = new FileReader();

      // reader.addEventListener('load', () => {
      //   setImageToResizeUri(reader.result);
      //   console.log(reader.result);
      // });

      // reader.readAsDataURL(imageToResize);
      console.log('useEffect1:', imageToResize);
    }
  }, [imageToResize]);

  // useEffect(() => {
  //   if (imageToResize && imageToResizeWidth && imageToResizeHeight) {
  //     Resizer.imageFileResizer(
  //       imageToResize,
  //       imageToResizeWidth * resizeAspect,
  //       imageToResizeHeight * resizeAspect,
  //       'JPEG',
  //       resizeQuality,
  //       0,
  //       (uri) => {
  //         onImageResized(uri);
  //       },
  //       'base64'
  //     );
  //     console.log('useEffect2: image resized');
  //   }
  // }, [imageToResizeWidth, imageToResizeHeight]);
  // }, [imageToResize, imageToResizeWidth, imageToResizeHeight, onImageResized, resizeAspect, resizeQuality]);
  return (
    <div>
      {/* <img
        src={imageToResizeUri}
        onLoad={(e) => {
          const img = e.target;
          setImageToResizeWidth(img.width);
          setImageToResizeHeight(img.height);
        }}
        crossOrigin='anonymous' // to avoid CORS-related problems
        style={{ display: 'none' }}
      /> */}
    </div>
  );
};
export default ImageResizer;
