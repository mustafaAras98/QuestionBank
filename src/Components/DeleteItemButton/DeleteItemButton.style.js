import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    DeleteItemContainer: {
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      justifyContent: 'center',
      alignContent: 'center',
      width: '40%',
      height: '100%',
    },
    DeleteItemButtonContainer: {flex: 1},
    DeleteItemIcon: {
      flex: 1,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      alignSelf: 'center',
      textAlignVertical: 'center',
    },
  });
};
