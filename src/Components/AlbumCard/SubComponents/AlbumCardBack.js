import {View, ActivityIndicator, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {styles} from '../AlbumCard.style';
import TextInputComp from '../../TextInputComp';
import {Enums} from '../../../Constants/Enums';
import ButtonComp from '../../ButtonComp';
import albumService from '../../../Services/Album.Service';
import {useSelector} from 'react-redux';

const AlbumCardBack = ({onLongPress, albumItem, reFetchAlbums, isFlipped}) => {
  const [title, setTitle] = useState('');
  const titleRef = useRef(title);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleTitleChange = useCallback(value => {
    titleRef.current = value;
    setTitle(value);
  }, []);

  useEffect(() => {
    if (isFlipped === false) {
      setTitle('');
    }
  }, [isFlipped]);

  const userUid = useSelector(state => state.user.info.uid);

  const handleDeleteButtonPress = async () => {
    setDeleteLoading(true);
    try {
      const status = await albumService.removeAlbum(albumItem.Uid, userUid);
      if (status !== Enums.STATUS.Success) {
        throw new Error(`Album creation failed: ${status}`);
      }
    } catch (error) {
      console.error('Delete Album Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleEditTitlePress = async () => {
    try {
      const status = await albumService.editAlbumTitle(
        albumItem.Uid,
        userUid,
        title,
      );
      if (status !== Enums.STATUS.Success) {
        throw new Error(`Album creation failed: ${status}`);
      }
    } catch (error) {
      console.error('Delete Album Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };
  return (
    <TouchableOpacity
      onLongPress={() => {
        onLongPress();
        setTitle('');
      }}
      style={styles.InnerContainer}>
      <View style={styles.AlbumCardBackContainer}>
        <View style={styles.AlbumCardBackItemContainer}>
          <TextInputComp
            fontSizeParam={10}
            label="Edit Title"
            theme={Enums.TEXTINPUT_TYPES.Primary}
            rightLogoName="pen"
            placeholder="New Title"
            value={title}
            onChangeValue={handleTitleChange}
            rightLogoOnPress={async () => {
              await handleEditTitlePress();
              reFetchAlbums();
            }}
          />
        </View>
        <View style={styles.AlbumCardBackItemContainer}>
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
              contentSize={16}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardBack);
