import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import styles from './AddImageModal.style';
import TextInputComp from '../TextInputComp';
import {Enums} from '../../Constants/Enums';
import albumService from '../../Services/Album.Service';

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
  const imageRef = useRef(imageName);
  const handleImageNameChange = useCallback(value => {
    imageRef.current = value;
    setImageName(value);
  }, []);

  const handleAddImageToAlbum = async () => {
    if (imageName === '') {
      Alert.alert(
        'Image Name Can Not Found',
        'Image Name Can Not found. Please enter a image name.',
        [{text: 'OK', onPress: () => null}],
      );
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
        throw new Error(`Image Add to Album failed: ${status}`);
      }
    } catch (error) {
      console.error('Image Add to Album error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
    setModalVisible(!isModalVisible);
    handleImageNameChange('');
    reFetch();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        handleImageNameChange('');
      }}>
      <View style={styles.CenteredView}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={styles.CloseButton}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}>
            <Text style={styles.CloseText}>X</Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text style={styles.Title}>Add Image to Album</Text>
          </View>
          <View style={styles.FormContainer}>
            <View style={styles.NameInputContainer}>
              <TextInputComp
                maxLength={18}
                theme={Enums.TEXTINPUT_TYPES.Primary}
                label="ImageName"
                placeholder="Name"
                fontSizeParam={16}
                value={imageName}
                onChangeValue={handleImageNameChange}
              />
            </View>
            {!image || image !== null  && (
              <View style={styles.ImageContainer}>
                <Image style={styles.ImageComp} source={{uri: image.path}} />
              </View>
            )}
            <View style={styles.AddImageButtonContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="darkslategrey" />
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    await handleAddImageToAlbum();
                  }}
                  style={styles.AddImageButton}>
                  <Text style={styles.ButtonText}>Add Image to Album</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(AddImageModal);
