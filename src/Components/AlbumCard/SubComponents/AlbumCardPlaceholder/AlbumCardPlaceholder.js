import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import AlbumCreateModal from '../../../Modals/AlbumCreateModal';

import {styles} from './AlbumCardPlaceholder.styles';

const AlbumCardPlaceholder = ({reFetchAlbums}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={styles.PlaceholderInnerContainer}>
      <View style={styles.PlaceholderItemButton}>
        <Text adjustsFontSizeToFit style={styles.PlaceholderItemButtonText}>
          +
        </Text>
      </View>
      <AlbumCreateModal
        reFetchAlbums={reFetchAlbums}
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
      />
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardPlaceholder);
