import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';

import {createStyles} from './AddImageModal.style';
import {Enums} from '../../../Constants/Enums';

import TextInputComp from '../../TextInputComp';
import albumService from '../../../Services/Album.Service';
import {useSelector} from 'react-redux';
import {Colors} from '../../../Constants/Colors';
import {useTranslation} from 'react-i18next';

const AddImageModal = ({
  userId,
  albumId,
  image,
  isModalVisible,
  setModalVisible,
  reFetch,
}) => {
  const {t} = useTranslation();
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const handleImageNameChange = useCallback(value => {
    setImageName(value);
  }, []);

  const resetModal = useCallback(() => {
    setImageName('');
    setLoading(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    resetModal();
  }, [resetModal, setModalVisible]);

  const validateImageName = useCallback(() => {
    if (!imageName.trim()) {
      return false;
    }
    return true;
  }, [imageName]);

  const handleAddImageToAlbum = useCallback(async () => {
    if (!validateImageName()) {
      setImageName('');
    }

    setLoading(true);
    try {
      const status = await albumService.addNewImage(
        albumId,
        userId,
        imageName,
        image.path,
        t,
      );

      if (status !== Enums.STATUS.Success) {
        throw new Error(status);
      }

      closeModal();
      reFetch();
    } catch (error) {
      Alert.alert(
        t('commonUse.Error'),
        error.message || t('image.imageErrors.FailedImageUpload'),
      );
    }
    setLoading(false);
  }, [
    albumId,
    closeModal,
    image,
    imageName,
    reFetch,
    userId,
    validateImageName,
    t,
  ]);

  const renderImage = useCallback(() => {
    if (!image) {
      return null;
    }

    return (
      <View style={styles.ImageContainer}>
        <Image style={styles.ImageComp} source={{uri: image.path}} />
      </View>
    );
  }, [image, styles]);

  const renderSubmitButton = useCallback(
    themeProp => {
      if (loading) {
        return (
          <ActivityIndicator
            size="large"
            color={
              themeProp === Enums.Themes.DarkTheme
                ? Colors.DarkTheme.Text
                : Colors.LightTheme.Text
            }
          />
        );
      }

      return (
        <TouchableOpacity
          onPress={handleAddImageToAlbum}
          style={styles.AddImageButton}>
          <Text adjustsFontSizeToFit style={styles.ButtonText}>
            {t('modals.AddImageModal.ButtonText')}
          </Text>
        </TouchableOpacity>
      );
    },
    [loading, handleAddImageToAlbum, styles, t],
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}>
      <View style={styles.CenteredView}>
        <View style={styles.ModalView}>
          <TouchableOpacity style={styles.CloseButton} onPress={closeModal}>
            <Text adjustsFontSizeToFit style={styles.CloseText}>
              X
            </Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text adjustsFontSizeToFit style={styles.Title}>
              {t('modals.AddImageModal.Title')}
            </Text>
          </View>
          <View style={styles.FormContainer}>
            <View style={styles.NameInputContainer}>
              <TextInputComp
                maxLength={18}
                theme={theme}
                label={t('commonUse.ImageName')}
                placeholder={t('commonUse.ImageName')}
                value={imageName}
                onChangeValue={handleImageNameChange}
              />
            </View>
            {renderImage()}
            <View style={styles.AddImageButtonContainer}>
              {renderSubmitButton(theme)}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(AddImageModal);
