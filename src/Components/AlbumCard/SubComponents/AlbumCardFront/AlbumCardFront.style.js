import {StyleSheet} from 'react-native';
import {Colors} from '../../../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    InnerContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 16,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    ImageContainer: {
      flex: 5,
      padding: 1,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      filter: 'blur(1px)',
    },
    Image: {
      flex: 1,
      resizeMode: 'cover',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
    },
    TitleContainer: {
      flex: 1.5,
      justifyContent: 'center',
      borderTopWidth: 2,
      borderStyle: 'dashed',
      borderColor: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    Text: {
      fontWeight: 'bold',
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });
};
