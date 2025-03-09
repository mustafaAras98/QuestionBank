import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {createStyles} from './DisplayImageModal.style';
import {Colors} from '../../../Constants/Colors';

const DisplayImageModal = ({
  isModalVisible,
  setSelectedImage,
  imageUrl,
  title,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadCompleted, setIsDownloadCompleted] = useState(false);
  const taskRef = useRef(null);

  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const navigate = useNavigation();
  const navigateImageScreen = () => {
    navigate.navigate('ImageScreen', imageUrl);
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    if (taskRef.current) {
      taskRef.current.cancel();
      setIsDownloading(false);
      setIsDownloadCompleted(false);
    }
    setSelectedImage(null);
  };

  const requestStoragePermission = async () => {
    try {
      const androidVersion = Number(Platform.Version);
      if (androidVersion >= 29) {
        return true;
      }
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (hasPermission) {
        return true;
      }
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'Question Bank needs storage permission for saving images',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Storage permission is required to save images. Please enable it in app settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Go to Settings', onPress: () => Linking.openSettings()},
          ],
        );
        return false;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Permission request error:', err);
      return false;
    }
  };
  const copyMediaToStorage = async (filePath, fileName) => {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: 'Questionbank',
          mimeType: 'image/png',
        },
        'Image',
        filePath,
      );
    } catch (error) {
      console.error('CopyMediaToStore: ', error);
    }
  };
  const downloadAndSaveImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return;
    }
    try {
      const date = new Date();
      const timestamp = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}`;
      const fileName = `${timestamp}_${title}.png`;
      const filePath = `${ReactNativeBlobUtil.fs.dirs.PictureDir}/${fileName}`;

      setIsDownloading(true);
      taskRef.current = ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'png',
        path: filePath,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading Image',
          mime: 'image/png',
          mediaScannable: true,
        },
      }).fetch('GET', imageUrl);

      taskRef.current
        .then(async res => {
          await copyMediaToStorage(res.path(), fileName);
          ToastAndroid.show(
            'Image has been saved',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            1000
          );
          setIsDownloadCompleted(true);
          setIsDownloading(false);
        })
        .catch(error => {
          if (error.message !== 'canceled') {
            setIsDownloadCompleted(false);
            console.error('Download error: ', error);
          }
          setIsDownloading(false);
        });
    } catch (error) {
      console.error('downloadAndSaveImage:', error);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleCloseModal}>
      <View style={styles.CenteredView}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={styles.CloseButton}
            onPress={handleCloseModal}>
            <Text adjustsFontSizeToFit style={styles.CloseText}>
              X
            </Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text adjustsFontSizeToFit style={styles.Title}>
              {title}
            </Text>
            <TouchableOpacity
              disabled={isDownloading || isDownloadCompleted}
              onPress={downloadAndSaveImage}
              style={styles.SaveIconContainer}>
              {isDownloading ? (
                <ActivityIndicator color={Colors.Common.Black} />
              ) : isDownloadCompleted ? (
                <FontAwesome6
                  adjustsFontSizeToFit
                  style={styles.CheckIcon}
                  iconStyle="solid"
                  name="check"
                />
              ) : (
                <FontAwesome6
                  adjustsFontSizeToFit
                  style={styles.SaveIcon}
                  iconStyle="solid"
                  name="download"
                />
              )}
            </TouchableOpacity>
          </View>
          {imageUrl && (
            <TouchableOpacity
              onPress={navigateImageScreen}
              style={styles.ImageContainer}>
              <Image style={styles.ImageComp} source={{uri: imageUrl}} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(DisplayImageModal);
