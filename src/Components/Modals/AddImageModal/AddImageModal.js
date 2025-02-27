import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import styles from './AddImageModal.style';
import {Enums} from '../../../Constants/Enums';

import TextInputComp from '../../TextInputComp';
import albumService from '../../../Services/Album.Service';

const AddImageModal = ({
  userId,
  albumId,
  image,
  isModalVisible,
  setModalVisible,
  reFetch,
}) => {
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);

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
      Alert.alert(
        'Image Name Required',
        'Please enter a name for your image.',
        [{text: 'OK'}],
      );
      return false;
    }
    return true;
  }, [imageName]);

  const handleAddImageToAlbum = useCallback(async () => {
    if (!validateImageName()) {
      return;
    }

    setLoading(true);
    try {
      const status = await albumService.addNewImage(
        albumId,
        userId,
        imageName,
        image.path,
      );

      if (status !== Enums.STATUS.Success) {
        throw new Error(`Failed to add image: ${status}`);
      }

      closeModal();
      reFetch();
    } catch (error) {
      console.error('Image Add to Album error:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to add image to album. Please try again.',
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
  }, [image]);

  const renderSubmitButton = useCallback(() => {
    if (loading) {
      return <ActivityIndicator size="large" color="darkslategrey" />;
    }

    return (
      <TouchableOpacity
        onPress={handleAddImageToAlbum}
        style={styles.AddImageButton}>
        <Text adjustsFontSizeToFit style={styles.ButtonText}>
          Add Image to Album
        </Text>
      </TouchableOpacity>
    );
  }, [loading, handleAddImageToAlbum]);

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
              Add Image to Album
            </Text>
          </View>
          <View style={styles.FormContainer}>
            <View style={styles.NameInputContainer}>
              <TextInputComp
                maxLength={18}
                theme={Enums.TEXTINPUT_TYPES.Primary}
                label="ImageName"
                placeholder="Name"
                value={imageName}
                onChangeValue={handleImageNameChange}
              />
            </View>
            {renderImage()}
            <View style={styles.AddImageButtonContainer}>
              {renderSubmitButton()}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(AddImageModal);
