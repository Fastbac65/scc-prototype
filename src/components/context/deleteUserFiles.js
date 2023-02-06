import { collection, getDocs, query, where } from 'firebase/firestore';
import { useValue } from './ContextProvider';
import deleteDocument from './deleteDocument';
import deleteFile from './deleteFile';
import { db } from './FireBase';

const deleteUserFiles = (collectionList, currentUser) => {
  return new Promise(async (resolve, reject) => {
    collectionList.forEach(async (collectionName) => {
      const q = query(collection(db, collectionName), where('userId', '==', currentUser.uid));
      //always test the query!!!

      let storagePromises = [];
      let databasePromises = [];
      try {
        const dbDocs = await getDocs(q);
        const docs = [];
        dbDocs.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });

        docs.forEach((doc) => {
          if (collectionName === 'Posts') {
            // Each post has a single doc but could have many photos = images.length. We need to delete all the photos if any
            if (doc.data.images.length !== 0) {
              // check if its a library image
              const notLibrary = doc.data.images[0].src.split(currentUser.uid)[1]; // if it is from library then 'library' will be undefined
              if (notLibrary) {
                // delete each image within the post
                for (let i = 0; i < doc.data.images.length; i++) {
                  const filePath =
                    collectionName.toLowerCase() + '/' + currentUser.uid + '/' + doc.id + '_' + i + '.jpeg';
                  storagePromises.push(deleteFile(filePath));
                }
              }
            }
          } else if (collectionName === 'Gallery') {
            // we are deleting from Gallery
            const filePath = collectionName.toLowerCase() + '/' + currentUser.uid + '/' + doc.id;
            storagePromises.push(deleteFile(filePath));
          }

          databasePromises.push(deleteDocument(collectionName, doc.id));
        });

        await Promise.all(storagePromises);
        await Promise.all(databasePromises);
      } catch (error) {
        console.log('rejected in deleteUserFiles');
        reject(error);
      }
    }); //  we're done with each collection within the list
    // lets delete the user profile photo if it exists
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
  });
};
export default deleteUserFiles;

// http.. photoURL path                                                      -%2F-  userId                    -%2F- fileName                                            -?
//https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/profile %2F M6pujkdevmSNNIowQpFPWtAbcPx2 %2F scc-gusto1_5a706b96-c21a-4584-881a-a1203ad11e0f.jpeg ?alt=media&token=9f50c9b8-f8c8-4c0d-93c7-66ccb0026b54
