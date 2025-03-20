import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';

import albumService from '../../../../Services/Album.Service';
import TextInputComp from '../../../TextInputComp';
import ButtonComp from '../../../ButtonComp';

import {createStyles} from './AlbumCardBack.style';
import {Enums} from '../../../../Constants/Enums';
import Encrypt from '../../../../Utils/Encrypt';
import urlSafeEncode from '../../../../Utils/UrlSafeEncode';
import {useTranslation} from 'react-i18next';

const AlbumCardBack = ({onLongPress, albumItem, reFetchAlbums, isFlipped}) => {
  const {t} = useTranslation();
  const [title, setTitle] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editCoverLoading, setEditCoverLoading] = useState(false);

  const userUid = useSelector(state => state.user.info.uid);
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const handleTitleChange = useCallback(value => {
    setTitle(value);
  }, []);

  useEffect(() => {
    if (isFlipped === false) {
      setTitle('');
    }
  }, [isFlipped]);

  const handleError = useCallback(
    (operation, error) => {
      console.error(`${operation}  t('commonUse.Error'):`, error);
      Alert.alert(
        t('commonUse.Error'),
        error.message || t('commonErrors.UnknownError'),
      );
    },
    [t],
  );

  const handleDeleteButtonPress = useCallback(async () => {
    setDeleteLoading(true);
    try {
      const status = await albumService.removeAlbum(albumItem.Uid, userUid, t);
      if (status !== Enums.STATUS.Success) {
        throw new Error(status);
      }
      reFetchAlbums();
    } catch (error) {
      handleError(t('album.DeleteAlbum'), error);
    } finally {
      setDeleteLoading(false);
    }
  }, [albumItem.Uid, userUid, reFetchAlbums, handleError, t]);

  const handleEditTitlePress = useCallback(async () => {
    try {
      const status = await albumService.editAlbumTitle(
        albumItem.Uid,
        userUid,
        title,
        t,
      );
      if (status !== Enums.STATUS.Success) {
        throw new Error(status);
      }
      reFetchAlbums();
    } catch (error) {
      handleError(t('commonUse.EditTitle'), error);
    }
  }, [albumItem.Uid, userUid, title, reFetchAlbums, handleError, t]);

  const onShare = useCallback(async () => {
    try {
      const albumIdEncrpyted = await Encrypt(albumItem.Uid);
      const encryptedHex = urlSafeEncode.encodeUrlSafeBase64(albumIdEncrpyted);

      const deepLink = `https://questionbankwebhost.web.app/${Enums.OpenImageList.Album}/${encryptedHex}`;

      await Share.share({
        title: 'QuestionBank',
        message: deepLink,
        url: deepLink,
      });
    } catch (error) {
      handleError(t('commonUse.Share'), error);
    }
  }, [albumItem.Uid, handleError, t]);

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
              theme={theme}
              rightLogoName="pen"
              placeholder={t('albumCard.NewTitle')}
              value={title}
              onChangeValue={handleTitleChange}
              maxLength={18}
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
                theme={theme}
                buttonText={t('albumCard.EditAlbumCover')}
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
                        t,
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
                buttonText={t('commonUse.Delete')}
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
              theme={theme}
              buttonText={t('commonUse.Share')}
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
