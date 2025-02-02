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
