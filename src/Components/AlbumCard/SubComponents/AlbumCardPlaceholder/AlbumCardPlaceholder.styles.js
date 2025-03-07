import {StyleSheet} from 'react-native';
import {Colors} from '../../../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    PlaceholderInnerContainer: {
      flex: 1,
      borderRadius: 16,
      borderWidth: 2,
      margin: 8,
      borderStyle: 'dashed',
      borderColor: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    PlaceholderItemButton: {
      width: '50%',
      height: '50%',
      borderRadius: 16,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      justifyContent: 'center',
    },
    PlaceholderItemButtonText: {
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: '400',
      fontSize: 24,
    },
  });
};
