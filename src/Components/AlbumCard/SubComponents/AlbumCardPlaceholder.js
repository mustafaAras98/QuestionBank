import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../AlbumCard.style';
import AlbumCreateModal from '../../AlbumCreateModal/AlbumCreateModal';

const AlbumCardPlaceholder = ({reFetchAlbums}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={styles.PlaceholderInnerContainer}>
      <View style={styles.PlaceholderItemButton}>
        <Text style={styles.PlaceholderItemButtonText}>+</Text>
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
