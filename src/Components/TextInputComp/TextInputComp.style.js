import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

const baseTextInputContainer = {
  flex: 1,
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1.5,
};

const baseLabel = {
  position: 'absolute',
  left: '5%',
  top: '-20%',
  paddingHorizontal: '4%',
  zIndex: 1,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  borderTopWidth: 1.5,
  fontWeight: '500',
};

const baseInputComp = {
  flex: 5,
  marginLeft: '5%',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignSelf: 'center',
  textAlignVertical: 'center',
  textAlign: 'left',
  paddingBottom: 0,
  paddingTop: 0,
};

const baseLeftIcon = {
  flex: 1,
  height: '100%',
  width: '100%',
  textAlign: 'center',
  textAlignVertical: 'center',
};

const baseRightIcon = {
  flex: 1,
  height: '100%',
  width: '100%',
  textAlign: 'center',
  textAlignVertical: 'center',
  marginRight: 10,
};

export default {
  DarkTheme: StyleSheet.create({
    TextInputContainer: {
      ...baseTextInputContainer,
      backgroundColor: Colors.DarkTheme.BackgroundColor,
      borderColor: Colors.DarkTheme.Text,
    },
    Label: {
      ...baseLabel,
      color: Colors.DarkTheme.Text,
      backgroundColor: Colors.DarkTheme.BackgroundColor,
      borderColor: Colors.DarkTheme.Text,
      shadowColor: Colors.DarkTheme.Text,
    },
    InputComp: {
      ...baseInputComp,
      color: Colors.DarkTheme.Text,
    },
    LeftIcon: {
      ...baseLeftIcon,
      color: Colors.DarkTheme.Text,
    },
    RightIcon: {
      ...baseRightIcon,
      color: Colors.DarkTheme.Text,
    },
  }),

  LightTheme: StyleSheet.create({
    TextInputContainer: {
      ...baseTextInputContainer,
      backgroundColor: Colors.LightTheme.BackgroundColor,
      borderColor: Colors.LightTheme.Text,
    },
    Label: {
      ...baseLabel,
      color: Colors.LightTheme.Text,
      backgroundColor: Colors.LightTheme.BackgroundColor,
      borderColor: Colors.LightTheme.Text,
      shadowColor: Colors.LightTheme.Text,
    },
    InputComp: {
      ...baseInputComp,
      color: Colors.LightTheme.Text,
    },
    LeftIcon: {
      ...baseLeftIcon,
      color: Colors.LightTheme.Text,
    },
    RightIcon: {
      ...baseRightIcon,
      color: Colors.LightTheme.Text,
    },
  }),
};
