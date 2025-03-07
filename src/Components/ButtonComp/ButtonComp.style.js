import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

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
  LightTheme: StyleSheet.create({
    ...baseStyle,
    ButtonContainer: {
      ...baseStyle.ButtonContainer,
      backgroundColor: Colors.LightTheme.BackgroundColor,
      shadowColor: Colors.Common.Black,
    },
    ButtonText: {
      ...baseStyle.ButtonText,
      flex: 5,
      color: Colors.LightTheme.Text,
    },
    RightIcon: {
      ...baseStyle.RightIcon,
      flex: 2,
      color: Colors.LightTheme.Text,
    },
  }),
  DarkTheme: StyleSheet.create({
    ...baseStyle,
    ButtonContainer: {
      ...baseStyle.ButtonContainer,
      backgroundColor: Colors.DarkTheme.BackgroundColor,
      shadowColor: Colors.Common.White,
    },
    ButtonText: {
      ...baseStyle.ButtonText,
      flex: 5,
      color: Colors.DarkTheme.Text,
    },
    RightIcon: {
      ...baseStyle.RightIcon,
      flex: 2,
      color: Colors.DarkTheme.Text,
    },
  }),
  Delete: StyleSheet.create({
    ...baseStyle,
    ButtonContainer: {
      ...baseStyle.ButtonContainer,
      backgroundColor: Colors.Message.Error,
      shadowColor: Colors.Message.Error,
    },
    ButtonText: {
      ...baseStyle.ButtonText,
      color: Colors.Common.White,
      flex: 5,
    },
    RightIcon: {
      ...baseStyle.RightIcon,
      flex: 2,
      color: Colors.Common.White,
    },
  }),
};
