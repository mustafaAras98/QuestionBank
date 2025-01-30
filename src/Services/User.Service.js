import {albumCollectionsByUserId} from '../Constants/Collections';
import {Enums} from '../Constants/Enums';

const fetchAlbumTitlesByUserId = async userId => {
  try {
    const albumCollection = albumCollectionsByUserId(userId);
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
  try {
    const albumCollection = albumCollectionsByUserId(userId);
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

const userService = {fetchAlbumsByUserId, fetchAlbumTitlesByUserId};

export default userService;
