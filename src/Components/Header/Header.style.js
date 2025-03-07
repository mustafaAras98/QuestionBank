import {StyleSheet} from 'react-native';
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
    SwitchContainer: {flex: 1, marginVertical: '3%'},
    Title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    ThemeSwitchAnimation: {flex: 1, width: '100%', height: '100%'},
  });
};
