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

import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import albumService from '../../../Services/Album.Service';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styles from './AlbumCreateModal.style';
import {Enums} from '../../../Constants/Enums';

import TextInputComp from '../../TextInputComp';

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
      const status = await albumService.createNewAlbum(
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
            <Text style={styles.Title}>Create New Album</Text>
          </View>
          <View style={styles.FormContainer}>
            <View style={styles.TitleInputContainer}>
              <TextInputComp
                maxLength={18}
                theme={Enums.TEXTINPUT_TYPES.Primary}
                label="Title"
                placeholder="Title"
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
                    {'Take\nPhoto'}
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
                    {'Select\nImage'}
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
                <ActivityIndicator size="large" color="darkslategrey" />
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
                    Create New Album
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
