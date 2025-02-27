import {StyleSheet} from 'react-native';

export const styles = new StyleSheet.create({
  PlaceholderInnerContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    margin: 8,
    borderStyle: 'dashed',
    borderColor: 'black',
    backgroundColor: '#ABABAB80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PlaceholderItemButton: {
    width: '50%',
    height: '50%',
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  PlaceholderItemButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '400',
    fontSize: 24,
  },
});
