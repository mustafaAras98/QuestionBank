import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import albumService from '../../../Services/Album.Service';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {createStyles} from './AlbumCreateModal.style';

import {Enums} from '../../../Constants/Enums';
import {Colors} from '../../../Constants/Colors';

import TextInputComp from '../../TextInputComp';
import {useTranslation} from 'react-i18next';

const AlbumCreateModal = ({modalVisible, setModalVisible, reFetchAlbums}) => {
  const {t} = useTranslation();
  const [title, setTitle] = useState('');
  const titleRef = useRef(title);

  const handleTitleChange = useCallback(value => {
    titleRef.current = value;
    setTitle(value);
  }, []);

  const [isImageTaken, setIsImageTaken] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const userUid = useSelector(state => state.user.info.uid);
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const handleCreateNewAlbum = async () => {
    setLoading(true);
    try {
      const status = await albumService.createNewAlbum(
        userUid,
        title,
        image?.path,
        t,
      );
      if (status !== Enums.STATUS.Success) {
        throw new Error(status);
      }
    } catch (error) {
      Alert.alert(
        t('commonUse.Error'),
        error.message || t('commonErrors.UnknownError'),
      );
    } finally {
      setLoading(false);
    }

    setModalVisible(!modalVisible);
    setTitle('');
    setImage(null);
    setIsImageTaken(false);
    ImagePicker.clean();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.CenteredView}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={styles.CloseButton}
            onPress={() => {
              setModalVisible(!modalVisible);
              setTitle('');
              setImage(null);
              setIsImageTaken(false);
              ImagePicker.clean();
            }}>
            <Text adjustsFontSizeToFits style={styles.CloseText}>
              X
            </Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text style={styles.Title}>
              {t('modals.CreateNewAlbumModal.Title')}
            </Text>
          </View>
          <View style={styles.FormContainer}>
            <View style={styles.TitleInputContainer}>
              <TextInputComp
                maxLength={18}
                theme={theme}
                label={t('commonUse.Title')}
                placeholder={t('commonUse.Title')}
                value={title}
                onChangeValue={handleTitleChange}
              />
            </View>
            {isImageTaken ? (
              <View style={styles.ImageContainer}>
                <Image style={styles.ImageComp} source={{uri: image.path}} />
              </View>
            ) : (
              <View style={styles.ImagePickerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    ImagePicker.openCamera({
                      width: 512,
                      height: 512,
                      cropping: true,
                      freeStyleCropEnabled: true,
                      compressImageQuality: 0.8,
                    }).then(returnedImage => {
                      setIsImageTaken(true);
                      setImage(returnedImage);
                    });
                  }}
                  style={styles.ImagePickerButton}>
                  <Text adjustsFontSizeToFit style={styles.ImagePickerText}>
                    {`${t('gallery.TakePhoto').replace(' ', '\n')}`}
                  </Text>
                  <FontAwesome6
                    adjustsFontSizeToFits
                    style={styles.ImagePickerIcon}
                    name="camera"
                    iconStyle={'solid'}
                    size={28}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    ImagePicker.openPicker({
                      compressImageMaxHeight: 512,
                      compressImageMaxWidth: 512,
                      cropping: true,
                      freeStyleCropEnabled: true,
                      compressImageQuality: 0.8,
                    }).then(returnedImage => {
                      setIsImageTaken(true);
                      setImage(returnedImage);
                    });
                  }}
                  style={styles.ImagePickerButton}>
                  <Text adjustsFontSizeToFit style={styles.ImagePickerText}>
                    {`${t('gallery.SelectImage').replace(' ', '\n')}`}
                  </Text>
                  <FontAwesome6
                    adjustsFontSizeToFits
                    style={styles.ImagePickerIcon}
                    name="file-image"
                    iconStyle={'solid'}
                    size={28}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.CreateButtonContainer}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={
                    theme === Enums.Themes.DarkTheme
                      ? Colors.DarkTheme.Text
                      : Colors.LightTheme.Text
                  }
                />
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    await handleCreateNewAlbum();
                    reFetchAlbums();
                  }}
                  style={styles.CreateButton}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.ButtonText}>
                    {t('modals.CreateNewAlbumModal.ButtonText')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(AlbumCreateModal);
