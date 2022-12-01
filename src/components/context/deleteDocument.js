import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './FireBase';

//all error handling will occur in the call function location
// we return the Promise to be 'await'-ed

const deleteDocument = (collectionName, documentId) => {
  return deleteDoc(doc(db, collectionName, documentId));
};
export default deleteDocument;
