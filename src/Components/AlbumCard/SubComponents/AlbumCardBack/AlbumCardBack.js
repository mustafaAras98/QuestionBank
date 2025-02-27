import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';

import albumService from '../../../../Services/Album.Service';
import TextInputComp from '../../../TextInputComp';
import ButtonComp from '../../../ButtonComp';

import {styles} from './AlbumCardBack.style';
import {Enums} from '../../../../Constants/Enums';
import Encrypt from '../../../../Utils/Encrypt';
import urlSafeEncode from '../../../../Utils/UrlSafeEncode';

const AlbumCardBack = ({onLongPress, albumItem, reFetchAlbums, isFlipped}) => {
  const [title, setTitle] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editCoverLoading, setEditCoverLoading] = useState(false);

  const userUid = useSelector(state => state.user.info.uid);

  const handleTitleChange = useCallback(value => {
    setTitle(value);
  }, []);

  useEffect(() => {
    if (isFlipped === false) {
      setTitle('');
    }
  }, [isFlipped]);

  const handleError = useCallback((operation, error) => {
    console.error(`${operation} Error:`, error);
    Alert.alert('Error', error.message || 'Something went wrong.');
  }, []);

  const handleDeleteButtonPress = useCallback(async () => {
    setDeleteLoading(true);
    try {
      const status = await albumService.removeAlbum(albumItem.Uid, userUid);
      if (status !== Enums.STATUS.Success) {
        throw new Error(`Album deletion failed: ${status}`);
      }
      reFetchAlbums();
    } catch (error) {
      handleError('Delete Album', error);
    } finally {
      setDeleteLoading(false);
    }
  }, [albumItem.Uid, userUid, reFetchAlbums, handleError]);

  const handleEditTitlePress = useCallback(async () => {
    try {
      const status = await albumService.editAlbumTitle(
        albumItem.Uid,
        userUid,
        title,
      );
      if (status !== Enums.STATUS.Success) {
        throw new Error(`Album title update failed: ${status}`);
      }
      reFetchAlbums();
    } catch (error) {
      handleError('Edit Title', error);
    }
  }, [albumItem.Uid, userUid, title, reFetchAlbums, handleError]);

  const onShare = useCallback(async () => {
    try {
      const albumIdEncrpyted = await Encrypt(albumItem.Uid);
      const encryptedHex = urlSafeEncode.encodeUrlSafeBase64(albumIdEncrpyted);

      const deepLink = `questionbank://Gallery/${encryptedHex}/${Enums.OpenImageList.Album}`;

      await Share.share({
        title: 'QuestionBank',
        message: deepLink,
        url: deepLink,
      });
    } catch (error) {
      handleError('Share Error', error);
    }
  }, [albumItem.Uid, handleError]);

  return (
    <TouchableOpacity
      onLongPress={() => {
        onLongPress();
        setTitle('');
      }}
      style={styles.InnerContainer}>
      <View style={styles.AlbumCardBackContainer}>
        <View style={styles.AlbumCardBackItemContainer}>
          <View style={styles.AlbumCardBackItem}>
            <TextInputComp
              theme={Enums.TEXTINPUT_TYPES.Primary}
              rightLogoName="pen"
              placeholder="New Title"
              value={title}
              onChangeValue={handleTitleChange}
              rightLogoOnPress={async () => {
                await handleEditTitlePress();
              }}
            />
          </View>

          {editCoverLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <View style={styles.AlbumCardBackItem}>
              <ButtonComp
                theme={Enums.BUTTON_TYPES.Secondary}
                buttonText="Edit Album Cover"
                onPress={async () => {
                  ImageCropPicker.openPicker({
                    width: 512,
                    height: 512,
                    cropping: true,
                    freeStyleCropEnabled: true,
                    compressImageQuality: 0.8,
                  })
                    .then(async returnedImage => {
                      setEditCoverLoading(true);
                      await albumService.editCoverImage(
                        userUid,
                        albumItem.Uid,
                        returnedImage.path,
                      );
                      setEditCoverLoading(false);
                      reFetchAlbums();
                    })
                    .catch(error => {
                      if (error.code !== 'E_PICKER_CANCELLED') {
                        handleError('Edit Cover', error);
                      }
                    });
                }}
                rightLogoName="file-image"
              />
            </View>
          )}
        </View>
        <View style={styles.AlbumCardBackButtonContainer}>
          <View style={styles.AlbumCardBackButton}>
            {deleteLoading ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
              <ButtonComp
                theme={Enums.BUTTON_TYPES.Delete}
                buttonText="Delete"
                onPress={async () => {
                  await handleDeleteButtonPress();
                  reFetchAlbums();
                }}
                rightLogoName="trash-can"
              />
            )}
          </View>
          <View style={styles.AlbumCardBackButton}>
            <ButtonComp
              theme={Enums.BUTTON_TYPES.Secondary}
              buttonText="Share"
              onPress={async () => {
                await onShare();
              }}
              rightLogoName="share"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardBack);
