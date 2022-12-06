import React, { useState } from 'react';
import AddImages from './AddImages';
//import ProgressList from './progresslist/ProgressList';

const UploadImages = ({ collectionName }) => {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <div>
      <AddImages setFiles={setFiles} />
      {/* <ProgressList files={files} collectionName={collectionName} /> */}
    </div>
  );
};

export default UploadImages;
