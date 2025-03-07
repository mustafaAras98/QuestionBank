import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';
  return StyleSheet.create({
    Container: {flex: 1},
    TabBarStyle: {
      backgroundColor: isDarkTheme ? Colors.DarkTheme.BackgroundColor : Colors.LightTheme.BackgroundColor,
      position: 'absolute',
      height: Dimensions.get('screen').height * 0.08,
      bottom: Dimensions.get('screen').height * 0.02,
      marginHorizontal: '4%',
      alignItems: 'center',
    },
    TabBarItemStyle: {alignSelf: 'center'},
    TabBarIconStyle: {flex: 1, alignSelf: 'center'},
    FocusedIcon: {
      fontSize: 24,
      color: isDarkTheme ? Colors.DarkTheme.Secondary : Colors.LightTheme.Secondary,
    },
    UnfocusedIcon: {
      fontSize: 22,
      color: isDarkTheme
        ? Colors.DarkTheme.Primary
        : Colors.LightTheme.Primary,
    },
    FocusedIndicator: {
      borderRadius: 20,
      width: 10,
      height: 10,
      marginTop: 5,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Secondary
        : Colors.LightTheme.Secondary,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });
};
