import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      padding: 10,
      height: Dimensions.get('window').height * 0.25,
      width: Dimensions.get('window').width * 0.9,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '50'
        : Colors.LightTheme.BackgroundColor + '50',
      verticalAlign: 'middle',
    },
    ImageComp: {
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      objectFit: 'contain',
    },
    FavoriteContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    FavoriteHeader: {
      flex: 1,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Primary
        : Colors.LightTheme.Primary,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    HeaderText: {
      flex: 5,
      height: '100%',
      width: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    HeaderIcon: {
      flex: 2,
      height: '100%',
      width: '100%',
      textAlignVertical: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    FavoriteImageContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    FlatlistContainer: {
      flex: 3,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 6,
    },
    NoFavoriteContainer: {
      flex: 3,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 6,
    },
    NoFavoriteText: {
      fontSize: 18,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      fontWeight: '700',
    },
    FlatlistItemTextBackground: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      height: '25%',
      width: '100%',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '70'
        : Colors.LightTheme.BackgroundColor + '70',
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    FlatlistItemText: {
      flex: 1,
      height: '100%',
      width: '100%',
      fontWeight: '700',
      fontSize: 16,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    FlatlistContentContainer: {
      gap: 20,
    },
  });
};
