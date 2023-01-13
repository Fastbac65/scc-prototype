import React, { useState } from 'react';
import Form from './Form';
import ProgressList from './progresslist/ProgressList';

const Upload = ({ collectionName }) => {
  const [files, setFiles] = useState([]);

  return (
    <div>
      <Form setFiles={setFiles} />
      <ProgressList files={files} collectionName={collectionName} />
    </div>
  );
};

export default Upload;
