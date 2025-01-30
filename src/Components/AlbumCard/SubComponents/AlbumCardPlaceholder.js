import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../AlbumCard.style';

const AlbumCardPlaceholder = ({}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Create new Album!');
      }}
      style={styles.PlaceholderInnerContainer}>
      <View style={styles.PlaceholderItemButton}>
        <Text style={styles.PlaceholderItemButtonText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardPlaceholder);
