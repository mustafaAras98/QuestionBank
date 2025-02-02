import {Platform} from 'react-native';
import {
  albumDocsByUserId,
  albumDocByUserIdAndAlbumId,
  usersCollection,
} from '../Constants/Collections';
import {Enums} from '../Constants/Enums';
import firestore, {addDoc, updateDoc} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const fetchAlbumTitlesByUserId = async userId => {
  if (!userId) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  try {
    const albumCollection = albumDocsByUserId(userId);
    const querySnapshot = await albumCollection.get();

    if (querySnapshot.empty) {
      return Enums.MESSAGE.Errors.AlbumsDontExists;
    }
    const albumTitles = querySnapshot.docs.map(doc => doc.data().Title);
    return albumTitles;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return Enums.MESSAGE.Errors.FetchAlbumsError;
  }
};

const fetchAlbumsByUserId = async userId => {
  if (!userId) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }

  try {
    const albumCollection = albumDocsByUserId(userId);
    const querySnapshot = await albumCollection.get();

    if (querySnapshot.empty) {
      return Enums.MESSAGE.Errors.AlbumsDontExists;
    }

    const albums = querySnapshot.docs.map(doc => doc.data());
    return albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return Enums.MESSAGE.Errors.FetchAlbumsError;
  }
};

const createNewAlbum = async (userUid, title, imagePath) => {
  if (!userUid) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!title) {
    return Enums.MESSAGE.Errors.TitleMissing;
  }
  if (!imagePath) {
    return Enums.MESSAGE.Errors.ImagePathMissing;
  }
  try {
    const userRef = usersCollection.doc(userUid);

    let timeStamp = firestore.FieldValue.serverTimestamp();
    let titleTrimmed = title.trim();

    const albumsRef = userRef.collection('Albums');
    const albumDocRef = await addDoc(albumsRef, {
      Title: titleTrimmed,
      CreatedAt: timeStamp,
    });
    await updateDoc(albumDocRef, {
      Uid: albumDocRef.id,
    });

    const response = await fetch(
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath,
    );
    const imageBlob = await response.blob();
    if (!imageBlob) {
      return Enums.MESSAGE.Errors.ImageCannotConvertToBlob;
    }
    const imageRef = storage().ref(
      `Users/${userUid}/Albums/${albumDocRef.id}/${Date.now()}.jpg`,
    );
    await imageRef.put(imageBlob);
    const url = await storage().ref(imageRef.path).getDownloadURL();
    await updateDoc(albumDocRef, {
      ImageURL: url,
    });
    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return Enums.MESSAGE.Errors.CreateNewAlbumGenericError;
  }
};

const removeAlbum = async (albumUid, userUid) => {
  if (!userUid) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumUid) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  try {
    const albumRef = storage().ref(`Users/${userUid}/Albums/${albumUid}`);
    await albumRef
      .listAll()
      .then(dir => {
        dir.items.forEach(fileRef => fileRef.delete());
        dir.prefixes.forEach(folderRef => folderRef.delete());
      })
      .catch(error => {
        console.error(error);
        return Enums.MESSAGE.Errors.DeleteAlbumStorageError;
      });
    const albumCollection = albumDocByUserIdAndAlbumId(userUid, albumUid);
    await albumCollection.delete().catch(error => {
      console.error(error);
      return Enums.MESSAGE.Errors.DeleteAlbumFirestoreError;
    });
    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return Enums.MESSAGE.Errors.DeleteAlbumGenericError;
  }
};

const editAlbumTitle = async (albumUid, userUid, newTitle) => {
  if (!userUid) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumUid) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  if (!newTitle) {
    return Enums.MESSAGE.Errors.TitleMissing;
  }
  try {
    const albumCollection = albumDocByUserIdAndAlbumId(userUid, albumUid);
    await albumCollection.update({Title: newTitle});

    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return Enums.MESSAGE.Errors.UpdateTitleError;
  }
};

const userService = {
  fetchAlbumsByUserId,
  fetchAlbumTitlesByUserId,
  createNewAlbum,
  removeAlbum,
  editAlbumTitle,
};

export default userService;
