import { ImageList } from '@mui/material';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files, collectionName }) => {
  return (
    <div>
      <ImageList rowHeight={200} cols={4}>
        {files.map((file, indx) => (
          <ProgressItem file={file} key={indx} collectionName={collectionName} />
        ))}
      </ImageList>
    </div>
  );
};
export default ProgressList;
