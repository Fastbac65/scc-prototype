import { collection, getDocs, query, where } from 'firebase/firestore';
import { useValue } from './ContextProvider';
import deleteDocument from './deleteDocument';
import deleteFile from './deleteFile';
import { db } from './FireBase';

const deleteUserFiles = (collectionName, currentUser) => {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, collectionName), where('userId', '==', currentUser.uid));
    //always test the query!!!

    let storagePromises = [];
    let databasePromises = [];
    try {
      const docs = await getDocs(q);
      docs.forEach((doc) => {
        const filePath = collectionName.toLowerCase() + '/' + currentUser.uid + '/' + doc.id;

        storagePromises.push(deleteDocument(collectionName, doc.id));
        databasePromises.push(deleteFile(filePath));
      });
      await Promise.all(storagePromises);
      await Promise.all(databasePromises);

      if (currentUser.photoURL) {
        const photoName = currentUser?.photoURL?.split(`${currentUser.uid}%2F`)[1]?.split('?')[0];
        if (photoName) {
          try {
            await deleteFile(`profile/${currentUser.uid}/${photoName}`);
          } catch (error) {
            console.log(error, error.message);
          }
        }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export default deleteUserFiles;

// reference photoURL                                                        -%2F-  userId                    -%2F- fileName                                           -?
//https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/profile %2F M6pujkdevmSNNIowQpFPWtAbcPx2 %2F scc-gusto1_5a706b96-c21a-4584-881a-a1203ad11e0f.jpeg ?alt=media&token=9f50c9b8-f8c8-4c0d-93c7-66ccb0026b54
