import firestore, {collection} from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');

export const trialsCollectionGroup = firestore().collectionGroup('Albums');

export const albumDocsByUserId = userId => {
  const userDocument = firestore().collection('Users').doc(userId);
  return collection(userDocument, 'Albums');
};
export const albumDocByUserIdAndAlbumId = (userId, albumId) => {
  const albumDocument = firestore()
    .collection('Users')
    .doc(userId)
    .collection('Albums')
    .doc(albumId);
  return albumDocument;
};
export const imageCollectionByUserIdAndAlbumId = (userId, albumId) => {
  const imageDocument = firestore()
    .collection('Users')
    .doc(userId)
    .collection('Albums')
    .doc(albumId)
    .collection('Images');
  return imageDocument;
};
export const imageDocByUserIdAndAlbumIdAndImageId = (
  userId,
  albumId,
  imageId,
) => {
  const imageDocument = firestore()
    .collection('Users')
    .doc(userId)
    .collection('Albums')
    .doc(albumId)
    .collection('Images')
    .doc(imageId);
  return imageDocument;
};
