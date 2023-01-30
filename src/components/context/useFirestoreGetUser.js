import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useValue } from './ContextProvider';
import { db } from './FireBase';

// returns userDocument
// maintains state on db collection contents - this is the GOLD of every device seeing the same things
const useFirestoreGetUser = (collectionName = 'Users') => {
  const {
    state: { alert },
    dispatch,
    currentUser,
  } = useValue();
  const [userDocument, setUserDocuments] = useState([]);

  console.log(currentUser);

  useEffect(() => {
    console.log('from UseEffect', currentUser);

    if (currentUser.uid !== undefined) {
      const q = query(collection(db, collectionName), where('userId', '==', currentUser.uid));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            // should only ever be one doc
            docs.push({ id: doc.id, data: doc.data() });
          });
          setUserDocuments(docs);
          console.log('reading from the db');
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
    }
  }, [currentUser]);

  return userDocument;
};
export default useFirestoreGetUser;
