import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  Button: {
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  ButtonText: {alignSelf: 'center', fontWeight: 600, fontSize: 22},
});

export default {
  primary: StyleSheet.create({...baseStyle}),
};
