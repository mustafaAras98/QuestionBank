import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
    },
    TitleContainer: {flex: 2},
    SwitchContainer: {
      flex: 0.5,
      marginVertical: '3%',
    },
    LanguageContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
      width: '100%',
      marginRight: '2%',
      zIndex: 2,
    },
    Title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    ThemeSwitchAnimation: {flex: 1, width: '100%', height: '100%'},
    LanguageIcon: {
      flex: 1,
      width: '100%',
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 24,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    FlagButton: {
      position: 'absolute',
      right: '2%',
      zIndex: 1,
    },
    FlagTouchable: {
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Text
        : Colors.LightTheme.Text,
      borderRadius: ' 50%',
      height: Dimensions.get('window').width * 0.9 * 0.15,
      width: Dimensions.get('window').width * 0.9 * 0.15,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    FlagIcon: {
      flex: 1,
      width: '100%',
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 24,
      color: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
    },
  });
};
