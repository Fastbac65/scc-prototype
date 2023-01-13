import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Box, CardMedia, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useValue } from '../context/ContextProvider';
import PostsLightBox from '../imagesList/PostsLightBox';

// defines how we layout different numbers of images. Each entry is column count
// const layout = [1, 2, 3, 4, 5, 6];
// const height = [120, 120, 120, 120, 120, 120];
// const height = [120, 120, 120, 75, 75, 75];

const PostImageList = ({ files, setFiles, setPostDefaultImageURL }) => {
  const { imglib } = useValue();
  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // picks an initial photo from the library
  useMemo(() => {
    const indx = Math.floor(Math.random() * imglib.length);
    let url = imglib[indx];
    setImages([{ src: url, alt: url }]);
  }, []);

  // sets up images array from files - basically does nothing until there are files
  useEffect(() => {
    // create the array of images[{src: url , alt: url ,},...]

    var imgs = [];
    if (files.length) {
      console.log('if files was true');
      files.forEach((file, indx) => {
        var url = URL.createObjectURL(file);
        // imgs.push({ src: url, alt: url });  another way to do it
        imgs = [...imgs, { src: url, alt: url }];
      });
      setImages(imgs);
    }
    if (!files.length) {
      setPostDefaultImageURL(...images);

      // may need to reload a default image if all files are deleted in the UI
    }
  }, [files]);

  const handleDelete = (e, indx, image) => {
    // need to delete a file from 'files' and the image from the display
    console.log('delete image', image, indx, e);
    let imgArr = [...images];
    imgArr.splice(indx, 1);
    setImages(imgArr);
    // setImages(images.filter((eachImage) => eachImage.src !== image.src));
    let fileArr = [...files];
    fileArr.splice(indx, 1);
    setFiles(fileArr);
    // setFiles(files.filter((file) => file.name !== files[indx].name));
  };

  return (
    <div>
      {images.length !== 0 && (
        <ImageList
          gap={1}
          sx={{ mt: 0, width: '100%', height: 'auto', maxHeight: 150, maxWidth: 350 }}
          rowHeight={150}
          // cols={layout[files.length - 1]}
          cols={images.length}
        >
          {images.map(
            (image, indx) =>
              image && (
                <ImageListItem key={indx}>
                  <CardMedia
                    component='img'
                    // height={height[files.length - 1]}
                    height={150}
                    src={image.src}
                    alt={image?.alt}
                    loading='lazy'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentImageIndex(indx);
                      setOpen(true);
                      console.log('clicked image');
                    }}
                  />
                  {images.length > 1 && (
                    <Box
                      component='span'
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        borderBottomRightRadius: 10,
                      }}
                    >
                      <Tooltip arrow placement='top-start' title='delete' enterDelay={3000}>
                        <IconButton
                          onClick={(e) => {
                            handleDelete(e, indx, image);
                          }}
                          sx={{
                            color: 'white',
                            p: '3px',
                          }}
                        >
                          <DeleteForeverOutlinedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </ImageListItem>
              )
          )}
          <PostsLightBox
            open={open}
            setOpen={setOpen}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            images={images}
          />
        </ImageList>
      )}
    </div>
  );
};
export default PostImageList;
