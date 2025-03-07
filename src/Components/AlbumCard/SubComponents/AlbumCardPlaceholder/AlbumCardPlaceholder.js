import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';

import AlbumCreateModal from '../../../Modals/AlbumCreateModal';

import {createStyles} from './AlbumCardPlaceholder.styles';
import {useSelector} from 'react-redux';

const AlbumCardPlaceholder = ({reFetchAlbums}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);
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
