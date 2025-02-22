import {Platform} from 'react-native';
import {
  albumDocsByUserId,
  albumDocByUserIdAndAlbumId,
  usersCollection,
  imageCollectionByUserIdAndAlbumId,
  imageDocByUserIdAndAlbumIdAndImageId,
} from '../Constants/Collections';
import {Enums} from '../Constants/Enums';
import firestore, {addDoc, updateDoc} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Decrypt from '../Utils/Decyrpt';

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
        dir.prefixes.forEach(async folderRef => {
          await folderRef.listAll().then(folderDir => {
            folderDir.items.forEach(item => item.delete());
          });
          folderRef.delete();
        });
      })
      .catch(error => {
        console.error(error);
        return Enums.MESSAGE.Errors.DeleteAlbumStorageError;
      });
    const albumCollection = albumDocByUserIdAndAlbumId(userUid, albumUid);
    const imagesRef = albumCollection.collection('Images');

    await imagesRef.get().then(querySnapshot => {
      Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
    });
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

const addNewImage = async (albumUid, userUid, name, imagePath) => {
  if (!userUid) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumUid || albumUid === -1) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  if (!name) {
    return Enums.MESSAGE.Errors.ImageNameMissing;
  }
  try {
    const albumDoc = albumDocByUserIdAndAlbumId(userUid, albumUid);

    let timeStamp = firestore.FieldValue.serverTimestamp();
    let nameTrimmed = name.trim();

    const imagesRef = albumDoc.collection('Images');
    const imagesDocRef = await addDoc(imagesRef, {
      Name: nameTrimmed,
      CreatedAt: timeStamp,
      IsFavorite: false,
    });
    await updateDoc(imagesDocRef, {
      Uid: imagesDocRef.id,
    });
    const response = await fetch(
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath,
    );
    const imageBlob = await response.blob();
    if (!imageBlob) {
      return Enums.MESSAGE.Errors.ImageCannotConvertToBlob;
    }
    const imageRef = storage().ref(
      `Users/${userUid}/Albums/${albumUid}/Images/${imagesDocRef.id}`,
    );
    await imageRef.put(imageBlob);
    const url = await storage().ref(imageRef.path).getDownloadURL();
    await updateDoc(imagesDocRef, {
      ImageURL: url,
    });

    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return Enums.MESSAGE.Errors.CreateNewImageGenericError;
  }
};

const fetchImages = async (userId, albumId) => {
  if (!userId) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumId) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }

  try {
    const imageCollectionRef = imageCollectionByUserIdAndAlbumId(
      userId,
      albumId,
    );

    const querySnapshot = await imageCollectionRef
      .orderBy('CreatedAt', 'desc')
      .get();

    if (querySnapshot.empty) {
      return Enums.MESSAGE.Errors.NoImageError;
    }

    const images = querySnapshot.docs.map(doc => ({
      ...doc.data(),
    }));

    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return Enums.MESSAGE.Errors.FetchImagesError;
  }
};

const fetchImage = async imageId => {
  if (!imageId) {
    return Enums.MESSAGE.Errors.ImageIdMissing;
  }

  try {
    const imageIdDecyrpt = await Decrypt(imageId);
    let imageQuery = firestore()
      .collectionGroup('Images')
      .where('Uid', '==', imageIdDecyrpt)
      .limit(1);

    let image;
    await imageQuery.get().then(querySnapshot => {
      if (!querySnapshot) {
        return Enums.MESSAGE.Errors.FetchImageNoImageError;
      }
      querySnapshot.forEach(doc => {
        if (doc.data()) {
          image = doc.data();
        }
      });
    });

    if (!image) {
      return Enums.MESSAGE.Errors.FetchImageNoImageError;
    }
    return image;
  } catch (error) {
    if (error.message === Enums.MESSAGE.Errors.DecryptionError) {
      return Enums.MESSAGE.Errors.FetchImageNoImageError;
    }
    return Enums.MESSAGE.Errors.FetchImageError;
  }
};

const fetchImagesInAlbum = async albumId => {
  if (!albumId) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  try {
    const albumIdDecrypt = await Decrypt(albumId);
    let albumQuery = firestore()
      .collectionGroup('Albums')
      .where('Uid', '==', albumIdDecrypt)
      .limit(1);

    let albumRef;
    await albumQuery.get().then(querySnapshot => {
      if (querySnapshot.size === 0) {
        throw new Error(Enums.MESSAGE.Errors.FetchImageNoAlbumError);
      }
      querySnapshot.forEach(doc => {
        if (doc.data()) {
          albumRef = doc.ref;
        }
      });
    });

    if (albumRef === null) {
      return Enums.MESSAGE.Errors.FetchImageNoAlbumError;
    }

    const imagesSnapshot = await albumRef.collection('Images').get();
    if (imagesSnapshot.empty) {
      return Enums.MESSAGE.Errors.FetchImageNoAlbumError;
    }

    const images = imagesSnapshot.docs.map(doc => ({
      ...doc.data(),
    }));

    return images;
  } catch (error) {
    if (error.message === Enums.MESSAGE.Errors.DecryptionError) {
      return Enums.MESSAGE.Errors.FetchImageNoImageError;
    }
    return Enums.MESSAGE.Errors.FetchAlbumError;
  }
};

const fetchFavoriteImages = async (userId, albumId) => {
  if (!userId) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumId) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }

  try {
    const imageCollectionRef = imageCollectionByUserIdAndAlbumId(
      userId,
      albumId,
    );

    const querySnapshot = await imageCollectionRef
      .where('IsFavorite', '==', true)
      .orderBy('CreatedAt', 'desc')
      .get();

    if (querySnapshot.empty) {
      return Enums.MESSAGE.Errors.NoFavoriteImageError;
    }

    const favoriteImages = querySnapshot.docs.map(doc => ({
      ...doc.data(),
    }));

    return favoriteImages;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return Enums.MESSAGE.Errors.FetchFavoriteImagesError;
  }
};

const ImageFavoriteStatusChange = async (
  userId,
  albumId,
  imageId,
  isFavorite,
) => {
  if (!userId) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumId) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  if (!imageId) {
    return Enums.MESSAGE.Errors.ImageIdMissing;
  }

  try {
    const imageCollectionRef = imageCollectionByUserIdAndAlbumId(
      userId,
      albumId,
    );
    const imageDoc = imageCollectionRef.doc(imageId);
    imageDoc.update({IsFavorite: !isFavorite});
    return Enums.STATUS.Success;
  } catch (error) {
    console.error('Error change favorite:', error);
    return Enums.MESSAGE.Errors.ImageFavoriteChangeError;
  }
};

const deleteImage = async (userUid, albumUid, imageUid) => {
  if (!userUid) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumUid) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  if (!imageUid) {
    return Enums.MESSAGE.Errors.ImageIdMissing;
  }
  try {
    const imageRef = storage().ref(
      `Users/${userUid}/Albums/${albumUid}/Images/${imageUid}`,
    );
    await imageRef.delete();

    const imageCollection = imageDocByUserIdAndAlbumIdAndImageId(
      userUid,
      albumUid,
      imageUid,
    );
    await imageCollection.delete().catch(error => {
      console.error(error);
      return Enums.MESSAGE.Errors.DeleteImageFirestoreError;
    });
    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return Enums.MESSAGE.Errors.DeleteImageGenericError;
  }
};

const editCoverImage = async (userUid, albumUid, imagePath) => {
  if (!userUid) {
    return Enums.MESSAGE.Errors.UserIdMissing;
  }
  if (!albumUid) {
    return Enums.MESSAGE.Errors.AlbumIdMissing;
  }
  if (!imagePath) {
    return Enums.MESSAGE.Errors.ImagePathMissing;
  }
  try {
    const albumRef = storage().ref(`Users/${userUid}/Albums/${albumUid}/`);
    await albumRef.listAll().then(dir => {
      dir.items.forEach(fileRef => fileRef.delete());
    });

    const albumDoc = albumDocByUserIdAndAlbumId(userUid, albumUid);

    const response = await fetch(
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath,
    );
    const imageBlob = await response.blob();
    if (!imageBlob) {
      return Enums.MESSAGE.Errors.ImageCannotConvertToBlob;
    }
    const imageRef = storage().ref(
      `Users/${userUid}/Albums/${albumUid}/${Date.now()}.jpg`,
    );
    await imageRef.put(imageBlob);
    const url = await storage().ref(imageRef.path).getDownloadURL();
    await updateDoc(albumDoc, {
      ImageURL: url,
    });
    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return Enums.MESSAGE.Errors.DeleteImageGenericError;
  }
};

const albumService = {
  fetchAlbumsByUserId,
  fetchAlbumTitlesByUserId,
  fetchImagesInAlbum,
  createNewAlbum,
  removeAlbum,
  editAlbumTitle,
  addNewImage,
  fetchImages,
  fetchImage,
  fetchFavoriteImages,
  ImageFavoriteStatusChange,
  deleteImage,
  editCoverImage,
};

export default albumService;
