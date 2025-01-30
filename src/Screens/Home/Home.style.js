import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  GlassBackground: {
    flex: 1,
    maxHeight: Dimensions.get('window').height * 0.7,
    width: Dimensions.get('window').width * 0.9,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF80',
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
