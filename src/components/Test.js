import { Container } from '@mui/system';

// import { updateMetadata, ref } from 'firebase/storage';
// import { storage } from './context/FireBase';

const Test = () => {
  // const { documents } = useFirestore('Posts');
  // console.log(documents);

  // const updateMetaPosts = (documents) => {
  //   const newMetadata = {
  //     cacheControl: 'public,max-age=31536000',
  //   };
  //   documents.forEach(async (postDoc) => {
  //     const postImageUpdatePromises = [];

  //     if (postDoc.data.images.length) {
  //       // should never be zero but just in case of bug
  //       //check if the first image is from the library
  //       const notLibrary = postDoc.data.images[0].src.split(postDoc.data.userId)[1]; // if it is from library then 'library' will be undefined
  //       if (notLibrary) {
  //         postDoc.data.images.forEach(async (image) => {
  //           const postImageName = image.src.split(postDoc.data.userId + '%2F')[1].split('?')[0]; // strip the filename from the URL
  //           const filePath = 'posts/' + postDoc.data.userId + '/' + postImageName; // storage file path
  //           console.log(filePath);
  //           const imageRef = ref(storage, filePath);
  //           postImageUpdatePromises.push(updateMetadata(imageRef, newMetadata)); // all updates go almost in parallel so we dont await them
  //         });
  //         var updates = await Promise.all(postImageUpdatePromises); // we await all promises from the delete requests
  //         console.log('meta updated', updates);
  //       }
  //     }
  //   });
  // };
  // const imglib = [
  //   'images/header8.jpeg',
  //   'images/BattleOfTheDitch-1-1-1024x598.jpeg',
  //   'images/header7.jpeg',
  //   'images/header5.jpeg',
  //   'images/header4.jpeg',
  //   'images/header3.jpeg',
  //   'images/header2.jpeg',
  //   'images/scc-beach-sunrise.jpeg',
  //   'images/Aussies-317-1024x602.jpeg',
  //   'images/Australia-Day-7-1024x683.jpeg',
  // ];
  // const updateMetaImageLibrary = (imglib) => {
  //   imglib.forEach((img, indx) => {
  //     const filePath = imglib[indx];

  //     const imageRef = ref(storage, filePath);

  //     const newMetadata = {
  //       cacheControl: 'public,max-age=31536000',
  //     };

  //     updateMetadata(imageRef, newMetadata)
  //       .then((metadata) => {
  //         // Updated metadata for 'images/forest.jpg' is returned in the Promise
  //         console.log('metadata updated', metadata, imageRef);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   });
  // };

  // updateMetaImageLibrary(imglib);
  // updateMetaPosts(documents);

  // const updateMetaGallery = (documents) => {
  //   documents.forEach((doc) => {
  //     const imageName = doc.data.imageURL.split('%2F')[2].split('?alt')[0];
  //     const filePath = 'gallery/' + doc.data.userId + '/' + imageName;

  //     const imageRef = ref(storage, filePath);

  //     const newMetadata = {
  //       cacheControl: 'public,max-age=31536000',
  //     };

  //     updateMetadata(imageRef, newMetadata)
  //       .then((metadata) => {
  //         // Updated metadata for 'images/forest.jpg' is returned in the Promise
  //         console.log('metadata updated', metadata, imageRef);
  //       })
  //       .catch((error) => {
  //         // Uh-oh, an error occurred!
  //       });
  //   });
  // };

  return (
    <>
      <Container maxWidth='lg' sx={{ px: '6px', textAlign: 'center', justifyContent: 'center' }}>
        ...Test page... Nothing to see here!!!
      </Container>
    </>
  );
};

export default Test;
