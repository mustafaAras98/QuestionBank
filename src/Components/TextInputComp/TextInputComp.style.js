import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  TextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  InputComp: {
    flex: 1,
    backgroundColor: 'white',
  },
  Label: {
    position: 'absolute',
    left: 18,
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    zIndex: 1,
    shadowColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  leftIcon: {
    fontSize: 24,
    padding: 18,
  },
  rightIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 16,
    right: 20,
    fontSize: 18,
  },
});

export default {
  primary: StyleSheet.create({...baseStyle}),
};
