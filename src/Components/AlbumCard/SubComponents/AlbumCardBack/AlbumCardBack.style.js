import {StyleSheet} from 'react-native';

export const styles = new StyleSheet.create({
  InnerContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'black',
  },
  AlbumCardBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5%',
    padding: '2%',
    paddingVertical: '10%',
  },
  AlbumCardBackItemContainer: {
    flex: 3,
    justifyContent: 'space-between',
    gap: '10%',
    width: '90%',
  },
  AlbumCardBackItem: {flex: 1, height: '100%', width: '100%'},
  AlbumCardBackButtonContainer: {
    flex: 1,
    width: '90%',
    gap: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AlbumCardBackButton: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
