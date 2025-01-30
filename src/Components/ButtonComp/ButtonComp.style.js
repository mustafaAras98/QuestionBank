import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  Button: {
    justifyContent: 'center',
    verticalAlign: 'middle',
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  ButtonText: {alignSelf: 'center', fontWeight: 600, fontSize: 22},
  RightIcon: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  ButtonIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default {
  primary: StyleSheet.create({...baseStyle}),
  delete: StyleSheet.create({
    ...baseStyle,
    Button: {
      ...baseStyle.Button,
      backgroundColor: 'red',
      borderColor: 'maroon',
    },
    ButtonText: {
      ...baseStyle.ButtonText,
      color: 'white',
    },
    RightIcon: {color: 'white'},
  }),
};
