import {Dimensions, StatusBar, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  OutsideContainer: {
    flex: 1,
    display: 'flex',
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  ProfileTabContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    height: '15%',
    width: '40%',
    bottom: Dimensions.get('window').height * 0.14 + StatusBar.currentHeight,
    marginHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    right: 0,
    zIndex: 1,
    borderWidth: 3,
    borderColor: 'darkslategrey',
  },
  ProfileTabRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  Seperator: {
    backgroundColor: 'darkslategrey',
    height: '2%',
    width: '100%',
  },
  ProfileTabIcon: {
    color: 'darkslategrey',
    fontSize: 22,
  },
  ProfileTabText: {
    flex: 1,
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: 'darkslategrey',
    fontSize: 16,
    fontWeight: '700',
  },
});
