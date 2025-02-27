import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  SelectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  SelectText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  Icon: {
    fontSize: 20,
    color: 'black',
  },
  Dropdown: {
    backgroundColor: 'white',
    marginTop: 5,
    maxHeight: 250,
    overflow: 'hidden',
  },
  Item: {
    padding: 16,
  },
  ItemText: {
    fontSize: 16,
    color: 'black',
  },
});
