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
import storage, {deleteObject} from '@react-native-firebase/storage';
import Decrypt from '../Utils/Decyrpt';
import urlSafeEncode from '../Utils/UrlSafeEncode';

const fetchAlbumTitlesByUserId = async (userId, t) => {
  if (!userId) {
    return t('commonErrors.UserIdMissing');
  }
  try {
    const albumCollection = albumDocsByUserId(userId);
    const querySnapshot = await albumCollection.get();

    if (querySnapshot.empty) {
      return t('album.albumErrors.AlbumDontExists');
    }
    const albumTitles = querySnapshot.docs.map(doc => doc.data().Title);
    return albumTitles;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return t('album.albumErrors.FetchImagesError');
  }
};

const fetchAlbumsByUserId = async (userId, t) => {
  if (!userId) {
    return t('commonErrors.UserIdMissing');
  }

  try {
    const albumCollection = albumDocsByUserId(userId);
    const querySnapshot = await albumCollection.get();

    if (querySnapshot.empty) {
      return t('album.albumErrors.AlbumDontExists');
    }

    const albums = querySnapshot.docs.map(doc => doc.data());
    return albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return t('album.albumErrors.FetchImagesError');
  }
};

const createNewAlbum = async (userUid, title, imagePath, t) => {
  if (!userUid) {
    return t('commonErrors.UserIdMissing');
  }
  if (!title) {
    return t('commonErrors.TitleMissing');
  }
  if (!imagePath) {
    return t('commonErrors.ImageMissing');
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
      return t('image.imageErrors.ImageCannotConvertToBlob');
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
    return t('album.albumErrors.CreateNewAlbumError');
  }
};

const removeAlbum = async (albumUid, userUid, t) => {
  if (!userUid) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumUid) {
    return t('commonErrors.AlbumIdMissing');
  }
  try {
    const albumRef = storage().ref(`Users/${userUid}/Albums/${albumUid}`);
    await albumRef
      .listAll()
      .then(dir => {
        dir.prefixes.forEach(async folderRef => {
          deleteObject(storage().ref(folderRef.fullPath));
          await folderRef.listAll().then(folderDir => {
            folderDir.items.forEach(item =>
              deleteObject(storage().ref(item.fullPath)),
            );
          });
        });
        dir.items.forEach(async fileRef => {
          deleteObject(storage().ref(fileRef.fullPath));
        });
      })
      .catch(error => {
        console.error(error);
        return t('album.albumErrors.DeleteAlbumStorageError');
      });
    const albumCollection = albumDocByUserIdAndAlbumId(userUid, albumUid);
    const imagesRef = albumCollection.collection('Images');

    await imagesRef.get().then(querySnapshot => {
      Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
    });
    await albumCollection.delete().catch(error => {
      console.error(error);
      return t('album.albumErrors.DeleteAlbumFirestoreError');
    });
    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return t('album.albumErrors.DeleteAlbumGenericError');
  }
};

const editAlbumTitle = async (albumUid, userUid, newTitle, t) => {
  if (!userUid) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumUid) {
    return t('commonErrors.AlbumIdMissing');
  }
  if (!newTitle.trim()) {
    return t('commonErrors.TitleMissing');
  }
  try {
    const albumCollection = albumDocByUserIdAndAlbumId(userUid, albumUid);
    await albumCollection.update({Title: newTitle});

    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return t('album.albumErrors.UpdateTitleError');
  }
};

const addNewImage = async (albumUid, userUid, name, imagePath, t) => {
  if (!userUid) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumUid || albumUid === -1) {
    return t('commonErrors.AlbumIdMissing');
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
      return t('image.imageErrors.ImageCannotConvertToBlob');
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
    return t('image.imageErrors.AddNewImageError');
  }
};

const fetchImages = async (userId, albumId, t) => {
  if (!userId) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumId) {
    return t('commonErrors.AlbumIdMissing');
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
      return t('album.albumErrors.NoImageError');
    }

    const images = querySnapshot.docs.map(doc => ({
      ...doc.data(),
    }));

    return images;
  } catch (error) {
    console.error(error);
    return t('album.albumErrors.FetchImagesError');
  }
};

const fetchImage = async (imageId, t) => {
  if (!imageId) {
    return t('commonErrors.ImageMissing');
  }

  try {
    const decodedId = await urlSafeEncode.decodeUrlSafeBase64(imageId);
    const imageIdDecyrpt = await Decrypt(decodedId);
    let imageQuery = firestore()
      .collectionGroup('Images')
      .where('Uid', '==', imageIdDecyrpt)
      .limit(1);

    let image;
    await imageQuery.get().then(querySnapshot => {
      if (!querySnapshot) {
        return t('image.imageErrors.FetchImageNoImageError');
      }
      querySnapshot.forEach(doc => {
        if (doc.data()) {
          image = doc.data();
        }
      });
    });

    if (!image) {
      return t('image.imageErrors.FetchImageNoImageError');
    }
    return image;
  } catch (error) {
    if (error.message === Enums.MESSAGE.Errors.DecryptionError) {
      return t('image.imageErrors.FetchImageNoImageError');
    }
    return t('image.imageErrors.FetchImagesError');
  }
};

const fetchImagesInAlbum = async (albumId, t) => {
  if (!albumId) {
    return t('commonErrors.AlbumIdMissing');
  }
  try {
    const decodedId = await urlSafeEncode.decodeUrlSafeBase64(albumId);
    const albumIdDecrypt = await Decrypt(decodedId);
    let albumQuery = firestore()
      .collectionGroup('Albums')
      .where('Uid', '==', albumIdDecrypt)
      .limit(1);

    let albumRef;
    await albumQuery.get().then(querySnapshot => {
      if (querySnapshot.size === 0) {
        throw new Error(t('album.albumErrors.FetchImageNoAlbumError'));
      }
      querySnapshot.forEach(doc => {
        if (doc.data()) {
          albumRef = doc.ref;
        }
      });
    });

    if (albumRef === null) {
      return t('album.albumErrors.FetchImageNoAlbumError');
    }

    const imagesSnapshot = await albumRef.collection('Images').get();
    if (imagesSnapshot.empty) {
      return t('album.albumErrors.FetchImageNoAlbumError');
    }

    const images = imagesSnapshot.docs.map(doc => ({
      ...doc.data(),
    }));

    return images;
  } catch (error) {
    if (error.message === Enums.MESSAGE.Errors.DecryptionError) {
      return t('album.albumErrors.FetchImageNoAlbumError');
    }
    return t('image.imageErrors.FetchImagesError');
  }
};

const fetchFavoriteImages = async (userId, albumId, t) => {
  if (!userId) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumId) {
    return t('commonErrors.AlbumIdMissing');
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
      return t('gallery.NoFavoriteImages');
    }

    const favoriteImages = querySnapshot.docs.map(doc => ({
      ...doc.data(),
    }));

    return favoriteImages;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return t('album.albumErrors.FetchImagesError');
  }
};

const ImageFavoriteStatusChange = async (
  userId,
  albumId,
  imageId,
  isFavorite,
  t,
) => {
  if (!userId) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumId) {
    return t('commonErrors.AlbumIdMissing');
  }
  if (!imageId) {
    return t('commonErrors.ImageMissing');
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
    return t('image.imageErrors.ImageFavoriteChangeError');
  }
};

const deleteImage = async (userUid, albumUid, imageUid, t) => {
  if (!userUid) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumUid) {
    return t('commonErrors.AlbumIdMissing');
  }
  if (!imageUid) {
    return t('commonErrors.ImageMissing');
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
      return t('image.imageErrors.DeleteImageFirestoreError');
    });
    return Enums.STATUS.Success;
  } catch (error) {
    console.error(error);
    return t('image.imageErrors.DeleteImageGenericError');
  }
};

const editCoverImage = async (userUid, albumUid, imagePath, t) => {
  if (!userUid) {
    return t('commonErrors.UserIdMissing');
  }
  if (!albumUid) {
    return t('commonErrors.AlbumIdMissing');
  }
  if (!imagePath) {
    return t('commonErrors.ImageMissing');
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
      return t('image.imageErrors.ImageCannotConvertToBlob');
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
    return t('album.albumErrors.ImageCoverCannotChanged');
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
