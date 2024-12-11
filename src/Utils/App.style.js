import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  ImageBackground: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
