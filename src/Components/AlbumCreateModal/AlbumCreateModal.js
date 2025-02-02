import React, {useCallback, useRef, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Enums} from '../../Constants/Enums';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styles from './AlbumCreateModal.style';
import TextInputComp from '../TextInputComp';
import ImagePicker from 'react-native-image-crop-picker';
import userService from '../../Services/User.Service';
import {useSelector} from 'react-redux';

const AlbumCreateModal = ({modalVisible, setModalVisible, reFetchAlbums}) => {
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

  const handleCreateNewAlbum = async () => {
    if (title === '') {
      Alert.alert('Title Not Found', 'Title not found. Please enter a title.', [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }
    if (!image) {
      Alert.alert(
        'Photo Not Found',
        'Photo not found. Please take a new photo or select one.',
        [{text: 'OK', onPress: () => null}],
      );
      return;
    }

    setLoading(true);
    try {
      const status = await userService.createNewAlbum(
        userUid,
        title,
        image.path,
      );
      if (status !== Enums.STATUS.Success) {
        throw new Error(`Album creation failed: ${status}`);
      }
    } catch (error) {
      console.error('Create album error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
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
        setModalVisible();
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
            <Text style={styles.CloseText}>X</Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text style={styles.Title}>Create New Album</Text>
          </View>
          <View style={styles.FormContainer}>
            <View style={styles.TitleInputContainer}>
              <TextInputComp
                maxLength={18}
                theme={Enums.TEXTINPUT_TYPES.Primary}
                label="Title"
                placeholder="Title"
                fontSizeParam={16}
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
                      compressImageQuality: 0.8,
                    }).then(returnedImage => {
                      setIsImageTaken(true);
                      setImage(returnedImage);
                    });
                  }}
                  style={styles.CameraSelectionButton}>
                  <Text style={styles.ImagePickerText}>Take Photo</Text>
                  <FontAwesome6
                    style={styles.ImagePickerIcon}
                    name="camera"
                    iconStyle={'solid'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    ImagePicker.openPicker({
                      compressImageMaxHeight: 512,
                      compressImageMaxWidth: 512,
                      cropping: true,
                      compressImageQuality: 0.8,
                    }).then(returnedImage => {
                      setIsImageTaken(true);
                      setImage(returnedImage);
                    });
                  }}
                  style={styles.LibrarySelectionButton}>
                  <Text style={styles.ImagePickerText}>Select Image</Text>
                  <FontAwesome6
                    style={styles.ImagePickerIcon}
                    name="file-image"
                    iconStyle={'solid'}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.CreateButtonContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="darkslategrey" />
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    await handleCreateNewAlbum();
                    reFetchAlbums();
                  }}
                  style={styles.CreateButton}>
                  <Text style={styles.ButtonText}>Create New Album</Text>
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
