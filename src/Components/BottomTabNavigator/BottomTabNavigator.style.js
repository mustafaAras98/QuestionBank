import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {flex: 1},
  TabBarStyle: {
    position: 'absolute',
    height: Dimensions.get('screen').height * 0.08,
    bottom: Dimensions.get('screen').height * 0.02,
    marginHorizontal: '4%',
    alignItems: 'center',
  },
  TabBarItemStyle: {alignSelf: 'center'},
  TabBarIconStyle: {flex: 1, alignSelf: 'center'},
  FocusedIcon: {fontSize: 24, color: 'darkslategrey'},
  UnfocusedIcon: {fontSize: 22, color: 'lightslategrey'},
  FocusedIndicator: {
    borderRadius: 20,
    width: 10,
    height: 10,
    marginTop: 5,
    backgroundColor: 'darkslategrey',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
