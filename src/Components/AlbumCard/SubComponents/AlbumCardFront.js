import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from '../AlbumCard.style';
import {useNavigation} from '@react-navigation/native';

const AlbumCardFront = ({albumTitle, albumImageUri, albumUid, onLongPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={() => {
        navigation.navigate('Gallery', {albumId: albumUid});
      }}
      style={styles.InnerContainer}>
      <View style={styles.ImageContainer}>
        <Image style={styles.Image} source={{uri: albumImageUri}} />
      </View>
      <View style={styles.TitleContainer}>
        <Text style={styles.Text}>{albumTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardFront);
