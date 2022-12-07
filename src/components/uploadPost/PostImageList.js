import { CardMedia, ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import PostImageItem from './PostImageItem';

// defines how we layout different numbers of images. Each entry is column count
const layout = [1, 2, 3, 4, 5, 6];
const height = [120, 120, 120, 120, 120, 120];
// const height = [120, 120, 120, 75, 75, 75];

const PostImagesList = ({ files, collectionName }) => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    // critical first step..  creating a local object url (blobs)
    var urls = [];
    files.map((file, indx) => {
      var url = URL.createObjectURL(file);
      urls = [...urls, url];
    });
    setImageURLs(urls);

    console.log(imageURLs);
  }, [files]);

  return (
    <div>
      {imageURLs.length != 0 && (
        <ImageList
          gap={1}
          sx={{ width: 'auto', height: 'auto', maxHeight: 150, maxWidth: 350 }}
          rowHeight={150}
          // cols={layout[files.length - 1]}
          cols={files.length}
        >
          {imageURLs.map(
            (imageURL, indx) =>
              imageURL && (
                <ImageListItem key={indx}>
                  <CardMedia
                    component='img'
                    // height={height[files.length - 1]}
                    height={150}
                    src={imageURL}
                    alt={collectionName}
                    loading='lazy'
                  />
                  {/* <img src={imageURL} alt={collectionName} loading='lazy' /> */}
                </ImageListItem>
              )
          )}
        </ImageList>
      )}
    </div>
  );
};
export default PostImagesList;
