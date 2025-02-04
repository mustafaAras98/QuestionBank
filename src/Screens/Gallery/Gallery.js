import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Gallery = ({route}) => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.setParams({albumId: -1});
      };
    }, [navigation]),
  );

  const {albumId} = route.params;
  return (
    <View>
      <Text>{albumId}</Text>
    </View>
  );
};

export default Gallery;
