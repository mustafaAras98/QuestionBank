import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from '../AlbumCard.style';

const AlbumCardFront = ({albumTitle, onLongPress}) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={() => {
        console.log('Go To Album Page!');
      }}
      style={styles.InnerContainer}>
      <View style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
      </View>
      <View style={styles.TitleContainer}>
        <Text style={styles.Text}>{albumTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardFront);
