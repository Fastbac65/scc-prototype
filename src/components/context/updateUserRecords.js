import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from './FireBase';

const updateUserRecords = (collectionName, uid, updateObj) => {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, collectionName), where('userId', '==', uid));
    try {
      const snapshot = await getDocs(q);
      const updatePromises = [];
      snapshot.forEach((document) => {
        // updateDoc( docRef, updateObject)
        updatePromises.push(updateDoc(doc(db, collectionName, document.id), updateObj));
      });
      await Promise.all(updatePromises);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export default updateUserRecords;
