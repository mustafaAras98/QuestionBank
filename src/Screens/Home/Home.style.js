import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      flex: 1,
      justifyContent: 'center',
    },
    HeaderContainer: {
      position: 'absolute',
      top: Dimensions.get('window').height * 0.02,
      height: Dimensions.get('window').height * 0.08,
      width: Dimensions.get('window').width * 0.9,
    },
    GlassBackground: {
      flex: 1,
      maxHeight: Dimensions.get('window').height * 0.7,
      width: Dimensions.get('window').width * 0.9,
      justifyContent: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '70'
        : Colors.LightTheme.BackgroundColor + '70',
      padding: 8,
    },
    FlatListContainer: {
      maxHeight: Dimensions.get('window').height * 0.7,
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
    },
    Flatlist: {flex: 1, width: '100%', overflow: 'visible'},
    ColumnWrapperStyle: {
      justifyContent: 'space-between',
      marginHorizontal: '2%',
      marginVertical: 4,
      gap: '2%',
    },
  });
};
