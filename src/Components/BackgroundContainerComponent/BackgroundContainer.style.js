import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  Container: {flex: 1},
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  ChildrenContainer: {
    height: Dimensions.get('window').height * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
