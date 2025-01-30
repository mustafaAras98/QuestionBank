import firestore, {collection} from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');

export const trialsCollectionGroup = firestore().collectionGroup('Albums');

export const albumCollectionsByUserId = userId => {
  const userDocument = firestore().collection('Users').doc(userId);
  return collection(userDocument, 'Albums');
};
