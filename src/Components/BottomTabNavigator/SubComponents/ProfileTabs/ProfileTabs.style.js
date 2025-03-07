import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import {Colors} from '../../../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';
  return StyleSheet.create({
    OutsideContainer: {
      flex: 1,
      display: 'flex',
      position: 'absolute',
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    },
    ProfileTabContainer: {
      flex: 1,
      position: 'absolute',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      height: '15%',
      width: '45%',
      bottom: Dimensions.get('window').height * 0.14 + StatusBar.currentHeight,
      marginHorizontal: '4%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      right: 0,
      zIndex: 1,
      borderWidth: 3,
      borderColor: isDarkTheme
        ? Colors.DarkTheme.Secondary
        : Colors.LightTheme.Secondary,
    },
    ProfileTabRowContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: '5%',
    },
    Seperator: {
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Secondary
        : Colors.LightTheme.Secondary,
      height: '2%',
      width: '100%',
    },
    ProfileTabIcon: {
      color: isDarkTheme
        ? Colors.DarkTheme.Text
        : Colors.LightTheme.Text,
      fontSize: 22,
    },
    ProfileTabText: {
      flex: 1,
      alignSelf: 'center',
      textAlignVertical: 'center',
      color: isDarkTheme
        ? Colors.DarkTheme.Text
        : Colors.LightTheme.Text,
      fontSize: 16,
      fontWeight: '700',
    },
  });
};
