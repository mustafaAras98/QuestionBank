import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  ProfileTabContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    height: '15%',
    width: '40%',
    bottom: '10%',
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
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
