import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      flex: 1,
      maxHeight: Dimensions.get('window').height * 0.7,
      width: '100%',
      padding: 10,
      alignContent: 'center',
      justifyContent: 'center',
    },
    GlassBackground: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '70'
        : Colors.LightTheme.BackgroundColor + '70',
      opacity: 0.7,
      filter: 'blur(2)',
      elevation: 1,
    },
    RegisterFormContainer: {
      flex: 6,
      gap: '5%',
      padding: 10,
      marginTop: '5%',
    },
    FailedMessageContainer: {
      flex: 1,
      marginHorizontal: 10,
      padding: 10,
      opacity: 0.95,
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      backgroundColor: Colors.Message.Error,
    },
    MessageText: {
      fontWeight: 700,
      color: Colors.Common.White,
    },
    Seperator: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    SeperatorLine: {
      marginHorizontal: 10,
      height: 2,
      flex: 5,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Text
        : Colors.LightTheme.Text,
    },
    SeperatorText: {
      flex: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 700,
      fontSize: 18,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    OptionalRegisterButtonContainer: {
      flex: 1.2,
      padding: 10,
      flexDirection: 'row',
      alignContent: 'center',
    },
    NavigateRegisterContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    NavigateRegisterText: {
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      fontWeight: 500,
    },
    NavigateRegisterButton: {
      fontWeight: 700,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      textDecorationLine: 'underline',
      marginLeft: '2%',
    },
  });
};
