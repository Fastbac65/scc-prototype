import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useValue } from './ContextProvider';
import { db } from './FireBase';

//will use collectionName if available otherwise use 'Gallery'
// returns all documents in the collectionName
// maintains state on db collection contents - this is the GOLD of every device seeing the same things
const useFirestore = (collectionName = 'Gallery') => {
  const {
    state: { alert },
    dispatch,
  } = useValue();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
        console.log('reading from the db ', collectionName);
      },
      (error) => {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 6000 },
        });
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { documents };
};
export default useFirestore;
