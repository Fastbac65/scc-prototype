import { ImageList } from '@mui/material';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files }) => {
  return (
    <div>
      <ImageList rowHeight={200} cols={4}>
        {files.map((file, indx) => (
          <ProgressItem file={file} key={indx} />
        ))}
      </ImageList>
    </div>
  );
};
export default ProgressList;
