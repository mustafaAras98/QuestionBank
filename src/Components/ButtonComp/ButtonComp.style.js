import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingHorizontal: '5%',
    borderStyle: 'solid',
    borderWidth: 1.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ButtonText: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 700,
    fontSize: 18,
  },
  RightIcon: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default {
  primary: StyleSheet.create({
    ...baseStyle,
    ButtonContainer: {
      ...baseStyle.ButtonContainer,
      backgroundColor: 'white',
      shadowColor: '#000',
    },
    ButtonText: {
      ...baseStyle.ButtonText,
      flex: 5,
      color: 'black',
    },
    RightIcon: {
      ...baseStyle.RightIcon,
      flex: 2,
      color: 'black',
    },
  }),
  delete: StyleSheet.create({
    ...baseStyle,
    ButtonContainer: {
      ...baseStyle.ButtonContainer,
      backgroundColor: 'red',
      shadowColor: 'red',
    },
    ButtonText: {
      ...baseStyle.ButtonText,
      color: 'white',
      flex: 5,
    },
    RightIcon: {
      ...baseStyle.RightIcon,
      flex: 2,
      color: 'white',
    },
  }),
};
