import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useMemo} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {createStyles} from './AlbumCardFront.style';

const AlbumCardFront = ({albumTitle, albumImageUri, albumUid, onLongPress}) => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);
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
        <Text adjustsFontSizeToFit style={styles.Text}>
          {albumTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardFront);
