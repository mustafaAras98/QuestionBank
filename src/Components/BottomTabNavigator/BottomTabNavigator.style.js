import {StyleSheet} from 'react-native';

export const styles = new StyleSheet.create({
  TabBarStyle: {
    position: 'absolute',
    height: '8%',
    bottom: 10,
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
