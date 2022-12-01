import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import profile from '../../static/imgs/fastbac-sq.png';
import Options from './Options';
import { useValue } from '../context/ContextProvider';
import { updateCurrentUser } from 'firebase/auth';
import CloseLightBox from './CloseLightBox';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
export default function ImagesList({ documents, collectionName }) {
  const {
    state: { lightbox },
    dispatch,
    login,
    currentUser,
  } = useValue();

  const handleImgClick = (e) => {
    const src = e.target.src.split('?')[0];
    let indx = 0;
    while (src !== documents[indx].data.imageURL.split('?')[0]) indx++;

    dispatch({
      type: 'OPEN_LIGHTBOX',
      payload: { ...lightbox, open: true, currentIndx: indx },
    });
  };

  return (
    <>
      <Typography sx={{ pt: 1 }} variant='h4'>
        {' '}
        South Curl Curl Gallery
      </Typography>
      <ImageList variant='quilted' cols={4} rowHeight={150}>
        {documents.map((doc, indx) => (
          <ImageListItem
            key={doc?.id}
            // 8 is pattern.length so replace this later for bigger patterns
            rows={pattern[indx - 8 * Math.floor(indx / 8)].rows || 1}
            cols={pattern[indx - 8 * Math.floor(indx / 8)].cols || 1}
            sx={{
              opacity: '0.9',
              transition: 'opacity 0.3s linear',
              cursor: 'pointer',
              '&:hover': { opacity: 1 },
            }}
          >
            <img
              {...srcset(
                doc?.data?.imageURL,
                150,
                pattern[indx - 8 * Math.floor(indx / 8)].rows,
                pattern[indx - 8 * Math.floor(indx / 8)].cols
              )}
              alt={doc?.data?.uName || doc?.data?.uEmail}
              onClick={handleImgClick}
              loading='lazy'
            />
            {/* bottom date label */}
            <Typography
              variant='caption'
              component='span'
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                p: '3px',
                borderTopRightRadius: 10,
              }}
            >
              {moment(doc?.data?.timestamp?.toDate()).fromNow()}
            </Typography>
            {/* avatar */}
            {login && (
              <Tooltip title={doc?.data?.uName || doc?.data?.uEmail} placement='top'>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    bottom: '3px',
                    right: '3px',
                    background: 'rgb(0,0,0,0.2)',
                    color: 'white',
                  }}
                  //TODO change avatar src to doc.data.uAvatar
                  src={doc?.data?.uAvatar}
                  alt={doc?.data?.uName || doc?.data?.uEmail}
                >
                  {doc?.data?.uName.charAt(0)}{' '}
                </Avatar>
              </Tooltip>
            )}
            {/* menu top right*/}
            {currentUser?.displayName === doc?.data?.uName && (
              <Options imageName={doc?.id} collectionName={collectionName} />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
const pattern = [
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 2 },
  { rows: 1, cols: 2 },
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
];
