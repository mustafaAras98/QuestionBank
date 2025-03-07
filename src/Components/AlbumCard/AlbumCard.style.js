import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      width: '48%',
      height: (Dimensions.get('window').height * 0.7) / 3.2,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      borderRadius: 24,
    },
    CardContainer: {
      flex: 1,
      borderRadius: 24,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    CardFront: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backfaceVisibility: 'hidden',
    },
    CardBack: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backfaceVisibility: 'hidden',
    },
    ActiveCard: {
      zIndex: 1,
    },
    InactiveCard: {
      zIndex: 0,
    },
  });
};
