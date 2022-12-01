import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './FireBase';

//all error handling will occur in the call function location
// return the Promise to be 'await' -ed

export const addDocument = (collectionName, documentObj, documentId) => {
  const docRef = doc(collection(db, collectionName), documentId);
  return setDoc(docRef, { ...documentObj, timestamp: serverTimestamp() });
};
