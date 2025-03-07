import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    CenteredView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ModalView: {
      height: Dimensions.get('screen').width,
      width: Dimensions.get('screen').width * 0.8,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      shadowColor: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    Header: {
      width: '100%',
      height: Dimensions.get('screen').width * 0.7 * 0.15,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Title: {
      textAlign: 'center',
      fontWeight: '800',
      fontSize: 20,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    ImageContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImageComp: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    CloseButton: {
      flex: 1,
      position: 'absolute',
      width: Dimensions.get('screen').width * 0.7 * 0.15,
      height: Dimensions.get('screen').width * 0.7 * 0.15,
      borderRadius: Dimensions.get('screen').width * 0.7 * 0.15 * 0.5,
      top: -10,
      right: -10,
      elevation: 2,
      backgroundColor: Colors.Message.Error,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    CloseText: {color: Colors.Common.White, fontWeight: '800'},
  });
};
