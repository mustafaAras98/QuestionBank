import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      width: '100%',
    },
    SelectBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '5%',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      borderRadius: 5,
    },
    SelectText: {
      fontSize: 16,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      flex: 1,
    },
    Icon: {
      fontSize: 20,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    Dropdown: {
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      marginTop: 5,
      maxHeight: 250,
      overflow: 'hidden',
    },
    Item: {
      padding: 16,
    },
    ItemText: {
      fontSize: 16,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
  });
};
